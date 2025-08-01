    // frontend/src/app/cart/page.tsx
    "use client"; // This page needs client-side interactivity (useCart hook)

    import Link from 'next/link';
    import { useCart } from '../../context/CartContext'; // Import useCart hook
    import ProductImage from '../../components/ProductImage'; // Re-use ProductImage component

    export default function CartPage() {
      const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartItemCount } = useCart();

      return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
          {/* Header/Navbar - Re-using the same header structure for consistency */}
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
                    Cart ({getCartItemCount()}) {/* Display live cart item count */}
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

          {/* Main content for Cart Page */}
          <main className="container mx-auto p-6 md:p-8 lg:p-10 flex-grow">
            <h1 className="text-5xl font-extrabold text-center my-10 md:my-12 lg:my-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg">
              Your Shopping Cart
            </h1>

            {cartItems.length === 0 ? (
              // Display if cart is empty
              <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 text-center">
                <p className="text-xl text-gray-400">Your cart is currently empty.</p>
                <p className="text-lg text-gray-500 mt-4">
                  <Link href="/" className="text-indigo-400 hover:underline">
                    Continue Shopping
                  </Link>
                </p>
              </div>
            ) : (
              // Display cart items if not empty
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-700"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0 mr-4 rounded-lg overflow-hidden">
                      <ProductImage src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <h2 className="text-xl font-semibold text-indigo-300">{item.name}</h2>
                      <p className="text-gray-400">${item.price.toFixed(2)}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 mr-4">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition duration-200"
                      >
                        -
                      </button>
                      <span className="text-lg font-bold text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition duration-200"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {/* Cart Summary */}
                <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 text-right mt-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Total: ${getCartTotal().toFixed(2)}</h2>
                  <Link href="/checkout">
                    <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-xl font-semibold hover:bg-green-700 transition duration-300 transform hover:scale-105">
                      Proceed to Checkout
                    </button>
                  </Link>
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
    