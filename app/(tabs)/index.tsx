import React from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Search, Bell, ShoppingCart } from 'lucide-react-native';
import { ProductCard } from '@/components/ProductCard';

const SAMPLE_PRODUCTS = [
  {
    id: '1',
    name: 'iPhone 13 Pro Max 256GB',
    price: 17999000,
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5',
    store: 'Apple Official Store',
    location: 'Jakarta Pusat'
  },
  {
    id: '2',
    name: 'Samsung Galaxy S21 Ultra',
    price: 15999000,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf',
    store: 'Samsung Official Store',
    location: 'Jakarta Selatan'
  },
  // Add more sample products as needed
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/search" asChild>
          <Pressable style={styles.searchBar}>
            <Search size={20} color="#757575" />
            <Text style={styles.searchText}>Cari di Tokopedia</Text>
          </Pressable>
        </Link>
        <View style={styles.headerIcons}>
          <Pressable style={styles.iconButton}>
            <Bell size={24} color="#2C2C2C" />
          </Pressable>
          <Link href="/cart" asChild>
            <Pressable style={styles.iconButton}>
              <ShoppingCart size={24} color="#2C2C2C" />
            </Pressable>
          </Link>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Rekomendasi</Text>
        <View style={styles.productsGrid}>
          {SAMPLE_PRODUCTS.map((product) => (
            <View key={product.id} style={styles.productItem}>
              <ProductCard {...product} />
            </View>
          ))}
        </View>
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
    backgroundColor: 'white',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingTop: 48,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F3F7',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  searchText: {
    marginLeft: 8,
    color: '#757575',
    fontFamily: 'Inter_400Regular',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  productItem: {
    width: '50%',
    padding: 8,
  },
});