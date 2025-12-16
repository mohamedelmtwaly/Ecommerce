

import { Link, useLoaderData } from "react-router-dom"



export default function ProductsList({ products }) {
  return (
    <div className=" mt-12 grid gap-y-8 ">
    {
      products.map((product)=>{
        const{title ,imageCover,price,category}=product
        
        return <div key={product.id} className="p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap bg-gradient-to-r from-green-50 to-emerald-50 shadow-xl hover:shadow-2xl duration-300 group border border-green-200">
          
              <img src={imageCover} alt={title} className="rounded-lg h-24 md:h-48 w-24 object-contain group-hover:scale-105 duration-300 " />
          
          <div className="ml-0 sm:ml-16 flex-1">
              <h3 className=" text-lg tracking-wider capitalize text-gray-800 font-semibold"> {title}</h3>
              <h4 className=" capitalize text-md text-green-600 font-medium">{category.name}</h4>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 ml-0 sm:ml-auto">
            <p className="font-bold text-xl text-green-700">{price}</p>
            <Link 
              to={`/products/${product.id}`}
              className="btn bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-300 px-6 py-2"
            >
              Show Details
            </Link>
          </div>
        </div>
      })
    }

</div>
  )
}