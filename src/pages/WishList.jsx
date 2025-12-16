import { toast } from "react-toastify";
import { Loading, SectionTitle } from "../components";
import { useCartGlobalContext } from "../context/cartContext";
import { useWishList } from "../context/wishListContext";
import { customFetch } from "../utils";
import { useLoaderData, Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { Helmet } from 'react-helmet-async';

export const loader = async()=>{
  try {
    const {data} = await customFetch.get('/api/v1/wishlist',{
      headers :{
        token : localStorage.getItem('token'),
      }
    })
    return{ products : data.data}
  } catch (error) {
    console.error('Wishlist loader error:', error);
    return { products: [] };
  }
}

export default function WishList() {
  const [Loading1, setLoading1] = useState(false)
  const [Loading2, setLoading2] = useState(false)
  const [ProductID, setProductID] = useState(0)

  const {Allproducts,DeleteProductWishlist} = useWishList()
  const { AddProduct } = useCartGlobalContext();
  const {products} = useLoaderData()
  
  const handAddProduct = async (id) => {
    setLoading1(true)
    let response = await AddProduct(id);

    if (response) {
      setLoading1(false)
      toast.success(response.message);
    } else {
      toast.error("can not delete product ");
    }
  }

  const handleDeletproduct = async(id) => {
    setProductID(id)
    setLoading2(true)

    const response = await DeleteProductWishlist(id)
    
    if (response) {
      setLoading2(false)
      toast.success(response.message);
    } else {
      toast.error("can not delete product ");
    }
  }

  // Check if user has no favorites
  if (!products || products.length === 0) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-white to-green-50 flex items-center justify-center py-20">
        <Helmet>
          <title>My Favorites - FreshCart</title>
        </Helmet>
        <div className="text-center">
          <div className="mb-8">
            <FaHeart className="w-24 h-24 mx-auto text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">No favorites yet</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Start adding products to your favorites to see them here! Browse our products and click the heart icon to save your favorites.
          </p>
          <Link to="/products" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Browse Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-green-50 py-12">
        <Helmet>
        <title>My Favorites - FreshCart</title>
      </Helmet>
      
      <div className="align-element">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Favorites</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your favorite products all in one place. Add them to cart or remove them anytime.
          </p>
        </div>

        <div className="grid pt-12 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product)=>{
            const { id , imageCover , price , title , ratingsAverage } = product
            
            return (
              <div
                key={id}
                className="card w-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative bg-white rounded-xl overflow-hidden group"
              >
                <Link to={`/products/${id}`}>
                  <figure className="px-4 pt-4">
                    <img
                      src={imageCover}
                      alt={title}
                      className="rounded-xl h-64 md:h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title tracking-wider capitalize line-clamp-1 text-gray-900">
                      {title}
                    </h2>
                    <span className="text-lg font-bold text-green-600">{price} EG</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(ratingsAverage) ? 'text-yellow-400' : 'text-gray-300'}`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">({ratingsAverage})</span>
                    </div>
                  </div>
                </Link>
                
                <div className="absolute top-4 right-4">
                  <button 
                    onClick={()=>handleDeletproduct(id)} 
                    className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-500 transition-all duration-300 group"
                  >
                    {ProductID == id && Loading2 ? 
                      <span className="loading loading-spinner loading-sm"></span> : 
                      <FaHeart className="w-4 h-4 text-red-500 group-hover:text-red-600 transition-colors duration-300" />
                    }
                  </button>
                </div>

                <div className="px-4 pb-4">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={()=>handAddProduct(id)} 
                      className="flex-1 py-2 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                    >
                      {Loading1 && <span className="loading loading-spinner loading-xs mr-2"></span>}
                      Add to Cart
                    </button>
                    <button 
                      onClick={()=>handleDeletproduct(id)} 
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors duration-200"
                    >
                      {ProductID == id && Loading2 ? 
                        <span className="loading loading-spinner loading-sm"></span> : 
                        <MdDelete className="w-4 h-4" />
                      }
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}