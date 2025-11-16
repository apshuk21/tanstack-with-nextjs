import Link from "next/link";

export function Header() {
  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* left / brand area - adjust or replace as desired */}
          <div className="shrink-0">
            <Link href="/" className="text-lg font-semibold text-gray-800">
              MyApp
            </Link>
          </div>

          {/* navigation links */}
          <div>
            <ul className="flex items-center space-x-6">
              <li>
                <Link
                  href="/products"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/todos"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Todos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
