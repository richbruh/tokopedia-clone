import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { useThemeStore } from '@/store/useThemeStore'; // Import the proper store

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Get the dark mode state from the theme store
  const { darkMode } = useThemeStore();

  // Set theme for the entire app
  const theme = {
    dark: darkMode,
    colors: darkMode ? {
      background: '#121212',
      card: '#1E1E1E',
      text: '#FFFFFF',
      border: '#2A2A2A',
      notification: '#03AC0E',
      primary: '#03AC0E',
    } : {
      background: '#FFFFFF',
      card: '#FFFFFF',
      text: '#2C2C2C',
      border: '#E5E5E5',
      notification: '#03AC0E',
      primary: '#03AC0E',
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background }
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="product/[id]" options={{ presentation: 'modal' }} />
        <Stack.Screen name="search" options={{ presentation: 'modal' }} />
        <Stack.Screen name="orders" options={{ headerShown: false }} />
        <Stack.Screen name="payments" options={{ headerShown: false }} />
        <Stack.Screen name="addresses" options={{ headerShown: false }} />
        <Stack.Screen name="wishlist" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ headerShown: false }} />
        <Stack.Screen name="help" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
      </Stack>
      <StatusBar style={darkMode ? "light" : "dark"} />
    </>
  );
}