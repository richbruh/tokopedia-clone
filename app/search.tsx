import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Search as SearchIcon, X } from 'lucide-react-native';
import { ProductCard } from '@/components/ProductCard';

const POPULAR_SEARCHES = [
  'iPhone 13',
  'Samsung Galaxy',
  'Laptop Gaming',
  'Nike Air Jordan',
  'PlayStation 5',
  'Nintendo Switch',
];

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
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(!!query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#2C2C2C" />
        </Pressable>
        <View style={styles.searchContainer}>
          <SearchIcon size={20} color="#757575" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari di Tokopedia"
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
          />
          {searchQuery ? (
            <Pressable onPress={clearSearch} style={styles.clearButton}>
              <X size={20} color="#757575" />
            </Pressable>
          ) : null}
        </View>
      </View>

      <ScrollView style={styles.content}>
        {!isSearching ? (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pencarian Populer</Text>
              <View style={styles.popularSearches}>
                {POPULAR_SEARCHES.map((term, index) => (
                  <Pressable
                    key={index}
                    style={styles.searchTag}
                    onPress={() => handleSearch(term)}
                  >
                    <Text style={styles.searchTagText}>{term}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </>
        ) : (
          <View style={styles.searchResults}>
            {SAMPLE_PRODUCTS.map((product) => (
              <View key={product.id} style={styles.productItem}>
                <ProductCard {...product} />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F3F7',
    borderRadius: 8,
    padding: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  clearButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 12,
  },
  popularSearches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  searchTag: {
    backgroundColor: '#F0F3F7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    margin: 4,
  },
  searchTagText: {
    fontFamily: 'Inter_400Regular',
    color: '#2C2C2C',
  },
  searchResults: {
    padding: 16,
  },
  productItem: {
    marginBottom: 16,
  },
});