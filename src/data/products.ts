import { Product, ReviewItem } from '../types';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'prod-classic-milk',
    name: 'Classic Milk Chocolate',
    slug: 'classic-milk-chocolate',
    category: 'Milk Chocolates',
    shortDescription: 'Silky smooth milk chocolate crafted with rich dairy cream and single-origin cocoa beans.',
    description: 'Our signature Classic Milk Chocolate bar combines velvety whole milk goodness with fine aromatic cocoa. Melt-in-the-mouth texture with delicate caramel and vanilla undertones. Perfect for daily sweet cravings or tea-time indulgence.',
    basePrice: 180,
    originalPrice: 220,
    rating: 4.9,
    reviewsCount: 38,
    isBestSeller: true,
    isFeatured: true,
    isSample: true,
    imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=800&q=80',
    cocoaPercentage: '38% Cocoa',
    weightGrams: 90,
    inStock: true,
    variants: [
      { id: 'var-milk-single', name: 'Single Bar (90g)', price: 180, originalPrice: 220 },
      { id: 'var-milk-duo', name: 'Duo Pack (2 x 90g)', price: 340, originalPrice: 440 },
      { id: 'var-milk-four', name: 'Family Pack (4 x 90g)', price: 650, originalPrice: 880 },
    ],
    ingredients: ['Cacao mass', 'Cocoa butter', 'Whole milk powder', 'Pure cane sugar', 'Natural Bourbon vanilla extract', 'Sunflower lecithin'],
    allergens: ['Contains Milk', 'May contain traces of tree nuts and soy'],
    storageInstructions: 'Store in a cool, dry place between 15°C and 18°C. Keep away from direct sunlight and strong odors.',
    shelfLife: '90 days from the date of packing'
  },
  {
    id: 'prod-dark-delight',
    name: 'Dark Chocolate Delight',
    slug: 'dark-chocolate-delight',
    category: 'Dark Chocolates',
    shortDescription: 'Intense 70% dark chocolate bar with deep roasted cocoa notes and a subtle fruity finish.',
    description: 'For the discerning dark chocolate connoisseur. Crafted with 70% pure cocoa, offering a crisp snap, deep earthy aromatics, and a balanced bittersweet finish. Free from excessive sugar, highlighting pure cocoa craftsmanship.',
    basePrice: 220,
    originalPrice: 260,
    rating: 4.8,
    reviewsCount: 42,
    isBestSeller: true,
    isFeatured: true,
    isSample: true,
    imageUrl: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=800&q=80',
    cocoaPercentage: '70% Cocoa',
    weightGrams: 90,
    inStock: true,
    variants: [
      { id: 'var-dark-single', name: 'Single Bar (90g)', price: 220, originalPrice: 260 },
      { id: 'var-dark-trio', name: 'Trio Connoisseur (3 x 90g)', price: 620, originalPrice: 780 },
    ],
    ingredients: ['Cocoa solids (70%)', 'Cocoa butter', 'Unrefined cane sugar', 'Natural vanilla bean'],
    allergens: ['Vegan friendly', 'May contain traces of dairy and tree nuts'],
    storageInstructions: 'Store in a cool, dry place between 14°C and 18°C. Do not refrigerate directly.',
    shelfLife: '120 days from date of packaging'
  },
  {
    id: 'prod-chocolate-truffle-box',
    name: 'Chocolate Truffle Box',
    slug: 'chocolate-truffle-box',
    category: 'Chocolate Truffles',
    shortDescription: 'Velvety artisanal truffles rolled in roasted nuts, dark cocoa powder, and golden flakes.',
    description: 'A decadent collection of hand-rolled gourmet chocolate truffles. Each sphere houses a luscious dark or milk chocolate ganache infused with hazelnut praline, salted caramel, or espresso. Nestled in an ivory gift box with gold foil highlights.',
    basePrice: 499,
    originalPrice: 599,
    rating: 5.0,
    reviewsCount: 29,
    isBestSeller: true,
    isFeatured: true,
    isSample: true,
    imageUrl: 'https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=800&q=80',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80',
    cocoaPercentage: '60% Ganache Blend',
    inStock: true,
    variants: [
      { id: 'var-truffle-6', name: 'Classic Box of 6 Pcs', price: 499, originalPrice: 599 },
      { id: 'var-truffle-12', name: 'Luxury Box of 12 Pcs', price: 899, originalPrice: 1099 },
      { id: 'var-truffle-24', name: 'Grand Box of 24 Pcs', price: 1699, originalPrice: 1999 },
    ],
    ingredients: ['Heavy dairy cream', 'Dark cocoa solids', 'Cocoa butter', 'Cane sugar', 'Roasted hazelnut paste', 'Sea salt', 'Real gold dusting'],
    allergens: ['Contains Milk and Tree Nuts (Hazelnuts)'],
    storageInstructions: 'Store in an air-conditioned room or wine cooler (16°C–19°C). Consume fresh.',
    shelfLife: '45 days from packing'
  },
  {
    id: 'prod-assorted-gift-box',
    name: 'Assorted Chocolate Gift Box',
    slug: 'assorted-chocolate-gift-box',
    category: 'Chocolate Gift Boxes',
    shortDescription: 'Curated mix of milk, dark, white chocolate bonbons, and nut clusters in a satin-ribbon box.',
    description: 'Our most versatile gifting option. Carefully selected assortment featuring creamy milk bars, 70% dark squares, roasted almond rochers, and delicate fruit-infused pralines. Presented in our signature deep chocolate brown keepsake box.',
    basePrice: 750,
    originalPrice: 899,
    rating: 4.9,
    reviewsCount: 54,
    isBestSeller: true,
    isFeatured: true,
    isSample: true,
    imageUrl: 'https://images.unsplash.com/photo-1575372587186-50020b0a4843?auto=format&fit=crop&w=800&q=80',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    variants: [
      { id: 'var-assorted-medium', name: 'Medium Gift Box (12 Pieces)', price: 750, originalPrice: 899 },
      { id: 'var-assorted-large', name: 'Large Gift Box (20 Pieces)', price: 1199, originalPrice: 1450 },
    ],
    ingredients: ['Cocoa mass', 'Cocoa butter', 'Milk powder', 'Roasted Californian almonds', 'Organic cane sugar', 'Pure vanilla extract'],
    allergens: ['Contains Milk, Almonds', 'Processed in a facility that handles peanuts'],
    storageInstructions: 'Keep in dry conditions below 20°C away from sunlight.',
    shelfLife: '60 days'
  },
  {
    id: 'prod-celebration-hamper',
    name: 'Premium Celebration Hamper',
    slug: 'premium-celebration-hamper',
    category: 'Festive & Rakhi Hampers',
    shortDescription: 'Grand festive hamper with artisanal chocolate bars, truffle jars, chocolate-coated almonds & card.',
    description: 'Designed for memorable occasions, anniversaries, Rakhi, Diwali, and festive milestones. Includes 2 artisan chocolate bars, 1 glass jar of chocolate-coated almonds, 1 box of 6 handcrafted truffles, and a personalized handwritten greeting card.',
    basePrice: 1499,
    originalPrice: 1899,
    rating: 5.0,
    reviewsCount: 31,
    isBestSeller: true,
    isFeatured: true,
    isSample: true,
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    variants: [
      { id: 'var-hamper-classic', name: 'Classic Celebration Hamper', price: 1499, originalPrice: 1899 },
      { id: 'var-hamper-royal', name: 'Royal Velvet Hamper + Brass Keepsake', price: 2199, originalPrice: 2699 },
    ],
    ingredients: ['Pure cacao', 'Cocoa butter', 'Dairy cream', 'California almonds', 'Cane sugar', 'Natural sea salt'],
    allergens: ['Contains Milk, Nuts (Almonds)'],
    storageInstructions: 'Store in a cool dry area away from dampness.',
    shelfLife: '60 days'
  },
  {
    id: 'prod-personalized-collection',
    name: 'Personalized Chocolate Collection',
    slug: 'personalized-chocolate-collection',
    category: 'Custom Chocolate Boxes',
    shortDescription: 'Customizable chocolate box with engraved chocolate slab, custom flavours, and personal message sleeve.',
    description: 'Make someone feel truly cherished. Choose custom chocolate flavors and add an edible personalized name or message bar on top. Ideal for anniversaries, birthdays, weddings, or corporate appreciation.',
    basePrice: 950,
    originalPrice: 1150,
    rating: 4.9,
    reviewsCount: 22,
    isBestSeller: true,
    isFeatured: true,
    isSample: true,
    imageUrl: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    variants: [
      { id: 'var-personal-9', name: '9-Piece Custom Sleeve Box', price: 950, originalPrice: 1150 },
      { id: 'var-personal-16', name: '16-Piece Monogram Box', price: 1550, originalPrice: 1850 },
    ],
    ingredients: ['Premium cocoa mass', 'Cocoa butter', 'Whole milk solids', 'Selected spices & nuts', 'Unrefined cane sugar'],
    allergens: ['Contains Milk', 'Nut varieties available upon selection'],
    storageInstructions: 'Keep in temperature controlled room (16–18°C).',
    shelfLife: '45 days'
  },
  {
    id: 'prod-white-silk-almond',
    name: 'White Chocolate Silk & Roasted Almonds',
    slug: 'white-chocolate-silk-roasted-almonds',
    category: 'White Chocolates',
    shortDescription: 'Creamy white chocolate infused with whole roasted California almonds and Madagascar vanilla.',
    description: 'Made with genuine cocoa butter and fresh whole dairy milk, slow-conched for silky perfection and paired with golden slow-roasted almonds for an addictive crunch.',
    basePrice: 210,
    originalPrice: 250,
    rating: 4.7,
    reviewsCount: 19,
    isBestSeller: false,
    isFeatured: false,
    isSample: true,
    imageUrl: 'https://images.unsplash.com/photo-1587132137056-bfbf01668361?auto=format&fit=crop&w=800&q=80',
    cocoaPercentage: '32% Cocoa Butter',
    weightGrams: 90,
    inStock: true,
    variants: [
      { id: 'var-white-single', name: 'Single Bar (90g)', price: 210, originalPrice: 250 },
      { id: 'var-white-duo', name: 'Duo Pack (2 x 90g)', price: 399, originalPrice: 500 },
    ],
    ingredients: ['Cocoa butter (32%)', 'Milk powder', 'Roasted almonds (18%)', 'Sugar', 'Natural vanilla'],
    allergens: ['Contains Milk and Almonds'],
    storageInstructions: 'Store in a cool dry pantry away from light.',
    shelfLife: '90 days'
  },
  {
    id: 'prod-birthday-bonbon-box',
    name: 'Birthday Bonbon Celebration Box',
    slug: 'birthday-bonbon-celebration-box',
    category: 'Birthday Gifts',
    shortDescription: 'Festive birthday bonbons with colorful cocoa butter splatters and a mini celebration card.',
    description: 'Turn birthdays into sweet celebrations! Each bonbon is filled with decadent flavors like Strawberry White Ganache, Dark Sea Salt Caramel, and Rich Hazelnut Crunch. Comes ready-to-gift with a celebratory ribbon.',
    basePrice: 699,
    originalPrice: 850,
    rating: 4.9,
    reviewsCount: 26,
    isBestSeller: false,
    isFeatured: true,
    isSample: true,
    imageUrl: 'https://images.unsplash.com/photo-1526081347589-7fa3cb41b4b2?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    variants: [
      { id: 'var-bday-8', name: 'Box of 8 Festive Bonbons', price: 699, originalPrice: 850 },
      { id: 'var-bday-16', name: 'Deluxe Box of 16 Bonbons', price: 1299, originalPrice: 1550 },
    ],
    ingredients: ['Dark and milk chocolate', 'Fruit puree', 'Cream', 'Butter', 'Natural food color cocoa butter'],
    allergens: ['Contains Milk, Tree Nuts'],
    storageInstructions: 'Cool storage between 16°C and 19°C.',
    shelfLife: '30 days'
  }
];

export const CATEGORIES_DATA = [
  {
    name: 'Milk Chocolates',
    description: 'Smooth, creamy, and gently sweet',
    imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80',
    itemCount: '3 Variants'
  },
  {
    name: 'Dark Chocolates',
    description: 'Rich, bittersweet 70%+ cocoa bars',
    imageUrl: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=600&q=80',
    itemCount: '2 Variants'
  },
  {
    name: 'White Chocolates',
    description: 'Delicate pure cocoa butter confections',
    imageUrl: 'https://images.unsplash.com/photo-1587132137056-bfbf01668361?auto=format&fit=crop&w=600&q=80',
    itemCount: '2 Variants'
  },
  {
    name: 'Chocolate Truffles',
    description: 'Hand-rolled velvety ganache bites',
    imageUrl: 'https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=600&q=80',
    itemCount: '3 Sizes'
  },
  {
    name: 'Chocolate Gift Boxes',
    description: 'Elegantly packaged for special moments',
    imageUrl: 'https://images.unsplash.com/photo-1575372587186-50020b0a4843?auto=format&fit=crop&w=600&q=80',
    itemCount: 'Bestseller'
  },
  {
    name: 'Festive & Rakhi Hampers',
    description: 'Festive assortments with greetings',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    itemCount: 'Grand Hampers'
  },
  {
    name: 'Birthday Gifts',
    description: 'Bonbons and celebration sleeves',
    imageUrl: 'https://images.unsplash.com/photo-1526081347589-7fa3cb41b4b2?auto=format&fit=crop&w=600&q=80',
    itemCount: 'Celebration'
  },
  {
    name: 'Custom Chocolate Boxes',
    description: 'Select your pieces & personal note',
    imageUrl: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=600&q=80',
    itemCount: 'Bespoke'
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    customerName: 'Priya Sharma',
    city: 'Civil Lines, Aligarh',
    rating: 5,
    date: 'October 18, 2026',
    comment: 'Ordered the Chocolate Truffle Box for my sister’s anniversary. The packaging looked so royal and the truffles melted right in your mouth. Mandeep personally confirmed the delivery slot on WhatsApp!',
    productName: 'Chocolate Truffle Box',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    customerName: 'Aman Agarwal',
    city: 'Ramghat Road, Aligarh',
    rating: 5,
    date: 'October 12, 2026',
    comment: 'The 70% Dark Chocolate Delight has the right snap and genuine cocoa aroma without being overly sugary. Truly a luxury treat for Aligarh. Timely delivery before 2 PM as requested.',
    productName: 'Dark Chocolate Delight',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    customerName: 'Neha Verma',
    city: 'Marris Road, Aligarh',
    rating: 5,
    date: 'September 28, 2026',
    comment: 'Graceful Bitess made our Rakhi celebrations extra special. The personalized message card was neatly printed and the chocolate hamper arrived in perfect temperature.',
    productName: 'Premium Celebration Hamper',
    verifiedPurchase: true
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    imageUrl: 'https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=600&q=80',
    likes: 142,
    caption: 'Fresh batch of golden dusted truffles ready for afternoon dispatch in Aligarh ✨'
  },
  {
    id: 'ig-2',
    imageUrl: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=600&q=80',
    likes: 198,
    caption: 'Pure 70% cocoa blocks getting tempered to perfection. Hear that snap!'
  },
  {
    id: 'ig-3',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    likes: 215,
    caption: 'Tying the golden ribbons on our festive celebration hampers 🎀'
  },
  {
    id: 'ig-4',
    imageUrl: 'https://images.unsplash.com/photo-1575372587186-50020b0a4843?auto=format&fit=crop&w=600&q=80',
    likes: 167,
    caption: 'A little bite of happiness for someone’s special milestone today.'
  }
];

export const ALIGARH_DELIVERY_AREAS = [
  'Civil Lines',
  'Marris Road',
  'Ramghat Road',
  'Dodhpur',
  'Medical College Road',
  'Swarna Jayanti Nagar',
  'Centre Point',
  'Anupshahr Road',
  'GT Road',
  'Sasni Gate',
  'Other Aligarh Locality'
];
