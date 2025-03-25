import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Pressable } from 'react-native';
import { Settings, ShoppingBag, CreditCard, MapPin, Heart, Bell, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import { router } from 'expo-router';

const PROFILE_DATA = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400',
  tokoPoints: 1250,
};

const MENU_ITEMS = [
  { icon: ShoppingBag, title: 'Pesanan Saya', route: '/orders' },
  { icon: CreditCard, title: 'Pembayaran', route: '/payments' },
  { icon: MapPin, title: 'Alamat', route: '/addresses' },
  { icon: Heart, title: 'Wishlist', route: '/wishlist' },
  { icon: Bell, title: 'Notifikasi', route: '/notifications' },
  { icon: HelpCircle, title: 'Bantuan', route: '/help' },
  { icon: Settings, title: 'Pengaturan', route: '/settings' },
];

export default function ProfileScreen() {
  const handleNavigate = (route: string): void => {
    try {
      // Only use type-safe routes
      const safeRoute = route as '/orders' | '/payments' | '/addresses' | '/wishlist' | 
                              '/notifications' | '/help' | '/settings';
        
      switch (safeRoute) {
        case '/orders':
          router.push(safeRoute);
          break;
        case '/payments':
          router.push(safeRoute);
          break;
        case '/addresses':
          router.push(safeRoute);
          break;
        case '/wishlist':
          router.push(safeRoute);
          break;
        case '/notifications':
          router.push(safeRoute);
          break;
        case '/help':
          router.push(safeRoute);
          break;
        case '/settings':
          router.push(safeRoute);
          break;
        default:
          router.push('../+not-found');
      }
    } catch (error) {
      console.error(error);
      alert('This page is not available yet: ' + route);
      router.push('../+not-found');
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Image source={{ uri: PROFILE_DATA.avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{PROFILE_DATA.name}</Text>
            <Text style={styles.email}>{PROFILE_DATA.email}</Text>
          </View>
        </View>

        <View style={styles.pointsCard}>
          <Text style={styles.pointsTitle}>Toko Points</Text>
          <Text style={styles.pointsValue}>{PROFILE_DATA.tokoPoints}</Text>
        </View>
      </View>

      <View style={styles.menuSection}>
        {MENU_ITEMS.map((item, index) => (
          <Pressable 
            key={index} 
            style={styles.menuItem}
            onPress={() => handleNavigate(item.route)}
          >
            <View style={styles.menuIcon}>
              <item.icon size={24} color="#2C2C2C" />
            </View>
            <Text style={styles.menuText}>{item.title}</Text>
          </Pressable>
        ))}

        <Pressable 
          style={[styles.menuItem, styles.logoutButton]}
          onPress={() => router.push('/login')}
        >
          <View style={styles.menuIcon}>
            <LogOut size={24} color="#FF5C5C" />
          </View>
          <Text style={[styles.menuText, styles.logoutText]}>Keluar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F3F7',
  },
  header: {
    backgroundColor: 'white',
    padding: 24,
    paddingTop: 48,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#757575',
    fontFamily: 'Inter_400Regular',
  },
  pointsCard: {
    backgroundColor: '#F0F3F7',
    padding: 16,
    borderRadius: 8,
  },
  pointsTitle: {
    fontSize: 14,
    color: '#757575',
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  pointsValue: {
    fontSize: 24,
    color: '#03AC0E',
    fontFamily: 'Inter_700Bold',
  },
  menuSection: {
    backgroundColor: 'white',
    marginTop: 8,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuIcon: {
    width: 32,
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  logoutButton: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    marginTop: 8,
  },
  logoutText: {
    color: '#FF5C5C',
  },
});