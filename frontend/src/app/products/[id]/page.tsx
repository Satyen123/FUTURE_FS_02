    // frontend/src/app/products/[id]/page.tsx
    "use client"; // This page needs client-side interactivity (useCart hook)

    import Link from 'next/link';
    import { useParams } from 'next/navigation'; // Hook to get dynamic route parameters
    import React, { useEffect, useState } from 'react';
    import { useCart } from '../../../context/CartContext'; // Adjust path based on depth
    import ProductImage from '../../../components/ProductImage'; // Adjust path based on depth

    // Define the Product interface
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

    export default function ProductDetailPage() {
      const { id } = useParams(); // Get the product ID from the URL
      const [product, setProduct] = useState<Product | null>(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const { addToCart, getCartItemCount } = useCart();

      useEffect(() => {
        if (id) {
          const fetchProduct = async () => {
            try {
              const res = await fetch(`http://localhost:5000/api/products/${id}`);
              if (!res.ok) {
                throw new Error(`Failed to fetch product: ${res.statusText}`);
              }
              const data = await res.json();
              setProduct(data);
            } catch (err: any) {
              setError(err.message);
            } finally {
              setLoading(false);
            }
          };
          fetchProduct();
        }
      }, [id]); // Re-fetch if ID changes

      const handleAddToCart = () => {
        if (product) {
          addToCart(product);
          console.log(`${product.name} added to cart! Total items: ${getCartItemCount() + 1}`);
        }
      };

      return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
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

          {/* Main content for Product Detail Page */}
          <main className="container mx-auto p-6 md:p-8 lg:p-10 flex-grow">
            {loading ? (
              <p className="text-center text-lg text-gray-400">Loading product details...</p>
            ) : error ? (
              <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 text-center">
                <p className="text-xl text-red-500 mb-4">Error: {error}</p>
                <p className="text-lg text-gray-500 mt-4">
                  <Link href="/" className="text-indigo-400 hover:underline">
                    Back to products
                  </Link>
                </p>
              </div>
            ) : !product ? (
              <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 text-center">
                <p className="text-xl text-gray-400 mb-4">Product not found.</p>
                <p className="text-lg text-gray-500 mt-4">
                  <Link href="/" className="text-indigo-400 hover:underline">
                    Back to products
                  </Link>
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-700">
                {/* Product Image Section */}
                <div className="flex justify-center items-center">
                  <ProductImage src={product.imageUrl} alt={product.name} className="w-full max-w-lg h-auto rounded-lg shadow-lg object-cover" />
                </div>

                {/* Product Details Section */}
                <div className="flex flex-col justify-center">
                  <h1 className="text-4xl font-bold text-indigo-300 mb-4">{product.name}</h1>
                  <p className="text-gray-400 text-lg mb-6 leading-relaxed">{product.description}</p>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-4xl font-extrabold text-green-400">${product.price.toFixed(2)}</span>
                    <span
                      className={`text-lg font-semibold px-4 py-2 rounded-full ${
                        product.countInStock > 0 ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                      }`}
                    >
                      {product.countInStock > 0 ? `${product.countInStock} In Stock` : 'Out of Stock'}
                    </span>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className={`w-full py-4 px-6 rounded-lg text-xl font-semibold
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
            )}
          </main>

          {/* Simple Footer */}
          <footer className="bg-gray-800 text-gray-400 text-center py-6 mt-12 rounded-t-xl shadow-inner">
            <p>&copy; {new Date().getFullYear()} MiniStore. All rights reserved.</p>
          </footer>
        </div>
      );
    }
    