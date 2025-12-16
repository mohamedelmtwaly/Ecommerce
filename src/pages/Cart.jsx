import { toast } from "react-toastify";
import { SectionTitle } from "../components";
import { useCartGlobalContext } from "../context/cartContext";
import {Link} from 'react-router-dom'

import { useState } from "react";
import { Helmet } from 'react-helmet-async';


export default function Cart() {
  
  const [Loading1, setLoading1] = useState(false)
  const [Loading2, setLoading2] = useState(false)
  const [Loading3, setLoading3] = useState(false)

  
  const [Productid, setProductid] = useState(0)  

  const { allProducts,TotalCartPrice,UpdateCartCount,DeleteProduct ,GetUserCart,CartID,ClearCart} = useCartGlobalContext()

  
  const clearCart = async() => {
    setLoading1(true)
    const res = await ClearCart()
    if(res){
      setLoading1(false)
      toast.success("Your cart has been cleared")
    }else{
      toast.error("some error for clearing your cart")
      setLoading1(false)
    }
  }
  

  const handleUpdateProduct = async(id,newcount) => {
    setProductid(id)
    setLoading2(true)
    const res = await UpdateCartCount(id,newcount)
    if (res) {
      setLoading2(false)
    }else{
      toast.error("can not update product")
    }
  }
  
  const HandleDeleteProduct = async(id) => {
    setProductid(id)
    setLoading3(true)

  const res = await DeleteProduct(id)

    if(res){
      setLoading3(false)
      toast.success('Product deleted successfully')
    }else{
      setLoading3(false)
      toast.error('Product not deleted')
    }
  }

  if(allProducts?.length < 1 ){
    
    return <section className="min-h-screen bg-gradient-to-b from-white to-green-50 flex items-center justify-center py-20">
      <div className="text-center">
        <div className="mb-8">
          <svg className="w-24 h-24 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Looks like you haven't added any products to your cart yet. Start shopping to fill it up!
        </p>
        <Link to="/products" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl">
          Continue Shopping
        </Link>
      </div>
    </section>
  }

  
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-green-50 py-12">
        <Helmet>
        <title>Shopping Cart - FreshCart</title>
      </Helmet>
      
      <div className="align-element">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Review your items and make any adjustments before checkout
          </p>
        </div>

        <div className="flex justify-end mb-8"> 
          <button onClick={clearCart} className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
          { Loading1 ? <span className="loading loading-spinner"></span>:  "Clear Cart"}
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {allProducts?.map((productParent)=>{
              const {count , price , product , }= productParent
              const { id , imageCover, title, } = product

              if(count === 0 ){
                DeleteProduct(id)
              }

              return <div key={id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={imageCover}
                      alt={title}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                        <p className="text-2xl font-bold text-green-600">{price} EG</p>
                      </div>
                      
                      <button onClick={()=>HandleDeleteProduct(id)} className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-500 transition-colors duration-200">
                        { Productid==id && Loading3 ? <span className="loading loading-spinner"></span> :<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>}
                      </button>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600 font-medium">Quantity:</span>
                      <div className="flex items-center gap-2">
                        <button onClick={()=>handleUpdateProduct(id,count -1)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                          </svg>
                        </button>
                        
                        <span className="w-12 text-center font-semibold text-gray-900">{count}</span>
                        
                        <button onClick={()=>handleUpdateProduct(id,count +1)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      
                      { Productid===id && Loading2 && <span className="loading loading-spinner loading-sm"></span>}
                    </div>
                  </div>
                </div>
              </div>
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">{TotalCartPrice} EG</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-gray-900">Free</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold text-gray-900">Calculated at checkout</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-green-600">{TotalCartPrice} EG</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link to={`/payment/${CartID}`} className="block w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-300 text-center shadow-lg hover:shadow-xl">
                  Pay Online
                </Link>
                <Link to={`/cashorder/${CartID}`} className="block w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-all duration-300 text-center">
                  Cash on Delivery
                </Link>
              </div>

              <div className="mt-6 text-center">
                <Link to="/products" className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors duration-200">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}