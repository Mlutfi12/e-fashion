const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = parseInt(process.env.PORT) || 8005;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from ./dist
app.use(express.static(path.join(__dirname, 'dist')));

// Sample products data
const products = [
  { id: 1, name: 'Classic White T-Shirt', price: 29.99, category: 'Tops', image: '👕', description: 'Premium cotton t-shirt for everyday wear' },
  { id: 2, name: 'Slim Fit Jeans', price: 79.99, category: 'Bottoms', image: '👖', description: 'Modern slim fit denim jeans' },
  { id: 3, name: 'Leather Jacket', price: 199.99, category: 'Outerwear', image: '🧥', description: 'Genuine leather jacket with classic style' },
  { id: 4, name: 'Summer Dress', price: 89.99, category: 'Dresses', image: '👗', description: 'Light and breezy summer dress' },
  { id: 5, name: 'Running Shoes', price: 129.99, category: 'Footwear', image: '👟', description: 'Comfortable athletic running shoes' },
  { id: 6, name: 'Baseball Cap', price: 24.99, category: 'Accessories', image: '🧢', description: 'Classic adjustable baseball cap' }
];

// Shopping cart (in-memory)
let cart = [];

// GET /api/products - Get all products
app.get('/api/products', (req, res) => {
  const { category } = req.query;
  
  let filteredProducts = products;
  if (category) {
    filteredProducts = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  
  res.json({
    success: true,
    count: filteredProducts.length,
    data: filteredProducts
  });
});

// GET /api/products/:id - Get single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found'
    });
  }
  
  res.json({
    success: true,
    data: product
  });
});

// POST /api/cart - Add item to cart
app.post('/api/cart', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  
  if (!productId) {
    return res.status(400).json({
      success: false,
      error: 'Product ID is required'
    });
  }
  
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found'
    });
  }
  
  // Check if item already in cart
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
  }
  
  res.json({
    success: true,
    message: 'Item added to cart',
    data: cart,
    totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  });
});

// GET /api/cart - Get cart contents
app.get('/api/cart', (req, res) => {
  res.json({
    success: true,
    data: cart,
    totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  });
});

// DELETE /api/cart/:productId - Remove item from cart
app.delete('/api/cart/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const initialLength = cart.length;
  cart = cart.filter(item => item.productId !== productId);
  
  if (cart.length === initialLength) {
    return res.status(404).json({
      success: false,
      error: 'Item not found in cart'
    });
  }
  
  res.json({
    success: true,
    message: 'Item removed from cart',
    data: cart,
    totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  });
});

// POST /api/cart/clear - Clear cart
app.post('/api/cart/clear', (req, res) => {
  cart = [];
  res.json({
    success: true,
    message: 'Cart cleared',
    data: []
  });
});

// GET /health - Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'e-fashion-api'
  });
});

// GET / - Serve index.html or API info
app.get('/', (req, res) => {
  res.json({
    service: 'E-Fashion API',
    version: '1.0.0',
    endpoints: {
      'GET /api/products': 'Get all products',
      'GET /api/products/:id': 'Get single product',
      'POST /api/cart': 'Add item to cart',
      'GET /api/cart': 'Get cart contents',
      'DELETE /api/cart/:id': 'Remove item from cart',
      'POST /api/cart/clear': 'Clear cart',
      'GET /health': 'Health check'
    },
    staticFiles: 'Served from ./dist on port ' + PORT
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🛍️ E-Fashion API server running on http://localhost:${PORT}`);
  console.log(`📁 Serving static files from: ${path.join(__dirname, 'dist')}`);
  console.log(`📝 Endpoints:`);
  console.log(`   GET  /api/products       - Get all products`);
  console.log(`   GET  /api/products/:id   - Get single product`);
  console.log(`   POST /api/cart           - Add item to cart`);
  console.log(`   GET  /api/cart           - Get cart contents`);
  console.log(`   GET  /health             - Health check`);
});
