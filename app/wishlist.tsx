import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, FlatList } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Heart, ShoppingCart, AlertCircle } from 'lucide-react-native';
import { useWishlistStore, WishlistItem } from '@/store/useWishlistStore';
import { useCartStore } from '@/store/useCartStore';


export default function WishlistScreen() {
    const { items, removeItem } = useWishlistStore();
    const addToCart = useCartStore(state => state.addItem);
  
    const handleAddToCart = (item: WishlistItem): void => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1
      });
      alert('Produk ditambahkan ke keranjang');
    };
  
    const handleRemoveFromWishlist = (itemId: string): void => {
      removeItem(itemId);
    };
  
    const navigateToProduct = (id: string): void => {
      router.push(`/product/${id}`);
    };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#2C2C2C" />
        </Pressable>
        <Text style={styles.headerTitle}>Wishlist</Text>
        <View style={{ width: 40 }} />
      </View>

      {items.length > 0 ? (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Pressable 
              style={styles.productCard}
              onPress={() => navigateToProduct(item.id)}
            >
              <Image source={{ uri: item.image }} style={styles.productImage} />
              
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.productPrice}>
                  Rp {item.price.toLocaleString('id-ID')}
                </Text>
                {item.store && (
                  <Text style={styles.storeName} numberOfLines={1}>{item.store}</Text>
                )}
              </View>
              
              <View style={styles.productActions}>
                <Pressable 
                  style={styles.actionButton}
                  onPress={() => handleRemoveFromWishlist(item.id)}
                >
                  <Heart size={20} color="#FF5C5C" fill="#FF5C5C" />
                </Pressable>
                
                <Pressable 
                  style={[styles.actionButton, styles.cartButton]}
                  onPress={() => handleAddToCart(item)}
                >
                  <ShoppingCart size={20} color="#FFFFFF" />
                </Pressable>
              </View>
            </Pressable>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <AlertCircle size={64} color="#CCCCCC" />
          <Text style={styles.emptyTitle}>Wishlist Kosong</Text>
          <Text style={styles.emptyMessage}>
            Belum ada produk yang ditambahkan ke wishlist
          </Text>
          <Pressable 
            style={styles.shopButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.shopButtonText}>Mulai Belanja</Text>
          </Pressable>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    elevation: 2,
    paddingTop: 48,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 8,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#03AC0E',
    marginBottom: 4,
  },
  storeName: {
    fontSize: 12,
    color: '#757575',
  },
  productActions: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  actionButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
  },
  cartButton: {
    backgroundColor: '#03AC0E',
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
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: '#03AC0E',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});