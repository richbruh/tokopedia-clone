import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Package } from 'lucide-react-native';

const SAMPLE_ORDERS = [
  {
    id: '1',
    date: '15 Mar 2024',
    status: 'Selesai',
    items: [
      {
        id: '1',
        name: 'iPhone 13 Pro Max 256GB',
        price: 17999000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5',
      },
    ],
    total: 17999000,
  },
  {
    id: '2',
    date: '10 Mar 2024',
    status: 'Dikirim',
    items: [
      {
        id: '2',
        name: 'Samsung Galaxy S21 Ultra',
        price: 15999000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf',
      },
    ],
    total: 15999000,
  },
];

export default function OrdersScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#2C2C2C" />
        </Pressable>
        <Text style={styles.headerTitle}>Pesanan Saya</Text>
      </View>

      <ScrollView style={styles.content}>
        {SAMPLE_ORDERS.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderDate}>{order.date}</Text>
                <Text style={styles.orderStatus}>{order.status}</Text>
              </View>
              <Package size={24} color="#03AC0E" />
            </View>

            {order.items.map((item) => (
              <View key={item.id} style={styles.orderItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemQuantity}>{item.quantity} barang</Text>
                  <Text style={styles.itemPrice}>
                    Rp {item.price.toLocaleString('id-ID')}
                  </Text>
                </View>
              </View>
            ))}

            <View style={styles.orderFooter}>
              <Text style={styles.totalLabel}>Total Pesanan</Text>
              <Text style={styles.totalPrice}>
                Rp {order.total.toLocaleString('id-ID')}
              </Text>
            </View>

            <View style={styles.actionButtons}>
              <Pressable style={styles.detailButton}>
                <Text style={styles.detailButtonText}>Lihat Detail</Text>
              </Pressable>
              <Pressable style={styles.buyAgainButton}>
                <Text style={styles.buyAgainButtonText}>Beli Lagi</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F3F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingTop: 48,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderInfo: {
    flex: 1,
  },
  orderDate: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  orderStatus: {
    fontSize: 16,
    color: '#03AC0E',
    fontFamily: 'Inter_600SemiBold',
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 12,
    color: '#757575',
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: '#03AC0E',
    fontFamily: 'Inter_600SemiBold',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 16,
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 14,
    color: '#757575',
    fontFamily: 'Inter_400Regular',
  },
  totalPrice: {
    fontSize: 16,
    color: '#03AC0E',
    fontFamily: 'Inter_700Bold',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  detailButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#03AC0E',
    borderRadius: 8,
    alignItems: 'center',
  },
  detailButtonText: {
    color: '#03AC0E',
    fontFamily: 'Inter_600SemiBold',
  },
  buyAgainButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#03AC0E',
    borderRadius: 8,
    alignItems: 'center',
  },
  buyAgainButtonText: {
    color: 'white',
    fontFamily: 'Inter_600SemiBold',
  },
});