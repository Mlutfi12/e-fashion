# E-Fashion App

A modern e-commerce fashion store application with a React frontend and Express.js REST API backend.

## 🌐 Live Demo

**Public URL:** https://ec8d-2a02-4780-59-8a70-00-1.ngrok-free.app

---

## 📁 Project Structure

```
e-fashion/
├── backend/          # Express.js REST API
│   ├── server.js     # Main server file
│   ├── dist/         # Built static files
│   └── package.json
└── frontend/         # React + Vite frontend
    ├── src/
    │   ├── App.jsx   # Main app component
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js v18+ (v20 recommended)
- npm or yarn

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start
```

The backend runs on **http://localhost:8005** by default.

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The frontend runs on **http://localhost:5173** by default (Vite default).

### Build & Deploy Static Files

The backend serves static files from `./dist`. To build the frontend and copy to backend:

```bash
# Build frontend
cd frontend
npm run build

# Copy built files to backend/dist
cp -r dist/* ../backend/dist/
```

---

## 📡 API Endpoints

### Base URL
```
http://localhost:8005
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all products (with optional category filter) |
| `GET` | `/api/products/:id` | Get a single product by ID |
| `POST` | `/api/cart` | Add item to shopping cart |
| `GET` | `/api/cart` | Get cart contents |
| `DELETE` | `/api/cart/:productId` | Remove item from cart |
| `POST` | `/api/cart/clear` | Clear entire cart |
| `GET` | `/health` | Health check endpoint |
| `GET` | `/` | API info |

### Request/Response Examples

#### Get All Products
```bash
GET /api/products
```
```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "id": 1,
      "name": "Classic White T-Shirt",
      "price": 29.99,
      "category": "Tops",
      "image": "👕",
      "description": "Premium cotton t-shirt for everyday wear"
    }
  ]
}
```

#### Filter Products by Category
```bash
GET /api/products?category=Tops
```
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "name": "Classic White T-Shirt",
      "price": 29.99,
      "category": "Tops",
      "image": "👕",
      "description": "Premium cotton t-shirt for everyday wear"
    }
  ]
}
```

#### Get Single Product
```bash
GET /api/products/1
```
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Classic White T-Shirt",
    "price": 29.99,
    "category": "Tops",
    "image": "👕",
    "description": "Premium cotton t-shirt for everyday wear"
  }
}
```

#### Add Item to Cart
```bash
POST /api/cart
Content-Type: application/json

{
  "productId": 1,
  "quantity": 2
}
```
```json
{
  "success": true,
  "message": "Item added to cart",
  "data": [
    {
      "productId": 1,
      "name": "Classic White T-Shirt",
      "price": 29.99,
      "image": "👕",
      "quantity": 2
    }
  ],
  "totalItems": 2,
  "totalPrice": 59.98
}
```

#### Get Cart Contents
```bash
GET /api/cart
```
```json
{
  "success": true,
  "data": [
    {
      "productId": 1,
      "name": "Classic White T-Shirt",
      "price": 29.99,
      "image": "👕",
      "quantity": 2
    }
  ],
  "totalItems": 2,
  "totalPrice": 59.98
}
```

#### Remove Item from Cart
```bash
DELETE /api/cart/1
```
```json
{
  "success": true,
  "message": "Item removed from cart",
  "data": [],
  "totalItems": 0,
  "totalPrice": 0
}
```

#### Clear Cart
```bash
POST /api/cart/clear
```
```json
{
  "success": true,
  "message": "Cart cleared",
  "data": []
}
```

#### Product Not Found (404)
```bash
GET /api/products/999
```
```json
{
  "success": false,
  "error": "Product not found"
}
```

#### Health Check
```bash
GET /health
```
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T12:00:00.000Z",
  "service": "e-fashion-api"
}
```

### Request Parameters

#### Add to Cart (POST /api/cart)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `productId` | number | Yes | - | Product ID to add |
| `quantity` | number | No | `1` | Quantity to add |

#### Filter Products (GET /api/products)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `category` | string | No | - | Filter by category (Tops, Bottoms, Outerwear, Dresses, Footwear, Accessories) |

### Product Categories

- **Tops** - T-shirts, shirts, blouses
- **Bottoms** - Jeans, pants, skirts
- **Outerwear** - Jackets, coats, blazers
- **Dresses** - Casual and formal dresses
- **Footwear** - Shoes, sneakers, boots
- **Accessories** - Hats, bags, jewelry

---

## 🐳 Deployment

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8005` | Server port |

### Production Deployment Steps

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Copy static files to backend:**
   ```bash
   cp -r dist/* ../backend/dist/
   ```

3. **Deploy the backend:**
   - Deploy to a cloud provider (Heroku, Railway, Render, etc.)
   - The backend serves both API and static files

4. **Set environment variables:**
   - `PORT`: Configure the port for your hosting provider

### Docker Deployment (Optional)

Create a `Dockerfile` in the backend folder:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 8005

ENV PORT=8005

CMD ["node", "server.js"]
```

Then build and run:

```bash
cd backend
docker build -t e-fashion .
docker run -d -p 8005:8005 --name fashion e-fashion
```

### ngrok Tunnel (Development)

To expose your local server publicly during development:

```bash
# Install ngrok if not already installed
npm install -g ngrok

# Expose the backend
ngrok http 8005
```

The current public URL is: **https://ec8d-2a02-4780-59-8a70-00-1.ngrok-free.app**

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **CORS:** Enabled for cross-origin requests
- **Data:** In-memory product catalog and shopping cart

### Frontend
- **Framework:** React 18
- **Routing:** React Router DOM
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React

---

## 📝 Features

- ✅ Browse product catalog
- ✅ Filter products by category
- ✅ View product details
- ✅ Add items to shopping cart
- ✅ Update cart quantities
- ✅ Remove items from cart
- ✅ Clear entire cart
- ✅ Real-time cart totals (items and price)
- ✅ Responsive e-commerce UI
- ✅ Client-side routing with React Router
- ✅ RESTful API design
- ✅ Health check endpoint for monitoring
- ✅ Static file serving from backend

---

## 🔧 Development

### Running Both Services

Open two terminal windows:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Testing the API

```bash
# Get all products
curl http://localhost:8005/api/products

# Filter by category
curl "http://localhost:8005/api/products?category=Tops"

# Get single product
curl http://localhost:8005/api/products/1

# Add to cart
curl -X POST http://localhost:8005/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId":1,"quantity":2}'

# Get cart
curl http://localhost:8005/api/cart

# Remove from cart
curl -X DELETE http://localhost:8005/api/cart/1

# Clear cart
curl -X POST http://localhost:8005/api/cart/clear

# Health check
curl http://localhost:8005/health
```

---

## 📦 GitHub Repository

**Repository:** https://github.com/Mlutfi12/e-fashion

---

## 📄 License

MIT

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Built with ❤️ using React + Express**
