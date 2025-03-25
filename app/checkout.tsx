import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, MapPin, Truck, CreditCard } from 'lucide-react-native';

const SAMPLE_ADDRESS = {
  name: 'John Doe',
  phone: '081234567890',
  address: 'Jl. Sudirman No. 123',
  city: 'Jakarta Pusat',
  province: 'DKI Jakarta',
  postalCode: '10210',
};

const SAMPLE_PRODUCT = {
  id: '1',
  name: 'iPhone 13 Pro Max 256GB',
  price: 17999000,
  image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5',
  quantity: 1,
  store: 'Apple Official Store',
};

const SHIPPING_OPTIONS = [
  { id: '1', name: 'JNE Regular', price: 10000, eta: '2-3 hari' },
  { id: '2', name: 'J&T Express', price: 12000, eta: '1-2 hari' },
  { id: '3', name: 'SiCepat', price: 15000, eta: '1 hari' },
];

const PAYMENT_METHODS = [
  { id: '1', name: 'Transfer Bank', icon: CreditCard },
  { id: '2', name: 'Virtual Account', icon: CreditCard },
  { id: '3', name: 'E-Wallet', icon: CreditCard },
];

export default function CheckoutScreen() {
  const [selectedShipping, setSelectedShipping] = useState(SHIPPING_OPTIONS[0]);
  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_METHODS[0]);

  const subtotal = SAMPLE_PRODUCT.price * SAMPLE_PRODUCT.quantity;
  const total = subtotal + selectedShipping.price;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#2C2C2C" />
        </Pressable>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Shipping Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin size={20} color="#03AC0E" />
            <Text style={styles.sectionTitle}>Alamat Pengiriman</Text>
          </View>
          <View style={styles.address}>
            <Text style={styles.addressName}>{SAMPLE_ADDRESS.name}</Text>
            <Text style={styles.addressPhone}>{SAMPLE_ADDRESS.phone}</Text>
            <Text style={styles.addressText}>
              {SAMPLE_ADDRESS.address}
              {'\n'}
              {SAMPLE_ADDRESS.city}, {SAMPLE_ADDRESS.province} {SAMPLE_ADDRESS.postalCode}
            </Text>
          </View>
        </View>

        {/* Product Details */}
        <View style={styles.section}>
          <Text style={styles.storeTitle}>{SAMPLE_PRODUCT.store}</Text>
          <View style={styles.productCard}>
            <Image source={{ uri: SAMPLE_PRODUCT.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{SAMPLE_PRODUCT.name}</Text>
              <Text style={styles.productPrice}>
                Rp {SAMPLE_PRODUCT.price.toLocaleString('id-ID')}
              </Text>
              <Text style={styles.productQuantity}>{SAMPLE_PRODUCT.quantity} barang</Text>
            </View>
          </View>
        </View>

        {/* Shipping Options */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Truck size={20} color="#03AC0E" />
            <Text style={styles.sectionTitle}>Pengiriman</Text>
          </View>
          {SHIPPING_OPTIONS.map((option) => (
            <Pressable
              key={option.id}
              style={[
                styles.shippingOption,
                selectedShipping.id === option.id && styles.selectedOption,
              ]}
              onPress={() => setSelectedShipping(option)}>
              <View style={styles.shippingInfo}>
                <Text style={styles.shippingName}>{option.name}</Text>
                <Text style={styles.shippingEta}>Estimasi tiba {option.eta}</Text>
              </View>
              <Text style={styles.shippingPrice}>
                Rp {option.price.toLocaleString('id-ID')}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CreditCard size={20} color="#03AC0E" />
            <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
          </View>
          {PAYMENT_METHODS.map((method) => (
            <Pressable
              key={method.id}
              style={[
                styles.paymentOption,
                selectedPayment.id === method.id && styles.selectedOption,
              ]}
              onPress={() => setSelectedPayment(method)}>
              <method.icon size={24} color="#2C2C2C" />
              <Text style={styles.paymentName}>{method.name}</Text>
            </Pressable>
          ))}
        </View>

        {/* Price Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rincian Pembayaran</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal Produk</Text>
            <Text style={styles.priceValue}>
              Rp {subtotal.toLocaleString('id-ID')}
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Biaya Pengiriman</Text>
            <Text style={styles.priceValue}>
              Rp {selectedShipping.price.toLocaleString('id-ID')}
            </Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Pembayaran</Text>
            <Text style={styles.totalValue}>
              Rp {total.toLocaleString('id-ID')}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Text style={styles.footerTotal}>
            Rp {total.toLocaleString('id-ID')}
          </Text>
          <Pressable style={styles.payButton}>
            <Text style={styles.payButtonText}>Bayar Sekarang</Text>
          </Pressable>
        </View>
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
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 8,
  },
  address: {
    backgroundColor: '#F0F3F7',
    padding: 16,
    borderRadius: 8,
  },
  addressName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  addressPhone: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#757575',
    lineHeight: 20,
  },
  storeTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 16,
  },
  productCard: {
    flexDirection: 'row',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#03AC0E',
    marginBottom: 4,
  },
  productQuantity: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#757575',
  },
  shippingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedOption: {
    borderColor: '#03AC0E',
    backgroundColor: '#F0FFF0',
  },
  shippingInfo: {
    flex: 1,
  },
  shippingName: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  shippingEta: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#757575',
  },
  shippingPrice: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    marginBottom: 8,
  },
  paymentName: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginLeft: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#757575',
  },
  priceValue: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 16,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  totalValue: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#03AC0E',
  },
  footer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    padding: 16,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerTotal: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#03AC0E',
  },
  payButton: {
    backgroundColor: '#03AC0E',
    padding: 12,
    borderRadius: 8,
    minWidth: 160,
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
  },
});