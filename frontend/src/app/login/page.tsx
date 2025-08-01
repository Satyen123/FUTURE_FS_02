    // frontend/src/app/login/page.tsx
    import Link from 'next/link';

    export default function LoginPage() {
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
                    Cart (0)
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

          {/* Main content for Login Page */}
          <main className="container mx-auto p-6 md:p-8 lg:p-10 flex-grow">
            <h1 className="text-5xl font-extrabold text-center my-10 md:my-12 lg:my-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg">
              Login
            </h1>
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 max-w-md mx-auto">
              <form className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign in
                  </button>
                </div>
              </form>
              <p className="mt-6 text-center text-sm text-gray-400">
                Don't have an account?{' '}
                <Link href="/register" className="font-medium text-indigo-400 hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </main>

          {/* Simple Footer */}
          <footer className="bg-gray-800 text-gray-400 text-center py-6 mt-12 rounded-t-xl shadow-inner">
            <p>&copy; {new Date().getFullYear()} MiniStore. All rights reserved.</p>
          </footer>
        </div>
      );
    }
    