import { useState, createContext, useContext, useEffect } from 'react'
import { Routes, Route, Link, useLocation, useParams, useNavigate } from 'react-router-dom'
import { ShoppingBag, Menu, X, Search, Heart, Star, ArrowRight, Instagram, Twitter, Facebook, Mail, Phone, MapPin, ChevronRight, Minus, Plus, Trash2, Check, ZoomIn, Share2, ArrowLeft } from 'lucide-react'

// Cart Context
const CartContext = createContext()

const useCart = () => useContext(CartContext)

// Sample Review Data
const productReviews = {
  1: [
    { id: 1, user: 'Sarah M.', rating: 5, date: '2026-03-01', title: 'Absolutely stunning!', content: 'This dress exceeded my expectations. The silk is luxurious and the fit is perfect. Received so many compliments at the gala!', helpful: 24 },
    { id: 2, user: 'Emma L.', rating: 5, date: '2026-02-28', title: 'Worth every penny', content: 'Beautiful craftsmanship. The draping is elegant and flattering. True to size.', helpful: 18 },
    { id: 3, user: 'Jessica R.', rating: 4, date: '2026-02-25', title: 'Gorgeous but runs slightly large', content: 'Stunning dress! I ordered my usual size M but could have gone with S. Still keeping it because it\'s beautiful.', helpful: 12 },
  ],
  2: [
    { id: 1, user: 'Michelle K.', rating: 5, date: '2026-03-02', title: 'Best coat I\'ve ever owned', content: 'The cashmere blend is so soft and warm. Perfect for winter. The tailored fit is very flattering.', helpful: 31 },
    { id: 2, user: 'Anna P.', rating: 5, date: '2026-02-20', title: 'Luxury quality', content: 'This coat feels like it should cost twice as much. Excellent quality and the camel color is gorgeous.', helpful: 22 },
  ],
}

// Sample Data
const products = [
  {
    id: 1,
    name: 'Silk Evening Dress',
    price: 299,
    originalPrice: 399,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
    ],
    description: 'Elegant silk evening dress perfect for special occasions. Features a flattering silhouette with delicate draping and a timeless design that exudes sophistication.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy'],
    rating: 4.8,
    reviews: 124,
    new: true,
  },
  {
    id: 2,
    name: 'Cashmere Blend Coat',
    price: 459,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600',
      'https://images.unsplash.com/photo-1544923408-75c754f7a4e6?w=600',
    ],
    description: 'Luxurious cashmere blend coat with a modern tailored fit. Perfect for cold weather while maintaining an elegant silhouette.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Black', 'Gray'],
    rating: 4.9,
    reviews: 89,
    new: true,
  },
  {
    id: 3,
    name: 'Leather Ankle Boots',
    price: 189,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600',
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600',
      'https://images.unsplash.com/photo-1605733513597-a8f8341084e6?w=600',
    ],
    description: 'Premium leather ankle boots with a comfortable block heel. Versatile style that pairs perfectly with any outfit.',
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: ['Black', 'Brown', 'Tan'],
    rating: 4.7,
    reviews: 256,
  },
  {
    id: 4,
    name: 'Minimalist Gold Necklace',
    price: 79,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=600',
    images: [
      'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=600',
      'https://images.unsplash.com/photo-1601121141461-6d6e110d1e77?w=600',
    ],
    description: 'Delicate gold-plated necklace with a minimalist design. Perfect for layering or wearing alone for a subtle touch of elegance.',
    sizes: ['One Size'],
    colors: ['Gold', 'Silver', 'Rose Gold'],
    rating: 4.6,
    reviews: 342,
    sale: true,
  },
  {
    id: 5,
    name: 'Wool Blend Blazer',
    price: 229,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
      'https://images.unsplash.com/photo-1550614000-4b9519e02a48?w=600',
    ],
    description: 'Tailored wool blend blazer with a modern fit. Essential piece for any professional wardrobe.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Charcoal'],
    rating: 4.8,
    reviews: 178,
  },
  {
    id: 6,
    name: 'High-Waist Wide Leg Trousers',
    price: 149,
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600',
      'https://images.unsplash.com/photo-1551854290-3957f1e0c81c?w=600',
    ],
    description: 'Elegant high-waist wide leg trousers with a flattering silhouette. Perfect for both office and evening wear.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Cream', 'Navy'],
    rating: 4.5,
    reviews: 203,
  },
  {
    id: 7,
    name: 'Cashmere Sweater',
    price: 199,
    originalPrice: 249,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600',
      'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?w=600',
    ],
    description: 'Pure cashmere sweater with a relaxed fit. Incredibly soft and warm, perfect for cold days.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Beige', 'Gray', 'Black', 'Cream'],
    rating: 4.9,
    reviews: 167,
    sale: true,
  },
  {
    id: 8,
    name: 'Structured Handbag',
    price: 329,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600',
    ],
    description: 'Elegant structured handbag in premium leather. Features multiple compartments and a detachable shoulder strap.',
    sizes: ['One Size'],
    colors: ['Black', 'Tan', 'Burgundy'],
    rating: 4.7,
    reviews: 145,
    new: true,
  },
]

const categories = ['All', 'Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Shoes', 'Accessories']

// Header Component
function Header({ cartCount }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="font-display text-2xl font-bold tracking-tight">
            E-<span className="text-fashion-gold">FASHION</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  location.pathname === link.path
                    ? 'text-fashion-black'
                    : 'text-gray-500 hover:text-fashion-black'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button className="text-gray-600 hover:text-fashion-black transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-600 hover:text-fashion-black transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <Link to="/cart" className="relative text-gray-600 hover:text-fashion-black transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-fashion-gold text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-3 text-gray-600 hover:text-fashion-black"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-fashion-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">
              E-<span className="text-fashion-gold">FASHION</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover the latest trends in fashion. Quality pieces that elevate your style.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-medium mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-medium mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe for exclusive offers and updates.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-fashion-gold"
              />
              <button className="px-6 py-3 bg-fashion-gold hover:bg-yellow-600 transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2026 E-Fashion. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Product Card Component
function ProductCard({ product }) {
  const { addToCart } = useCart()
  const navigate = useNavigate()

  return (
    <div className="group cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] card-hover">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.new && (
            <span className="px-3 py-1 bg-fashion-black text-white text-xs font-medium">NEW</span>
          )}
          {product.sale && (
            <span className="px-3 py-1 bg-fashion-gold text-white text-xs font-medium">SALE</span>
          )}
        </div>

        {/* Quick Add */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            addToCart(product)
          }}
          className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-fashion-black hover:text-white shadow-lg"
        >
          <ShoppingBag className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-4">
        <h3 className="font-medium text-fashion-black group-hover:text-fashion-gold transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-fashion-black font-medium">${product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  )
}

// Home Page
function HomePage() {
  const featuredProducts = products.slice(0, 4)

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl animate-slide-up">
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              New Season<br />
              <span className="text-fashion-gold">Arrivals</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 leading-relaxed">
              Discover our latest collection of premium fashion pieces. 
              Elevate your wardrobe with timeless elegance and modern sophistication.
            </p>
            <div className="flex gap-4">
              <Link to="/shop" className="btn-primary">
                Shop Now
              </Link>
              <Link to="/shop" className="btn-secondary border-white text-white hover:bg-white hover:text-fashion-black">
                View Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-fashion-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Explore our curated categories designed for every occasion and style.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Dresses', 'Outerwear', 'Shoes', 'Accessories'].map((category, index) => (
              <Link
                key={category}
                to={`/shop?category=${category}`}
                className="group relative aspect-[3/4] overflow-hidden card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={`https://source.unsplash.com/random/400x500?${category.toLowerCase()},fashion`}
                  alt={category}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white font-display text-xl font-semibold">{category}</h3>
                  <span className="text-gray-300 text-sm flex items-center gap-1 mt-1">
                    Shop Now <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="section-title mb-4">Featured Products</h2>
              <p className="text-gray-600">Handpicked pieces just for you.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-fashion-black font-medium hover:text-fashion-gold transition-colors">
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link to="/shop" className="btn-secondary inline-flex items-center gap-2">
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-fashion-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
            Join Our Community
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Subscribe to receive exclusive offers, early access to new collections, and style inspiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-fashion-gold"
            />
            <button className="px-8 py-4 bg-fashion-gold hover:bg-yellow-600 transition-colors font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Shop Page
function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState([0, 500])

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'All') return true
    return product.category === selectedCategory
  })

  return (
    <div className="pt-20 min-h-screen">
      {/* Page Header */}
      <div className="bg-fashion-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-fashion-black mb-4">
            Shop All
          </h1>
          <p className="text-gray-600">Discover our complete collection.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 space-y-8">
            {/* Categories */}
            <div>
              <h3 className="font-medium text-fashion-black mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left py-2 text-sm transition-colors ${
                      selectedCategory === category
                        ? 'text-fashion-black font-medium'
                        : 'text-gray-500 hover:text-fashion-black'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-medium text-fashion-black mb-4">Price Range</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="rounded" />
                  Under $100
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="rounded" />
                  $100 - $200
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="rounded" />
                  $200 - $300
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="rounded" />
                  Over $300
                </label>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b">
              <p className="text-gray-600 text-sm">
                Showing {filteredProducts.length} products
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-fashion-black"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="animate-fade-in"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Image Gallery Modal
function ImageGalleryModal({ images, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1))
      if (e.key === 'ArrowRight') setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0))
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [images.length, onClose])

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-6 text-white hover:text-gray-300 z-10">
        <X className="w-8 h-8" />
      </button>
      
      <button
        onClick={(e) => { e.stopPropagation(); setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1)) }}
        className="absolute left-6 text-white hover:text-gray-300"
      >
        <ArrowLeft className="w-8 h-8" />
      </button>
      
      <div className="max-w-5xl max-h-screen p-8" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[currentIndex]}
          alt=""
          className="max-h-[80vh] w-auto object-contain"
        />
        <div className="flex justify-center gap-2 mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(index) }}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
        <p className="text-white text-center mt-4 text-sm">
          {currentIndex + 1} / {images.length}
        </p>
      </div>
      
      <button
        onClick={(e) => { e.stopPropagation(); setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0)) }}
        className="absolute right-6 text-white hover:text-gray-300"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  )
}

// Review Card Component
function ReviewCard({ review }) {
  const [helpful, setHelpful] = useState(false)
  
  return (
    <div className="border-b border-gray-100 py-6 last:border-0">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating ? 'text-fashion-gold fill-fashion-gold' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-medium text-fashion-black">{review.title}</span>
          </div>
          <p className="text-sm text-gray-500">{review.user} • {review.date}</p>
        </div>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-3">{review.content}</p>
      <button
        onClick={() => setHelpful(!helpful)}
        className={`text-sm transition-colors ${
          helpful ? 'text-fashion-black' : 'text-gray-400 hover:text-fashion-black'
        }`}
      >
        👍 {helpful ? 'Helpful' : 'Was this helpful?'} {helpful ? `(${review.helpful + 1})` : `(${review.helpful})`}
      </button>
    </div>
  )
}

// Product Detail Page (Enhanced)
function ProductDetailPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [showGallery, setShowGallery] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [activeTab, setActiveTab] = useState('reviews')

  const product = products.find(p => p.id === parseInt(id))
  const reviews = productReviews[id] || []
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-fashion-black mb-4">Product Not Found</h1>
          <button onClick={() => navigate('/')} className="btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    } else {
      alert('Please select a size and color')
    }
  }

  const colorMap = {
    'Black': '#1a1a1a',
    'Navy': '#1e3a5f',
    'Burgundy': '#800020',
    'Camel': '#c19a6b',
    'Gray': '#808080',
    'Brown': '#8b4513',
    'Tan': '#d2b48c',
    'Gold': '#ffd700',
    'Silver': '#c0c0c0',
    'Rose Gold': '#e8b4b8',
    'Charcoal': '#36454f',
    'Cream': '#fffdd0',
    'Beige': '#f5f5dc',
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-fashion-black transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/shop" className="hover:text-fashion-black transition-colors">Shop</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/shop?category=${product.category}`} className="hover:text-fashion-black transition-colors">
              {product.category}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-fashion-black">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Enhanced Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden rounded-xl group">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <button
                onClick={() => setShowGallery(true)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
              >
                <ZoomIn className="w-5 h-5 text-fashion-black" />
              </button>
              <button className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white">
                <Heart className="w-5 h-5 text-fashion-black" />
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-24 overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index
                      ? 'border-fashion-black ring-2 ring-fashion-black/20'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Product Info */}
          <div className="lg:py-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="px-3 py-1 bg-fashion-light text-fashion-black text-xs font-medium rounded">
                {product.category}
              </span>
              {product.new && (
                <span className="px-3 py-1 bg-fashion-gold text-white text-xs font-medium rounded">NEW ARRIVAL</span>
              )}
              {product.sale && (
                <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded">SALE</span>
              )}
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold text-fashion-black mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-fashion-gold fill-fashion-gold'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 text-sm">
                {product.rating} ({product.reviews} reviews)
              </span>
              <span className="text-gray-300">|</span>
              <button className="text-fashion-black text-sm font-medium hover:underline">
                Write a review
              </button>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-medium text-fashion-black">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
                  <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded">
                    Save ${product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium text-fashion-black text-lg">Size</span>
                <button className="text-sm text-fashion-gold hover:underline font-medium">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[80px] px-6 py-4 border-2 rounded-lg font-medium transition-all ${
                      selectedSize === size
                        ? 'border-fashion-black bg-fashion-black text-white scale-105'
                        : 'border-gray-200 hover:border-fashion-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <span className="font-medium text-fashion-black text-lg mb-4 block">Color</span>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-4 border-2 rounded-lg font-medium transition-all ${
                      selectedColor === color
                        ? 'border-fashion-black ring-2 ring-fashion-black/20'
                        : 'border-gray-200 hover:border-fashion-black'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: colorMap[color] || color.toLowerCase() }}
                      />
                      {color}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border-2 border-gray-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-5 py-4 hover:bg-gray-100 transition-colors rounded-l-lg"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="px-6 py-4 font-medium text-lg min-w-[60px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-5 py-4 hover:bg-gray-100 transition-colors rounded-r-lg"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={addedToCart}
                className={`flex-1 py-4 px-8 rounded-lg font-medium text-lg transition-all transform ${
                  addedToCart
                    ? 'bg-green-500 text-white scale-105'
                    : 'bg-fashion-black text-white hover:bg-fashion-gray hover:scale-105'
                }`}
              >
                {addedToCart ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check className="w-6 h-6" /> Added to Cart!
                  </span>
                ) : (
                  'Add to Cart'
                )}
              </button>
            </div>

            {/* Additional Actions */}
            <div className="flex gap-4 mb-8">
              <button className="flex items-center gap-2 text-gray-600 hover:text-fashion-black transition-colors">
                <Share2 className="w-5 h-5" />
                Share
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-fashion-black transition-colors">
                <Heart className="w-5 h-5" />
                Add to Wishlist
              </button>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6 space-y-4 text-sm">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-fashion-black">Free Shipping</p>
                  <p>On orders over $200</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Trash2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-fashion-black">Easy Returns</p>
                  <p>30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border-t mb-16">
          <div className="flex gap-8 border-b">
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 font-medium transition-colors relative ${
                activeTab === 'reviews' ? 'text-fashion-black' : 'text-gray-400 hover:text-fashion-black'
              }`}
            >
              Reviews ({reviews.length})
              {activeTab === 'reviews' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-fashion-black" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`py-4 font-medium transition-colors relative ${
                activeTab === 'details' ? 'text-fashion-black' : 'text-gray-400 hover:text-fashion-black'
              }`}
            >
              Product Details
              {activeTab === 'details' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-fashion-black" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`py-4 font-medium transition-colors relative ${
                activeTab === 'shipping' ? 'text-fashion-black' : 'text-gray-400 hover:text-fashion-black'
              }`}
            >
              Shipping & Returns
              {activeTab === 'shipping' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-fashion-black" />
              )}
            </button>
          </div>

          <div className="py-8">
            {activeTab === 'reviews' && (
              <div className="max-w-3xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-fashion-black">Customer Reviews</h3>
                  <button className="px-6 py-3 bg-fashion-black text-white rounded-lg font-medium hover:bg-fashion-gray transition-colors">
                    Write a Review
                  </button>
                </div>
                {reviews.length > 0 ? (
                  <div>
                    {reviews.map(review => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
                )}
              </div>
            )}
            {activeTab === 'details' && (
              <div className="max-w-3xl prose prose-lg">
                <h3 className="text-2xl font-bold text-fashion-black mb-4">Product Details</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>Premium quality materials</li>
                  <li>Crafted with attention to detail</li>
                  <li>True to size fit</li>
                  <li>Model is 5'9" wearing size S</li>
                  <li>Care instructions: Dry clean only</li>
                  <li>Imported</li>
                </ul>
              </div>
            )}
            {activeTab === 'shipping' && (
              <div className="max-w-3xl">
                <h3 className="text-2xl font-bold text-fashion-black mb-4">Shipping & Returns</h3>
                <div className="space-y-4 text-gray-600">
                  <p><strong>Standard Shipping:</strong> 5-7 business days ($9.99)</p>
                  <p><strong>Express Shipping:</strong> 2-3 business days ($19.99)</p>
                  <p><strong>Free Shipping:</strong> On orders over $200</p>
                  <p><strong>Returns:</strong> Free returns within 30 days of purchase</p>
                  <p><strong>Exchanges:</strong> Free exchanges for size or color</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-display text-3xl font-bold text-fashion-black mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((product, index) => (
                <div
                  key={product.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="animate-fade-in"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Gallery Modal */}
      {showGallery && (
        <ImageGalleryModal images={product.images} onClose={() => setShowGallery(false)} />
      )}
    </div>
  )
}

// Cart Page
function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart()
  const navigate = useNavigate()

  if (cart.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-fashion-black mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything yet.</p>
          <button onClick={() => navigate('/shop')} className="btn-primary">
            Start Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-4xl font-bold text-fashion-black mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="bg-white rounded-lg p-6 shadow-sm flex gap-6 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-40 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium text-fashion-black">{item.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">${item.price}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-200">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-2 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-2 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <h2 className="font-medium text-fashion-black mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{cartTotal >= 200 ? 'Free' : '$15.00'}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-medium text-fashion-black">
                  <span>Total</span>
                  <span>${(cartTotal >= 200 ? cartTotal : cartTotal + 15).toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full btn-primary mb-4">
                Proceed to Checkout
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="w-full btn-secondary"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// About Page
function AboutPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <div className="relative h-96">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920"
          alt="About"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white">
            About Us
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="prose prose-lg mx-auto">
          <h2 className="font-display text-3xl font-bold text-fashion-black mb-6">
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Founded in 2020, E-Fashion was born from a simple idea: everyone deserves access to 
            high-quality, stylish fashion that doesn't compromise on values. We believe that 
            great style should be accessible, sustainable, and empowering.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Our curated collections bring together timeless elegance and contemporary trends, 
            offering pieces that transcend seasons and become wardrobe staples. Every item in 
            our collection is carefully selected for its quality, design, and versatility.
          </p>

          <h2 className="font-display text-3xl font-bold text-fashion-black mb-6 mt-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
            {[
              { title: 'Quality', desc: 'Premium materials and craftsmanship in every piece.' },
              { title: 'Sustainability', desc: 'Committed to ethical and eco-friendly practices.' },
              { title: 'Inclusivity', desc: 'Fashion for everyone, regardless of size or style.' },
            ].map(value => (
              <div key={value.title} className="text-center p-6 bg-fashion-light rounded-lg">
                <h3 className="font-medium text-fashion-black mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="font-display text-3xl font-bold text-fashion-black mb-6 mt-12">
            The Team
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our team of fashion experts, designers, and stylists work tirelessly to bring you 
            the best in contemporary fashion. We're passionate about what we do, and it shows 
            in every piece we offer.
          </p>
        </div>
      </div>
    </div>
  )
}

// Contact Page
function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your message! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <div className="bg-fashion-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-fashion-black mb-4">
            Contact Us
          </h1>
          <p className="text-gray-600">We'd love to hear from you.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="font-display text-2xl font-bold text-fashion-black mb-6">
              Send us a message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-fashion-black mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-fashion-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-fashion-black mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-fashion-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-fashion-black mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-fashion-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-fashion-black mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-fashion-black resize-none"
                  required
                />
              </div>
              <button type="submit" className="btn-primary">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="font-display text-2xl font-bold text-fashion-black mb-6">
              Get in touch
            </h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-fashion-light rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-fashion-black" />
                </div>
                <div>
                  <h3 className="font-medium text-fashion-black mb-1">Email</h3>
                  <p className="text-gray-600">hello@e-fashion.com</p>
                  <p className="text-gray-600">support@e-fashion.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-fashion-light rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-fashion-black" />
                </div>
                <div>
                  <h3 className="font-medium text-fashion-black mb-1">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600">Mon-Fri, 9am-6pm EST</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-fashion-light rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-fashion-black" />
                </div>
                <div>
                  <h3 className="font-medium text-fashion-black mb-1">Address</h3>
                  <p className="text-gray-600">123 Fashion Avenue</p>
                  <p className="text-gray-600">New York, NY 10001</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-12 aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800"
                alt="Map"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main App Component
function App() {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
      return
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount }}>
      <div className="min-h-screen bg-white">
        <Header cartCount={cartCount} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartContext.Provider>
  )
}

export default App
