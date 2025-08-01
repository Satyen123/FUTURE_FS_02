// frontend/src/app/page.tsx
"use client"; // Mark as Client Component because it uses `useState` and `useCart`

import Link from 'next/link';
import ProductImage from '../components/ProductImage';
import React from 'react'; // Import React
import { useCart } from '../context/CartContext';

// Define the Product interface to match your backend data structure
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  countInStock: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

/**
 * Fetches product data from the backend API.
 * This is an asynchronous function called within a Client Component now.
 * @returns {Promise<Product[]>} A promise that resolves to an array of products.
 */
async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch('http://localhost:5000/api/products', {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText} (Status: ${res.status})`);
    }

    const data = await res.json();
    console.log("Fetched Products:", data);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

/**
 * The main Home component for the e-commerce storefront.
 * Now a Client Component to handle interactivity.
 */
export default function Home() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const { addToCart, getCartItemCount } = useCart();

  // Fetch products on component mount
  React.useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    // Optionally, provide user feedback (e.g., a toast notification)
    console.log(`${product.name} added to cart! Total items: ${getCartItemCount() + 1}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {/* Header/Navbar */}
      <header className="bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center rounded-b-xl">
        <Link href="/" className="text-2xl font-bold text-indigo-400 hover:text-indigo-300 transition duration-300">
          MiniStore
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-gray-300 hover:text-white transition duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/cart" className="text-gray-300 hover:text-white transition duration-300">
                Cart ({getCartItemCount()})
              </Link>
            </li>
            <li>
              <Link href="/login" className="text-gray-300 hover:text-white transition duration-300">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main content area */}
      <main className="container mx-auto p-6 md:p-8 lg:p-10">
        {/* Page title */}
        <h1 className="text-5xl font-extrabold text-center my-10 md:my-12 lg:my-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg">
          Our Products
        </h1>

        {loading ? (
          <p className="text-center text-lg text-gray-400">Loading products...</p>
        ) : error ? (
          <p className="text-center text-lg text-red-500">Error: {error}</p>
        ) : products.length === 0 ? (
          <div className="text-center bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
            <p className="text-xl text-gray-400 mb-4">No products found.</p>
            <p className="text-lg text-gray-500 mt-4">
              Please ensure your backend is running on `http://localhost:5000` and data is seeded.
            </p>
          </div>
        ) : (
          // Grid layout for product cards
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Map through each product and render a Product Card */}
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-gray-800 rounded-xl shadow-xl overflow-hidden
                           transform transition duration-500 hover:scale-105 hover:shadow-2xl
                           border border-gray-700 hover:border-indigo-500"
              >
                {/* Wrap image and details in Link for product detail page */}
                <Link href={`/products/${product._id}`} className="block"> {/* <-- ADDED LINK WRAPPER */}
                  {/* Product Image */}
                  <ProductImage
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover object-center rounded-t-xl"
                  />
                  {/* Product Details */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2 text-indigo-300">{product.name}</h2>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {product.description.substring(0, 100)}...
                    </p>
                    {/* Price and Stock Info */}
                    <div className="flex justify-between items-center mb-5">
                      <span className="text-3xl font-extrabold text-green-400">${product.price.toFixed(2)}</span>
                      <span
                        className={`text-sm font-semibold px-3 py-1 rounded-full ${
                          product.countInStock > 0 ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                        }`}
                      >
                        {product.countInStock > 0 ? `${product.countInStock} In Stock` : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                </Link> {/* <-- CLOSED LINK WRAPPER */}
                {/* Add to Cart Button - Outside the Link so it's a separate click target */}
                <div className="p-6 pt-0"> {/* Added div for padding and to separate button from link */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full py-3 px-6 rounded-lg text-lg font-semibold
                               transition duration-300 ease-in-out transform
                               ${
                                 product.countInStock > 0
                                   ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl active:scale-95'
                                   : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                               }`}
                    disabled={product.countInStock === 0}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Simple Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center py-6 mt-12 rounded-t-xl shadow-inner">
        <p>&copy; {new Date().getFullYear()} MiniStore. All rights reserved.</p>
      </footer>
    </div>
  );
}
