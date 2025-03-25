import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Moon, Bell, Globe, Shield, LogOut, ChevronRight } from 'lucide-react-native';
import { useThemeStore } from '@/store/useThemeStore';

export default function SettingsScreen() {
  const { darkMode, toggleDarkMode } = useThemeStore();

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={[styles.header, darkMode && styles.darkHeader]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={darkMode ? "#FFFFFF" : "#2C2C2C"} />
        </Pressable>
        <Text style={[styles.headerTitle, darkMode && styles.darkHeaderTitle]}>Pengaturan</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.section, darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>Tampilan</Text>
          
          <View style={[styles.settingItem, darkMode && styles.darkSettingItem]}>
            <View style={styles.settingLeft}>
              <Moon size={22} color={darkMode ? "#FFFFFF" : "#2C2C2C"} />
              <Text style={[styles.settingText, darkMode && styles.darkText]}>Mode Gelap</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: "#D1D1D1", true: "#03AC0E" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={[styles.section, darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>Notifikasi</Text>
          
          <Pressable style={[styles.settingItem, darkMode && styles.darkSettingItem]}>
            <View style={styles.settingLeft}>
              <Bell size={22} color={darkMode ? "#FFFFFF" : "#2C2C2C"} />
              <Text style={[styles.settingText, darkMode && styles.darkText]}>Notifikasi Push</Text>
            </View>
            <ChevronRight size={20} color={darkMode ? "#FFFFFF" : "#2C2C2C"} />
          </Pressable>
        </View>

        <View style={[styles.section, darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>Bahasa & Wilayah</Text>
          
          <Pressable style={[styles.settingItem, darkMode && styles.darkSettingItem]}>
            <View style={styles.settingLeft}>
              <Globe size={22} color={darkMode ? "#FFFFFF" : "#2C2C2C"} />
              <Text style={[styles.settingText, darkMode && styles.darkText]}>Bahasa</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={[styles.settingValue, darkMode && styles.darkSettingValue]}>Indonesia</Text>
              <ChevronRight size={20} color={darkMode ? "#FFFFFF" : "#2C2C2C"} />
            </View>
          </Pressable>
        </View>

        <View style={[styles.section, darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>Privasi & Keamanan</Text>
          
          <Pressable style={[styles.settingItem, darkMode && styles.darkSettingItem]}>
            <View style={styles.settingLeft}>
              <Shield size={22} color={darkMode ? "#FFFFFF" : "#2C2C2C"} />
              <Text style={[styles.settingText, darkMode && styles.darkText]}>Kata Sandi & Keamanan</Text>
            </View>
            <ChevronRight size={20} color={darkMode ? "#FFFFFF" : "#2C2C2C"} />
          </Pressable>
        </View>
        
        <Pressable style={[styles.logoutButton, darkMode && styles.darkLogoutButton]}>
          <LogOut size={20} color={darkMode ? "#FFFFFF" : "#2C2C2C"} />
          <Text style={[styles.logoutText, darkMode && styles.darkLogoutText]}>Keluar</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    elevation: 2,
    paddingTop: 48,
  },
  darkHeader: {
    backgroundColor: '#1E1E1E',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C2C2C',
  },
  darkHeaderTitle: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  darkSection: {
    backgroundColor: '#1E1E1E',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#757575',
    padding: 16,
    paddingBottom: 8,
  },
  darkText: {
    color: '#E0E0E0',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  darkSettingItem: {
    borderTopColor: '#2A2A2A',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 12,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    color: '#757575',
    marginRight: 8,
  },
  darkSettingValue: {
    color: '#AAAAAA',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 24,
  },
  darkLogoutButton: {
    backgroundColor: '#1E1E1E',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F44336',
    marginLeft: 8,
  },
  darkLogoutText: {
    color: '#F55246',
  },
});