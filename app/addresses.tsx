import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Modal } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Plus, MapPin, X, Check } from 'lucide-react-native';

// Define interface for address
interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

// Sample data for addresses
const INITIAL_ADDRESSES: Address[] = [
  {
    id: '1',
    name: 'John Doe',
    phone: '+62 812 3456 7890',
    address: 'Jalan Sudirman No. 123',
    district: 'Setiabudi',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    postalCode: '12910',
    isDefault: true,
  },
];

export default function AddressesScreen() {
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [modalVisible, setModalVisible] = useState(false);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
    name: '',
    phone: '',
    address: '',
    district: '',
    city: '',
    province: '',
    postalCode: '',
    isDefault: false,
  });

  const handleAddAddress = () => {
    // Validate form
    if (!newAddress.name || !newAddress.phone || !newAddress.address) {
      alert('Mohon lengkapi data alamat');
      return;
    }

    // Add new address - convert Date.now() to string for consistent typing
    const id = Date.now().toString();
    
    // If this is the first address or marked as default
    if (addresses.length === 0 || newAddress.isDefault) {
      // Set all existing addresses to non-default
      const updatedAddresses = addresses.map(addr => ({...addr, isDefault: false}));
      setAddresses([...updatedAddresses, {...newAddress, id, isDefault: true}]);
    } else {
      setAddresses([...addresses, {...newAddress, id}]);
    }

    // Clear form and close modal
    setNewAddress({
      name: '',
      phone: '',
      address: '',
      district: '',
      city: '',
      province: '',
      postalCode: '',
      isDefault: false,
    });
    setModalVisible(false);
  };

  const setDefaultAddress = (id: string): void => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
    setAddresses(updatedAddresses);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#2C2C2C" />
        </Pressable>
        <Text style={styles.headerTitle}>Alamat Pengiriman</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <Pressable 
          style={styles.addAddressButton}
          onPress={() => setModalVisible(true)}
        >
          <Plus size={20} color="#03AC0E" />
          <Text style={styles.addAddressText}>Tambah Alamat Baru</Text>
        </Pressable>

        {addresses.map((address) => (
          <View key={address.id} style={styles.addressCard}>
            <View style={styles.addressHeader}>
              <Text style={styles.addressName}>{address.name}</Text>
              {address.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Utama</Text>
                </View>
              )}
            </View>
            
            <Text style={styles.addressPhone}>{address.phone}</Text>
            <Text style={styles.addressDetail}>
              {address.address}, {address.district}, {address.city}, {address.province}, {address.postalCode}
            </Text>
            
            <View style={styles.addressActions}>
              {!address.isDefault && (
                <Pressable 
                  style={styles.defaultButton}
                  onPress={() => setDefaultAddress(address.id)}
                >
                  <Text style={styles.defaultButtonText}>Atur sebagai utama</Text>
                </Pressable>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal for adding new address */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tambah Alamat Baru</Text>
              <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <X size={24} color="#2C2C2C" />
              </Pressable>
            </View>

            <ScrollView style={styles.modalForm}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Nama Lengkap</Text>
                <TextInput
                  style={styles.input}
                  value={newAddress.name}
                  onChangeText={(text) => setNewAddress({...newAddress, name: text})}
                  placeholder="Nama penerima"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Nomor HP</Text>
                <TextInput
                  style={styles.input}
                  value={newAddress.phone}
                  onChangeText={(text) => setNewAddress({...newAddress, phone: text})}
                  placeholder="Nomor telepon aktif"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Alamat Lengkap</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={newAddress.address}
                  onChangeText={(text) => setNewAddress({...newAddress, address: text})}
                  placeholder="Nama jalan, nomor rumah"
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>Kecamatan</Text>
                  <TextInput
                    style={styles.input}
                    value={newAddress.district}
                    onChangeText={(text) => setNewAddress({...newAddress, district: text})}
                    placeholder="Kecamatan"
                  />
                </View>

                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Kota</Text>
                  <TextInput
                    style={styles.input}
                    value={newAddress.city}
                    onChangeText={(text) => setNewAddress({...newAddress, city: text})}
                    placeholder="Kota"
                  />
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>Provinsi</Text>
                  <TextInput
                    style={styles.input}
                    value={newAddress.province}
                    onChangeText={(text) => setNewAddress({...newAddress, province: text})}
                    placeholder="Provinsi"
                  />
                </View>

                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Kode Pos</Text>
                  <TextInput
                    style={styles.input}
                    value={newAddress.postalCode}
                    onChangeText={(text) => setNewAddress({...newAddress, postalCode: text})}
                    placeholder="Kode pos"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.checkboxContainer}>
                <Pressable 
                  style={styles.checkbox}
                  onPress={() => setNewAddress({...newAddress, isDefault: !newAddress.isDefault})}
                >
                  {newAddress.isDefault && (
                    <Check size={16} color="#03AC0E" />
                  )}
                </Pressable>
                <Text style={styles.checkboxLabel}>
                  Jadikan alamat utama
                </Text>
              </View>

              <Pressable style={styles.saveButton} onPress={handleAddAddress}>
                <Text style={styles.saveButtonText}>Simpan</Text>
              </Pressable>
            </ScrollView>
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
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#03AC0E',
    borderStyle: 'dashed',
  },
  addAddressText: {
    color: '#03AC0E',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  addressCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressName: {
    fontSize: 16,
    fontWeight: 'bold',
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
  addressPhone: {
    fontSize: 14,
    marginBottom: 8,
  },
  addressDetail: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
  },
  addressActions: {
    flexDirection: 'row',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  defaultButton: {
    padding: 8,
  },
  defaultButtonText: {
    color: '#03AC0E',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 40,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  modalForm: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: '#03AC0E',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});