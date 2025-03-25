import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Search, ChevronRight, MessageCircle, PhoneCall, Mail, HelpCircle, ChevronDown } from 'lucide-react-native';
import { useThemeStore } from '@/store/useThemeStore';

// Define interfaces for our data
interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface HelpCategory {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
}

// Support contact method type
type ContactMethod = 'chat' | 'call' | 'email';

// FAQ data
const FAQ_ITEMS: FaqItem[] = [
  {
    id: '1',
    question: 'Bagaimana cara melacak pesanan saya?',
    answer: 'Anda dapat melacak pesanan dengan mengunjungi halaman "Pesanan Saya" di profil Anda, lalu pilih pesanan yang ingin dilacak dan klik tombol "Lacak Pesanan".',
  },
  {
    id: '2',
    question: 'Berapa lama waktu pengiriman?',
    answer: 'Waktu pengiriman tergantung pada lokasi dan jasa pengiriman yang dipilih. Secara umum, pengiriman dalam kota membutuhkan 1-2 hari, antar kota 2-4 hari, dan antar pulau 3-7 hari kerja.',
  },
  {
    id: '3',
    question: 'Bagaimana cara mengembalikan barang?',
    answer: 'Untuk mengembalikan barang, silakan mengunjungi halaman detail pesanan, pilih "Minta Pengembalian", dan ikuti langkah-langkah yang diberikan. Pengembalian harus dilakukan dalam 7 hari setelah barang diterima.',
  },
  {
    id: '4',
    question: 'Metode pembayaran apa saja yang tersedia?',
    answer: 'Kami menerima berbagai metode pembayaran termasuk kartu kredit/debit, transfer bank, e-wallet seperti GoPay, OVO, DANA, dan pembayaran melalui virtual account.',
  },
  {
    id: '5',
    question: 'Bagaimana cara mengubah alamat pengiriman?',
    answer: 'Anda dapat mengubah alamat pengiriman saat checkout. Jika pesanan sudah diproses, silakan hubungi layanan pelanggan kami untuk membantu perubahan alamat pengiriman.',
  },
];

// Help categories
const HELP_CATEGORIES: HelpCategory[] = [
  { id: '1', title: 'Pesanan & Pengiriman', icon: HelpCircle },
  { id: '2', title: 'Pembayaran & Pengembalian Dana', icon: HelpCircle },
  { id: '3', title: 'Pengembalian & Penukaran', icon: HelpCircle },
  { id: '4', title: 'Akun & Keamanan', icon: HelpCircle },
  { id: '5', title: 'Promosi & Voucher', icon: HelpCircle },
];

export default function HelpScreen() {
  const { darkMode } = useThemeStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (id: string): void => {
    if (expandedFaq === id) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(id);
    }
  };

  const contactSupport = (method: ContactMethod): void => {
    switch (method) {
      case 'chat':
        alert('Membuka jendela live chat');
        break;
      case 'call':
        alert('Menghubungi layanan pelanggan: 1500-123');
        break;
      case 'email':
        alert('Mengirim email ke: support@tokopedia.com');
        break;
    }
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={[styles.header, darkMode && styles.darkHeader]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={darkMode ? '#FFFFFF' : '#2C2C2C'} />
        </Pressable>
        <Text style={[styles.headerTitle, darkMode && styles.darkText]}>
          Bantuan
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.searchContainer, darkMode && styles.darkSearchContainer]}>
          <Search size={20} color={darkMode ? '#AAAAAA' : '#757575'} />
          <TextInput
            style={[styles.searchInput, darkMode && styles.darkSearchInput]}
            placeholder="Cari pertanyaan atau bantuan..."
            placeholderTextColor={darkMode ? '#AAAAAA' : '#757575'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.contactSection}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
            Hubungi Kami
          </Text>
          <View style={styles.contactOptions}>
            <Pressable
              style={[styles.contactButton, darkMode && styles.darkContactButton]}
              onPress={() => contactSupport('chat')}
            >
              <MessageCircle size={24} color={darkMode ? '#FFFFFF' : '#03AC0E'} />
              <Text style={[styles.contactText, darkMode && styles.darkText]}>
                Live Chat
              </Text>
            </Pressable>
            <Pressable
              style={[styles.contactButton, darkMode && styles.darkContactButton]}
              onPress={() => contactSupport('call')}
            >
              <PhoneCall size={24} color={darkMode ? '#FFFFFF' : '#03AC0E'} />
              <Text style={[styles.contactText, darkMode && styles.darkText]}>
                Call Center
              </Text>
            </Pressable>
            <Pressable
              style={[styles.contactButton, darkMode && styles.darkContactButton]}
              onPress={() => contactSupport('email')}
            >
              <Mail size={24} color={darkMode ? '#FFFFFF' : '#03AC0E'} />
              <Text style={[styles.contactText, darkMode && styles.darkText]}>
                Email
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.categoriesSection}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
            Topik Bantuan
          </Text>
          {HELP_CATEGORIES.map((category) => (
            <Pressable
              key={category.id}
              style={[styles.categoryItem, darkMode && styles.darkCategoryItem]}
            >
              <View style={styles.categoryLeft}>
                <category.icon size={20} color={darkMode ? '#FFFFFF' : '#03AC0E'} />
                <Text style={[styles.categoryTitle, darkMode && styles.darkText]}>
                  {category.title}
                </Text>
              </View>
              <ChevronRight size={20} color={darkMode ? '#AAAAAA' : '#757575'} />
            </Pressable>
          ))}
        </View>

        <View style={styles.faqSection}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
            Pertanyaan Umum
          </Text>
          {FAQ_ITEMS.map((faq) => (
            <View
              key={faq.id}
              style={[styles.faqItem, darkMode && styles.darkFaqItem]}
            >
              <Pressable
                style={styles.faqQuestion}
                onPress={() => toggleFaq(faq.id)}
              >
                <Text style={[styles.questionText, darkMode && styles.darkText]}>
                  {faq.question}
                </Text>
                <ChevronDown
                  size={20}
                  color={darkMode ? '#AAAAAA' : '#757575'}
                  style={[
                    styles.faqIcon,
                    expandedFaq === faq.id && styles.faqIconExpanded,
                  ]}
                />
              </Pressable>
              {expandedFaq === faq.id && (
                <Text style={[styles.answerText, darkMode && styles.darkSubtext]}>
                  {faq.answer}
                </Text>
              )}
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
    backgroundColor: '#F5F5F5',
  },
  darkContainer: {
    backgroundColor: '#121212',
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
  darkHeader: {
    backgroundColor: '#1E1E1E',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  darkText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  darkSearchContainer: {
    backgroundColor: '#1E1E1E',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#2C2C2C',
  },
  darkSearchInput: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  contactSection: {
    marginBottom: 24,
  },
  contactOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 4,
    elevation: 1,
  },
  darkContactButton: {
    backgroundColor: '#1E1E1E',
  },
  contactText: {
    marginTop: 8,
    fontSize: 14,
    color: '#2C2C2C',
  },
  categoriesSection: {
    marginBottom: 24,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    elevation: 1,
  },
  darkCategoryItem: {
    backgroundColor: '#1E1E1E',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 15,
    marginLeft: 12,
  },
  faqSection: {
    marginBottom: 24,
  },
  faqItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    elevation: 1,
  },
  darkFaqItem: {
    backgroundColor: '#1E1E1E',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  faqIcon: {
    transform: [{ rotate: '0deg' }],
  },
  faqIconExpanded: {
    transform: [{ rotate: '180deg' }],
  },
  answerText: {
    fontSize: 14,
    color: '#757575',
    marginTop: 12,
    lineHeight: 20,
  },
  darkSubtext: {
    color: '#AAAAAA',
  },
});