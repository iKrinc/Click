# API Documentation - Click Mobile App

Complete documentation for all API endpoints used in the Click mobile app.

## Base URL

```
https://dummyjson.com
```

## API Service Location

All API calls are organized in `src/services/api.js`

## Authentication

### 1. Login

**Endpoint:** `POST /auth/login`

**Description:** Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "username": "emilys",
  "password": "emilyspass"
}
```

**Response:**
```json
{
  "id": 1,
  "username": "emilys",
  "email": "emily.johnson@x.dummyjson.com",
  "firstName": "Emily",
  "lastName": "Johnson",
  "gender": "female",
  "image": "https://dummyjson.com/icon/emilys/128",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Usage in App:**
```javascript
import {authAPI} from './services/api';

const credentials = {
  username: 'emilys',
  password: 'emilyspass'
};

const response = await authAPI.login(credentials);
// Returns: { user: {...}, token: '...' }
```

**Error Handling:**
- 400: Invalid credentials
- 500: Server error

---

### 2. Get Current User

**Endpoint:** `GET /auth/me`

**Description:** Retrieves the current authenticated user's information.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": 1,
  "username": "emilys",
  "email": "emily.johnson@x.dummyjson.com",
  "firstName": "Emily",
  "lastName": "Johnson",
  "gender": "female",
  "image": "https://dummyjson.com/icon/emilys/128"
}
```

**Usage in App:**
```javascript
const user = await authAPI.getCurrentUser(token);
```

---

## Products

### 1. Get All Products

**Endpoint:** `GET /products`

**Description:** Retrieves a list of all products with pagination.

**Query Parameters:**
- `limit` (number): Number of products to return (default: 20)
- `skip` (number): Number of products to skip (default: 0)

**Request:**
```
GET /products?limit=20&skip=0
```

**Response:**
```json
{
  "products": [
    {
      "id": 1,
      "title": "Essence Mascara Lash Princess",
      "description": "The Essence Mascara Lash Princess is a popular mascara...",
      "category": "beauty",
      "price": 9.99,
      "discountPercentage": 7.17,
      "rating": 4.94,
      "stock": 5,
      "tags": ["beauty", "mascara"],
      "brand": "Essence",
      "sku": "RCH45Q1A",
      "weight": 2,
      "dimensions": {
        "width": 23.17,
        "height": 14.43,
        "depth": 28.01
      },
      "warrantyInformation": "1 month warranty",
      "shippingInformation": "Ships in 1 month",
      "availabilityStatus": "Low Stock",
      "reviews": [...],
      "returnPolicy": "30 days return policy",
      "minimumOrderQuantity": 24,
      "meta": {...},
      "images": [...],
      "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
    }
  ],
  "total": 194,
  "skip": 0,
  "limit": 20
}
```

**Usage in App:**
```javascript
import {productsAPI} from './services/api';

const response = await productsAPI.getProducts(20, 0);
// response.products contains array of products
```

**Used in:**
- `HomeScreen.js` - Featured products
- `ListingScreen.js` - All products list

---

### 2. Get Single Product

**Endpoint:** `GET /products/:id`

**Description:** Retrieves detailed information about a specific product.

**Request:**
```
GET /products/1
```

**Response:**
```json
{
  "id": 1,
  "title": "Essence Mascara Lash Princess",
  "description": "The Essence Mascara Lash Princess is a popular mascara...",
  "category": "beauty",
  "price": 9.99,
  "discountPercentage": 7.17,
  "rating": 4.94,
  "stock": 5,
  "tags": ["beauty", "mascara"],
  "brand": "Essence",
  "sku": "RCH45Q1A",
  "weight": 2,
  "warrantyInformation": "1 month warranty",
  "shippingInformation": "Ships in 1 month",
  "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
}
```

**Usage in App:**
```javascript
const product = await productsAPI.getProductById(1);
```

**Used in:**
- `DetailScreen.js` - Product details page

---

### 3. Search Products

**Endpoint:** `GET /products/search`

**Description:** Searches products by query string.

**Query Parameters:**
- `q` (string): Search query

**Request:**
```
GET /products/search?q=phone
```

**Response:**
```json
{
  "products": [
    {
      "id": 1,
      "title": "iPhone 9",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      ...
    }
  ],
  "total": 4,
  "skip": 0,
  "limit": 30
}
```

**Usage in App:**
```javascript
const results = await productsAPI.searchProducts('phone');
```

**Used in:**
- `ListingScreen.js` - Search functionality

---

### 4. Get Categories

**Endpoint:** `GET /products/categories`

**Description:** Retrieves all available product categories.

**Response:**
```json
[
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches"
]
```

**Usage in App:**
```javascript
const categories = await productsAPI.getCategories();
```

---

### 5. Get Products by Category

**Endpoint:** `GET /products/category/:category`

**Description:** Retrieves all products in a specific category.

**Request:**
```
GET /products/category/smartphones
```

**Response:**
```json
{
  "products": [
    {
      "id": 1,
      "title": "iPhone 9",
      "category": "smartphones",
      ...
    }
  ],
  "total": 5,
  "skip": 0,
  "limit": 30
}
```

**Usage in App:**
```javascript
const products = await productsAPI.getProductsByCategory('smartphones');
```

---

## Users

### 1. Get All Users

**Endpoint:** `GET /users`

**Description:** Retrieves a list of all users with pagination.

**Query Parameters:**
- `limit` (number): Number of users to return (default: 20)
- `skip` (number): Number of users to skip (default: 0)

**Request:**
```
GET /users?limit=20&skip=0
```

**Response:**
```json
{
  "users": [
    {
      "id": 1,
      "firstName": "Emily",
      "lastName": "Johnson",
      "maidenName": "Smith",
      "age": 28,
      "gender": "female",
      "email": "emily.johnson@x.dummyjson.com",
      "phone": "+81 965-431-3024",
      "username": "emilys",
      "birthDate": "1996-5-30",
      "image": "https://dummyjson.com/icon/emilys/128",
      "address": {...}
    }
  ],
  "total": 208,
  "skip": 0,
  "limit": 20
}
```

**Usage in App:**
```javascript
import {usersAPI} from './services/api';

const response = await usersAPI.getUsers(20, 0);
```

---

### 2. Get Single User

**Endpoint:** `GET /users/:id`

**Description:** Retrieves detailed information about a specific user.

**Request:**
```
GET /users/1
```

**Response:**
```json
{
  "id": 1,
  "firstName": "Emily",
  "lastName": "Johnson",
  "maidenName": "Smith",
  "age": 28,
  "gender": "female",
  "email": "emily.johnson@x.dummyjson.com",
  "phone": "+81 965-431-3024",
  "username": "emilys",
  "image": "https://dummyjson.com/icon/emilys/128"
}
```

**Usage in App:**
```javascript
const user = await usersAPI.getUserById(1);
```

---

## API Configuration

### Axios Instance

The app uses a configured axios instance with:

**Base Configuration:**
```javascript
{
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
}
```

**Request Interceptor:**
- Adds authentication token to headers (if available)
- Logs requests in development mode

**Response Interceptor:**
- Handles errors globally
- Provides user-friendly error messages
- Network error detection

### Error Handling

All API calls are wrapped with error handling:

```javascript
try {
  const response = await productsAPI.getProducts();
  // Handle success
} catch (error) {
  // error contains user-friendly message
  console.error(error);
}
```

**Common Error Messages:**
- Network errors: "Network error. Please check your connection."
- Server errors: "Something went wrong"
- Authentication errors: "Unauthorized access"

---

## Demo Credentials

For testing the authentication flow:

| Username | Password |
|----------|----------|
| emilys | emilyspass |
| michaelw | michaelwpass |
| sophiab | sophiabpass |
| jamesd | jamesdpass |
| emmaj | emmajpass |

---

## Rate Limiting

DummyJSON API has no strict rate limiting, but it's recommended to:
- Implement pagination for large lists
- Cache responses when appropriate
- Debounce search queries (implemented in ListingScreen)

---

## Testing API Endpoints

You can test endpoints using:

**cURL:**
```bash
curl -X POST https://dummyjson.com/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username": "emilys", "password": "emilyspass"}'
```

**Postman:**
Import the base URL and test each endpoint individually.

**Browser:**
GET endpoints can be tested directly in browser:
```
https://dummyjson.com/products/1
```

---

## Future Enhancements

Potential API improvements for production:

1. **Caching Strategy**: Implement Redux caching for products
2. **Offline Support**: Store data locally with AsyncStorage
3. **Optimistic Updates**: Update UI before API response
4. **Error Retry**: Automatic retry for failed requests
5. **Request Cancellation**: Cancel pending requests on screen unmount

---

## Resources

- DummyJSON Documentation: https://dummyjson.com/docs
- Axios Documentation: https://axios-http.com/docs/intro
- React Native Networking: https://reactnative.dev/docs/network

---

**Need Help?** Check the README.md troubleshooting section or create an issue in the repository.
