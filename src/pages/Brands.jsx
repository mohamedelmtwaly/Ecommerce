import { useLoaderData, Link } from "react-router-dom";
import { SectionTitle } from "../components";
import { customFetch } from "../utils";
import { Helmet } from 'react-helmet-async';

export const loader = async()=>{
  try {
    const {data} = await customFetch.get('/api/v1/brands')
    return {brands:data.data}
  } catch (error) {
    console.error('Brands loader error:', error);
    return { brands: [] };
  }
}

export default function Brands() {
  const {brands} = useLoaderData()

  if (!brands || brands.length === 0) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-white to-green-50 flex items-center justify-center py-20">
        <Helmet>
          <title>Brands - FreshCart</title>
        </Helmet>
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="mb-8">
            <svg className="w-24 h-24 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">No brands available</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            We're working on partnering with amazing brands. Check back soon for exclusive brand collections!
          </p>
          <Link to="/products" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Browse All Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-green-50 py-12">
        <Helmet>
        <title>Brands - FreshCart</title>
      </Helmet>
      
      <div className="align-element">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop by Brand</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our trusted brand partners and explore their premium product collections
          </p>
        </div>

        <div className="grid pt-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {brands.map((brand, index) => {
            const {image, name, _id} = brand
            return (
              <Link 
                key={_id || name} 
                to={`/products?brand=${name}`}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Brand Card Container */}
                <div className="relative h-64 md:h-56 overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50"></div>
                  
                  {/* Brand Image */}
                  <div className="relative h-40 md:h-32 overflow-hidden flex items-center justify-center p-6">
                    <img 
                      className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110" 
                      src={image} 
                      alt={name}
                    />
                  </div>
                  
                  {/* Brand Name */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/95 to-transparent">
                    <h3 className="text-gray-900 font-bold text-lg md:text-xl text-center capitalize mb-1">
                      {name}
                    </h3>
                    <div className="flex items-center justify-center">
                      <span className="text-green-600 text-sm font-medium">View Products</span>
                      <svg className="w-4 h-4 text-green-600 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                  
                  {/* Top Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="px-2 py-1 bg-green-100 rounded-full">
                      <span className="text-xs font-medium text-green-700">Brand</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <Link to="/products" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            View All Products
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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