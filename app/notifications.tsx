import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, ShoppingBag, Tag, Bell, Truck, Trash2 } from 'lucide-react-native';
import { useThemeStore } from '@/store/useThemeStore';

// Define the notification type
type NotificationType = 'order' | 'promo' | 'shipping' | 'system';

// Define the notification interface
interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  date: string;
  read: boolean;
  icon: React.ComponentType<any>;
}

// Sample notification data - explicitly typed as Notification[]
const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'order',
    title: 'Pesanan Selesai',
    message: 'Pesanan #ORD12345 telah berhasil diterima. Terima kasih telah berbelanja!',
    time: '10:30 AM',
    date: 'Hari ini',
    read: false,
    icon: ShoppingBag,
  },
  {
    id: '2',
    type: 'promo',
    title: 'Diskon 20% untuk Produk Elektronik',
    message: 'Dapatkan diskon spesial untuk semua produk elektronik hingga akhir minggu ini.',
    time: '09:15 AM',
    date: 'Hari ini',
    read: false,
    icon: Tag,
  },
  {
    id: '3',
    type: 'shipping',
    title: 'Pesanan Dikirim',
    message: 'Pesanan #ORD12340 sedang dalam pengiriman. Estimasi tiba dalam 2 hari.',
    time: '08:45 AM',
    date: 'Hari ini',
    read: true,
    icon: Truck,
  },
  {
    id: '4',
    type: 'system',
    title: 'Update Aplikasi Tersedia',
    message: 'Versi baru aplikasi telah tersedia. Update sekarang untuk fitur terbaru.',
    time: '3:20 PM',
    date: 'Kemarin',
    read: true,
    icon: Bell,
  },
  {
    id: '5',
    type: 'order',
    title: 'Pembayaran Berhasil',
    message: 'Pembayaran untuk pesanan #ORD12339 telah dikonfirmasi.',
    time: '1:15 PM',
    date: 'Kemarin',
    read: true,
    icon: ShoppingBag,
  },
];

export default function NotificationsScreen() {
  const { darkMode } = useThemeStore();
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  const markAsRead = (id: string): void => {
    setNotifications(
      notifications.map((notif) => {
        if (notif.id === id) {
          return { ...notif, read: true };
        }
        return notif;
      })
    );
  };

  const clearAllNotifications = (): void => {
    setNotifications([]);
  };

  const renderNotificationItem = ({ item }: { item: Notification }) => {
    const NotificationIcon = item.icon;
    
    return (
      <Pressable
        style={[
          styles.notificationItem,
          !item.read && styles.unreadItem,
          darkMode && styles.darkNotificationItem,
          !item.read && darkMode && styles.darkUnreadItem,
        ]}
        onPress={() => markAsRead(item.id)}
      >
        <View
          style={[
            styles.iconContainer,
            getIconBackgroundColor(item.type),
            darkMode && styles.darkIconContainer,
          ]}
        >
          <NotificationIcon size={20} color="#FFFFFF" />
        </View>
        <View style={styles.notificationContent}>
          <Text
            style={[
              styles.notificationTitle,
              darkMode && styles.darkText,
              !item.read && styles.boldText,
            ]}
          >
            {item.title}
          </Text>
          <Text
            style={[styles.notificationMessage, darkMode && styles.darkSubtext]}
            numberOfLines={2}
          >
            {item.message}
          </Text>
          <Text style={[styles.notificationTime, darkMode && styles.darkSubtext]}>
            {item.date}, {item.time}
          </Text>
        </View>
      </Pressable>
    );
  };

  const getIconBackgroundColor = (type: NotificationType) => {
    switch (type) {
      case 'order':
        return { backgroundColor: '#03AC0E' };
      case 'promo':
        return { backgroundColor: '#FF5C5C' };
      case 'shipping':
        return { backgroundColor: '#1E88E5' };
      case 'system':
        return { backgroundColor: '#757575' };
      default:
        return { backgroundColor: '#03AC0E' };
    }
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={[styles.header, darkMode && styles.darkHeader]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={darkMode ? '#FFFFFF' : '#2C2C2C'} />
        </Pressable>
        <Text style={[styles.headerTitle, darkMode && styles.darkText]}>
          Notifikasi
        </Text>
        {notifications.length > 0 && (
          <Pressable onPress={clearAllNotifications} style={styles.clearButton}>
            <Trash2 size={20} color={darkMode ? '#E0E0E0' : '#757575'} />
          </Pressable>
        )}
      </View>

      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item: Notification) => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Bell size={64} color={darkMode ? '#333333' : '#E0E0E0'} />
          <Text style={[styles.emptyTitle, darkMode && styles.darkText]}>
            Tidak Ada Notifikasi
          </Text>
          <Text style={[styles.emptyMessage, darkMode && styles.darkSubtext]}>
            Anda tidak memiliki notifikasi saat ini
          </Text>
        </View>
      )}
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
  darkText: {
    color: '#FFFFFF',
  },
  clearButton: {
    padding: 8,
  },
  list: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    elevation: 1,
  },
  darkNotificationItem: {
    backgroundColor: '#1E1E1E',
  },
  unreadItem: {
    backgroundColor: '#F0FAFF',
    borderLeftWidth: 3,
    borderLeftColor: '#03AC0E',
  },
  darkUnreadItem: {
    backgroundColor: '#253333',
    borderLeftWidth: 3,
    borderLeftColor: '#03AC0E',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  darkIconContainer: {
    opacity: 0.85,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
    lineHeight: 20,
  },
  darkSubtext: {
    color: '#AAAAAA',
  },
  notificationTime: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  boldText: {
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
});