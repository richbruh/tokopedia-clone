import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  store: string;
  location: string;
}

export function ProductCard({ id, name, price, image, store, location }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} asChild>
      <Pressable style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.content}>
          <Text numberOfLines={2} style={styles.name}>{name}</Text>
          <Text style={styles.price}>Rp {price.toLocaleString('id-ID')}</Text>
          <Text style={styles.store}>{store}</Text>
          <Text style={styles.location}>{location}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  name: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  price: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    color: '#03AC0E',
    marginBottom: 4,
  },
  store: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: '#757575',
    marginBottom: 2,
  },
  location: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#757575',
  },
});