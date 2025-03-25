import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Pressable } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { useCartStore } from '@/store/useCartStore';

export default function CartScreen() {
  const { items, removeItem, updateQuantity } = useCartStore();
  
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleQuantityChange = (id: string, currentQuantity: number, increment: boolean) => {
    const newQuantity = increment ? currentQuantity + 1 : currentQuantity - 1;
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    } else {
      removeItem(id);
    }
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Keranjang belanjamu masih kosong</Text>
        <Text style={styles.emptySubtext}>Yuk, mulai belanja sekarang!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Keranjang</Text>
      </View>

      <ScrollView style={styles.content}>
        {items.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.itemPrice}>
                Rp {item.price.toLocaleString('id-ID')}
              </Text>
              
              <View style={styles.quantityContainer}>
                <Pressable
                  onPress={() => handleQuantityChange(item.id, item.quantity, false)}
                  style={styles.quantityButton}
                >
                  <Minus size={20} color="#03AC0E" />
                </Pressable>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <Pressable
                  onPress={() => handleQuantityChange(item.id, item.quantity, true)}
                  style={styles.quantityButton}
                >
                  <Plus size={20} color="#03AC0E" />
                </Pressable>
                <Pressable
                  onPress={() => removeItem(item.id)}
                  style={[styles.quantityButton, styles.deleteButton]}
                >
                  <Trash2 size={20} color="#FF5C5C" />
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>
            Rp {totalPrice.toLocaleString('id-ID')}
          </Text>
        </View>
        <Pressable style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Beli ({items.length})</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F3F7',
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingTop: 48,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
  },
  content: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#03AC0E',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 4,
  },
  deleteButton: {
    marginLeft: 'auto',
    borderColor: '#FF5C5C',
  },
  quantity: {
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  footer: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  totalPrice: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#03AC0E',
  },
  checkoutButton: {
    backgroundColor: '#03AC0E',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#757575',
    textAlign: 'center',
  },
});