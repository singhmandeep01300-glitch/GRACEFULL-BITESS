/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { SAMPLE_PRODUCTS, INITIAL_REVIEWS } from './data/products';
import { Product, ProductCategory, ProductVariant, CartItem, ReviewItem, TrackedOrder } from './types';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategorySection } from './components/CategorySection';
import { ProductGrid } from './components/ProductGrid';
import { WhyChooseUs } from './components/WhyChooseUs';
import { SpecialGiftCollection } from './components/SpecialGiftCollection';
import { BrandStory } from './components/BrandStory';
import { CustomerReviews } from './components/CustomerReviews';
import { InstagramGallery } from './components/InstagramGallery';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { PolicyModals, PolicyType } from './components/PolicyModals';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { OrderTrackerModal } from './components/OrderTrackerModal';

export default function App() {
  const [products] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('graceful_bitess_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User placed orders persisted to localStorage
  const [userOrders, setUserOrders] = useState<TrackedOrder[]>(() => {
    try {
      const saved = localStorage.getItem('graceful_bitess_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('graceful_bitess_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Applied coupon
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(() => {
    return localStorage.getItem('graceful_bitess_coupon') || null;
  });

  // Customer reviews
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);

  // Global gift card message
  const [globalGiftNote, setGlobalGiftNote] = useState<string>('');

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string>('');
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('graceful_bitess_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Save user orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('graceful_bitess_orders', JSON.stringify(userOrders));
    } catch {
      // ignore
    }
  }, [userOrders]);

  // Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('graceful_bitess_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Navigation scroll helper
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add to cart handler
  const handleAddToCart = (product: Product, variant: ProductVariant, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant.id === variant.id
      );

      if (existingIndex > -1) {
        const next = [...prevCart];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prevCart, { product, selectedVariant: variant, quantity }];
      }
    });
  };

  // Buy Now handler
  const handleBuyNow = (product: Product, variant: ProductVariant, quantity = 1) => {
    handleAddToCart(product, variant, quantity);
    setIsCheckoutOpen(true);
  };

  // Update quantity in cart
  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCart((prev) => {
      const next = [...prev];
      next[index].quantity = newQty;
      return next;
    });
  };

  // Remove from cart
  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  // Apply Coupon code
  const handleApplyCoupon = (code: string): boolean => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'WELCOME10' || normalized === 'SWEETBITES') {
      setAppliedCoupon(normalized);
      localStorage.setItem('graceful_bitess_coupon', normalized);
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    localStorage.removeItem('graceful_bitess_coupon');
  };

  // Add review
  const handleAddReview = (newRev: Omit<ReviewItem, 'id' | 'date' | 'verifiedPurchase'>) => {
    const reviewItem: ReviewItem = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      verifiedPurchase: true,
    };
    setReviews([reviewItem, ...reviews]);
  };

  // Select category from category cards or footer
  const handleCategorySelect = (category: ProductCategory) => {
    setSelectedCategory(category);
    handleNavigateSection('shop');
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistIds = wishlist.map((p) => p.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F0E6] text-[#3E2723]">
      
      {/* 3.A Announcement Bar */}
      <AnnouncementBar />

      {/* 3.B Sticky Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenTracker={() => {
          setTrackingOrderId('');
          setIsTrackerOpen(true);
        }}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        {/* 3.C Hero Section */}
        <HeroSection
          onShopClick={() => handleNavigateSection('shop')}
          onGiftsClick={() => handleNavigateSection('gifting')}
        />

        {/* 3.D Shop by Category */}
        <CategorySection onSelectCategory={handleCategorySelect} />

        {/* 3.E Best-Selling Chocolates & Full Catalog */}
        <ProductGrid
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectProduct={(p) => setActiveProduct(p)}
          onAddToCart={handleAddToCart}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* 3.F Why Choose Graceful Bitess */}
        <WhyChooseUs />

        {/* 3.G Special Gift Collection */}
        <SpecialGiftCollection
          onShopGifts={() => {
            setSelectedCategory('Chocolate Gift Boxes');
            handleNavigateSection('shop');
          }}
          onSetGlobalGiftNote={(note) => {
            setGlobalGiftNote(note);
          }}
        />

        {/* 3.H Brand Story */}
        <BrandStory />

        {/* 3.I Customer Reviews */}
        <CustomerReviews
          reviews={reviews}
          onAddReview={handleAddReview}
        />

        {/* 3.J Instagram & Social Media */}
        <InstagramGallery />

        {/* 3.K Newsletter Section */}
        <NewsletterSection onApplyCoupon={handleApplyCoupon} />
      </main>

      {/* 3.L Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onSelectCategory={handleCategorySelect}
        onOpenPolicy={(policy) => setActivePolicy(policy)}
        onOpenTracker={() => {
          setTrackingOrderId('');
          setIsTrackerOpen(true);
        }}
      />

      {/* 4. Product Details Modal */}
      <ProductDetailModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        allProducts={products}
        onSelectRelated={(p) => setActiveProduct(p)}
      />

      {/* 5. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />

      {/* 5. Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderPlaced={(trackedOrder) => {
          setUserOrders((prev) => [trackedOrder, ...prev]);
          setCart([]);
        }}
        onTrackOrder={(orderId) => {
          setTrackingOrderId(orderId);
          setIsTrackerOpen(true);
        }}
        appliedCoupon={appliedCoupon}
        globalGiftNote={globalGiftNote}
      />

      {/* Order Tracker Modal / Drawer */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        initialOrderId={trackingOrderId}
        userOrders={userOrders}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => setActiveProduct(p)}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onSelectProduct={(p) => setActiveProduct(p)}
      />

      {/* Policy Modals */}
      <PolicyModals
        activePolicy={activePolicy}
        onClose={() => setActivePolicy(null)}
      />

      {/* 6. WhatsApp Floating Button on Every Page */}
      <WhatsAppFloatingButton />

    </div>
  );
}
