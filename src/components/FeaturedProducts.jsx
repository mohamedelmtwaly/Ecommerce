import { ProductsGrid, SectionTitle } from '../components'
import { useLoaderData } from 'react-router-dom'

export default function FeaturedProducts() {
  const { products } = useLoaderData();
  
  return (
    <div className='pt-24 bg-gradient-to-b from-white to-green-50 py-16'>
      <SectionTitle text='featured Products'/>
      <ProductsGrid products={products}/>
    </div>
  )
}