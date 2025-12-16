
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center">
      <div className="align-element">
        <div className="text-center space-y-8">
          <div className="space-y-6">
            <h1 className="max-w-4xl mx-auto text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                FreshCart
              </span>
              <br />
              <span className="text-gray-900 text-3xl md:text-4xl lg:text-5xl">
                We're changing the way people shop.
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg md:text-xl leading-8 text-gray-600">
              Discover amazing products with unbeatable prices. Shop from thousands of items delivered right to your doorstep with our seamless shopping experience.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to='products' 
              className='btn bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-none shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 px-8 py-3 text-lg font-semibold'
            >
              Shop Now
            </Link>
            <Link 
              to='categories' 
              className='btn bg-white hover:bg-gray-50 text-green-600 border-2 border-green-200 hover:border-green-300 px-8 py-3 text-lg font-semibold transition-all duration-200'
            >
              Browse Categories
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders over $50</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">24/7 Support</h3>
              <p className="text-sm text-gray-600">Dedicated support</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">Quality Promise</h3>
              <p className="text-sm text-gray-600">100% authentic</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}