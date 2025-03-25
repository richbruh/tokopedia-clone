import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Modal } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Plus, CreditCard, Wallet, X } from 'lucide-react-native';
// Define TypeScript interfaces
interface PaymentMethod {
    id: string;
    name: string;
    number: string;
    isDefault: boolean;
  }
  
  interface PaymentCategory {
    id: string;
    title: string;
    icon: React.ComponentType<any>;
    methods: PaymentMethod[];
  }
// Payment method types and sample data
const PAYMENT_CATEGORIES = [
  { 
    id: 'va', 
    title: 'BCA Virtual Account',
    icon: CreditCard,
    methods: [
      { id: 'bca1', name: 'BCA Virtual Account', number: '12345678901', isDefault: true }
    ]
  },
  { 
    id: 'card', 
    title: 'Kartu Debit / Credit',
    icon: CreditCard,
    methods: [
      { id: 'card1', name: 'BCA Card', number: '**** **** **** 1234', isDefault: false }
    ]
  },
  { 
    id: 'dana', 
    title: 'Dana',
    icon: Wallet,
    methods: []
  },
  { 
    id: 'gopay', 
    title: 'Gopay',
    icon: Wallet,
    methods: [
      { id: 'gopay1', name: 'Gopay', number: '+62 8123 4567 890', isDefault: false }
    ]
  },
  { 
    id: 'goPayLater', 
    title: 'Gopay Later',
    icon: Wallet,
    methods: []
  },
];

export default function PaymentsScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [paymentData, setPaymentData] = useState<PaymentCategory[]>(PAYMENT_CATEGORIES);
    const [selectedCategory, setSelectedCategory] = useState<PaymentCategory | null>(null);
  
    const handleAddPayment = (category: PaymentCategory): void => {
      setSelectedCategory(category);
      setModalVisible(true);
    };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCategory(null);
  };

  // In a real app, this would connect to your backend
  const addNewPaymentMethod = () => {
    // Simulating adding a new payment method
    alert('Payment method added successfully!');
    closeModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#2C2C2C" />
        </Pressable>
        <Text style={styles.headerTitle}>Metode Pembayaran</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Metode Pembayaran Tersimpan</Text>
        
        {paymentData.map((category) => (
          <View key={category.id} style={styles.category}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Pressable 
                style={styles.addButton}
                onPress={() => handleAddPayment(category)}
              >
                <Plus size={18} color="#03AC0E" />
                <Text style={styles.addButtonText}>Tambah</Text>
              </Pressable>
            </View>

            {category.methods.length > 0 ? (
              category.methods.map((method) => (
                <View key={method.id} style={styles.paymentMethod}>
                  <category.icon size={24} color="#2C2C2C" style={styles.methodIcon} />
                  <View style={styles.methodInfo}>
                    <Text style={styles.methodName}>{method.name}</Text>
                    <Text style={styles.methodNumber}>{method.number}</Text>
                  </View>
                  {method.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultText}>Utama</Text>
                    </View>
                  )}
                </View>
              ))
            ) : (
              <View style={styles.emptyMethod}>
                <Text style={styles.emptyText}>Belum ada metode pembayaran</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Modal for adding new payment method */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Tambah {selectedCategory?.title}
              </Text>
              <Pressable onPress={closeModal} style={styles.closeButton}>
                <X size={24} color="#2C2C2C" />
              </Pressable>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.modalText}>
                Untuk menambahkan metode pembayaran baru, Anda akan diarahkan ke halaman verifikasi.
              </Text>
              
              <Pressable 
                style={styles.addPaymentButton}
                onPress={addNewPaymentMethod}
              >
                <Text style={styles.addPaymentButtonText}>Tambah Metode Pembayaran</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  category: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    elevation: 1,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#03AC0E',
    marginLeft: 4,
    fontWeight: '600',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  methodIcon: {
    marginRight: 12,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 15,
    fontWeight: '500',
  },
  methodNumber: {
    fontSize: 13,
    color: '#757575',
    marginTop: 2,
  },
  defaultBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  defaultText: {
    color: '#03AC0E',
    fontSize: 12,
    fontWeight: '500',
  },
  emptyMethod: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  emptyText: {
    color: '#757575',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 16,
  },
  modalText: {
    fontSize: 15,
    color: '#424242',
    marginBottom: 24,
    lineHeight: 22,
  },
  addPaymentButton: {
    backgroundColor: '#03AC0E',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addPaymentButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});