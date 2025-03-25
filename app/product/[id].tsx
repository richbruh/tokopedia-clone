import { View, Text, Image, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Heart, Share2, ShoppingCart } from 'lucide-react-native';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';

const SAMPLE_PRODUCTS = {
  '1': {
    id: '1',
    name: 'iPhone 13 Pro Max 256GB',
    price: 17999000,
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5',
    store: 'Apple Official Store',
    location: 'Jakarta Pusat',
    description: 'iPhone 13 Pro Max. Sistem kamera Pro yang paling canggih pada iPhone. Layar Super Retina XDR dengan ProMotion. Chip A15 Bionic yang sangat cepat. Ketahanan yang melonjak drastis. Dan kecepatan 5G yang mengesankan.',
    rating: 4.9,
    sold: 1250,
    stock: 50
  },
  '2': {
    id: '2',
    name: 'Samsung Galaxy S21 Ultra',
    price: 15999000,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf',
    store: 'Samsung Official Store',
    location: 'Jakarta Selatan',
    description: 'Samsung Galaxy S21 Ultra. Kamera profesional 108MP. Layar Dynamic AMOLED 2X. Prosesor Exynos 2100. Baterai 5000mAh dengan pengisian cepat 25W.',
    rating: 4.8,
    sold: 980,
    stock: 35
  }
};

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const product = SAMPLE_PRODUCTS[id as keyof typeof SAMPLE_PRODUCTS];
  const addItem = useCartStore((state) => state.addItem);

 // Get wishlist functions
 const { addItem: addToWishlist, removeItem: removeFromWishlist, isItemWishlisted } = useWishlistStore();
 const isWishlisted = isItemWishlisted(product?.id);
  
  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  // Function to toggle wishlist status
  const handleToggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        store: product.store
      });
    }
  };
  
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  const handleBuyNow = () => {
    // Navigate to checkout with product data
    router.push({
      pathname: '/checkout',
      params: {
        items: JSON.stringify([{
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        }]),
        total: product.price
      }
    });
  };

  return (
<View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.headerButton}>
          <ArrowLeft size={24} color="#2C2C2C" />
        </Pressable>
        <View style={styles.headerRight}>
          <Pressable style={styles.headerButton}>
            <Share2 size={24} color="#2C2C2C" />
          </Pressable>
          
          {/* Update this Pressable to toggle wishlist */}
          <Pressable onPress={handleToggleWishlist} style={styles.headerButton}>
              <Heart 
                size={24} 
                color={isWishlisted ? "#FF5C5C" : "#2C2C2C"} 
                fill={isWishlisted ? "#FF5C5C" : "transparent"} 
              />
          </Pressable>
          
          <Pressable style={styles.headerButton}>
            <ShoppingCart size={24} color="#2C2C2C" />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Image source={{ uri: product.image }} style={styles.image} />
        
        <View style={styles.details}>
          <Text style={styles.price}>Rp {product.price.toLocaleString('id-ID')}</Text>
          <Text style={styles.name}>{product.name}</Text>
          
          <View style={styles.stats}>
            <Text style={styles.statText}>Terjual {product.sold} • ⭐ {product.rating}</Text>
          </View>
          
          <View style={styles.store}>
            <Text style={styles.storeName}>{product.store}</Text>
            <Text style={styles.location}>{product.location}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Deskripsi Produk</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.chatButton}>
          <Text style={styles.chatButtonText}>Chat</Text>
        </Pressable>
        <Pressable style={styles.buyButton} onPress={handleBuyNow}>
          <Text style={styles.buyButtonText}>Beli Langsung</Text>
        </Pressable>
        <Pressable style={styles.cartButton} onPress={handleAddToCart}>
          <Text style={styles.cartButtonText}>+ Keranjang</Text>
        </Pressable>
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingTop: 48,
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  details: {
    padding: 16,
  },
  price: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#03AC0E',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#2C2C2C',
    marginBottom: 8,
  },
  stats: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#757575',
  },
  store: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 16,
  },
  storeName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#2C2C2C',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#757575',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#2C2C2C',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#2C2C2C',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: 'white',
  },
  chatButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#03AC0E',
    borderRadius: 8,
    marginRight: 8,
  },
  chatButtonText: {
    color: '#03AC0E',
    textAlign: 'center',
    fontFamily: 'Inter_600SemiBold',
  },
  buyButton: {
    flex: 2,
    padding: 12,
    backgroundColor: '#03AC0E',
    borderRadius: 8,
    marginRight: 8,
  },
  buyButtonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Inter_600SemiBold',
  },
  cartButton: {
    flex: 2,
    padding: 12,
    backgroundColor: '#03AC0E',
    borderRadius: 8,
  },
  cartButtonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Inter_600SemiBold',
  },
});