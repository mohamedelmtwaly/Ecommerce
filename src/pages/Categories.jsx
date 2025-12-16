import { useLoaderData, Link } from "react-router-dom"
import { customFetch } from "../utils"
import { SectionTitle } from "../components"
import { Helmet } from 'react-helmet-async';

export const loader = async ()=>{
  try {
    const {data} = await customFetch.get('/api/v1/categories')
    return{categories:data.data}
  } catch (error) {
    console.error('Categories loader error:', error);
    return { categories: [] };
  }
}

export default function Categories() {
  const {categories} = useLoaderData()

  if (!categories || categories.length === 0) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 flex items-center justify-center py-20">
        <Helmet>
          <title>Categories - FreshCart</title>
        </Helmet>
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <svg className="w-32 h-32 mx-auto text-gray-400 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-gray-900 bg-clip-text text-transparent mb-6">
            Categories Coming Soon
          </h2>
          <p className="text-gray-600 text-lg mb-12 leading-relaxed">
            We're curating an amazing collection of product categories. 
            Stay tuned for an exceptional shopping experience tailored to your needs.
          </p>
          <Link to="/products" className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 hover:from-green-700 hover:via-emerald-700 hover:to-green-800 text-white font-semibold rounded-xl transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
            <span className="mr-2">Explore Products</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 relative overflow-hidden">
      <Helmet>
        <title>Categories - FreshCart</title>
      </Helmet>
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-300 to-green-300 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>
      
      <div className="align-element relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-6">
            <span className="text-green-700 font-medium text-sm">Browse Collection</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight">
            Shop by Category
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated categories and find exactly what you're looking for
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {categories.map((cate, index) => {
            const { name, image, _id } = cate;
            return (
              <Link 
                key={_id || name} 
                to={`/products?category=${name}`}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 bg-white"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Image Container */}
                <div className="relative h-64 md:h-56 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                    src={image} 
                    alt={name}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                      <span className="text-xs font-medium text-gray-700">Category</span>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-bold text-xl md:text-2xl capitalize text-center mb-2">
                    {name}
                  </h3>
                  <div className="flex items-center justify-center">
                    <span className="text-white/90 text-sm font-medium">Explore Collection</span>
                    <svg className="w-4 h-4 text-white/90 ml-2 group-hover:translate-x-2 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
              </Link>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-block p-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl">
            <Link to="/products" className="block px-8 py-4 bg-white rounded-xl group">
              <span className="text-gray-900 font-semibold text-lg">View All Products</span>
              <svg className="w-5 h-5 inline-block ml-2 text-gray-900 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}