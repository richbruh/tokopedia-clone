import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Timer, Percent } from 'lucide-react-native';

const FLASH_SALE_PRODUCTS = [
  {
    id: '1',
    name: 'Sony WH-1000XM4',
    originalPrice: 4999000,
    discountedPrice: 3499000,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb',
    timeLeft: '8:45:32',
  },
  {
    id: '2',
    name: 'Nike Air Jordan 1',
    originalPrice: 2499000,
    discountedPrice: 1749000,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28',
    timeLeft: '8:45:32',
  },
];

const PROMOTIONS = [
  {
    id: '1',
    title: 'Mega Electronics Sale',
    description: 'Up to 50% off on electronics',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45',
    validUntil: '31 Mar 2024',
  },
  {
    id: '2',
    title: 'Fashion Week Special',
    description: 'Extra 20% off on all fashion items',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
    validUntil: '25 Mar 2024',
  },
];

export default function EventsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Special Events</Text>
      </View>

      {/* Flash Sale Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Timer size={24} color="#FF5C5C" />
            <Text style={styles.sectionTitle}>Flash Sale</Text>
          </View>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>08:45:32</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.flashSaleScroll}>
          {FLASH_SALE_PRODUCTS.map((product) => (
            <Link href={`/product/${product.id}`} asChild key={product.id}>
              <Pressable style={styles.flashSaleCard}>
                <Image source={{ uri: product.image }} style={styles.flashSaleImage} />
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{product.discount}%</Text>
                </View>
                <View style={styles.flashSaleContent}>
                  <Text numberOfLines={2} style={styles.flashSaleName}>
                    {product.name}
                  </Text>
                  <Text style={styles.flashSalePrice}>
                    Rp {product.discountedPrice.toLocaleString('id-ID')}
                  </Text>
                  <Text style={styles.originalPrice}>
                    Rp {product.originalPrice.toLocaleString('id-ID')}
                  </Text>
                </View>
              </Pressable>
            </Link>
          ))}
        </ScrollView>
      </View>

      {/* Promotions Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Percent size={24} color="#03AC0E" />
            <Text style={styles.sectionTitle}>Current Promotions</Text>
          </View>
        </View>

        {PROMOTIONS.map((promo) => (
          <Pressable key={promo.id} style={styles.promoCard}>
            <Image source={{ uri: promo.image }} style={styles.promoImage} />
            <View style={styles.promoContent}>
              <Text style={styles.promoTitle}>{promo.title}</Text>
              <Text style={styles.promoDescription}>{promo.description}</Text>
              <Text style={styles.promoValidity}>Valid until {promo.validUntil}</Text>
            </View>
          </Pressable>
        ))}
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
    padding: 16,
    paddingTop: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 8,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 8,
  },
  timerContainer: {
    backgroundColor: '#FF5C5C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  timerText: {
    color: 'white',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
  flashSaleScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  flashSaleCard: {
    width: 160,
    marginRight: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  flashSaleImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF5C5C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: 'white',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
  },
  flashSaleContent: {
    padding: 12,
  },
  flashSaleName: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  flashSalePrice: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#FF5C5C',
    marginBottom: 2,
  },
  originalPrice: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#757575',
    textDecorationLine: 'line-through',
  },
  promoCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  promoImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  promoContent: {
    padding: 16,
  },
  promoTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  promoDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#757575',
    marginBottom: 8,
  },
  promoValidity: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#03AC0E',
  },
});