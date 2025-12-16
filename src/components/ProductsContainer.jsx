import { useLoaderData } from "react-router-dom";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useEffect } from "react";

export default function ProductsContainer() {
  const { meta, products } = useLoaderData();
  const totalData = meta.limit;
  const [layout, setLayout] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Dynamic products per page based on total products
  const productsPerPage = 14; // Keep 14 for first page
  
  // Calculate pagination for filtered products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  
  // Calculate dynamic total pages based on filtered products
  const calculateTotalPages = () => {
    if (filteredProducts.length === 0) return 0;
    
    let remaining = filteredProducts.length;
    let pages = 0;
    
    // Page 1: 14 products
    if (remaining > 0) {
      pages++;
      remaining = Math.max(0, remaining - 14);
    }
    
    // Page 2+: 13 products each
    while (remaining > 0) {
      pages++;
      remaining = Math.max(0, remaining - 13);
    }
    
    return pages;
  };
  
  const totalPages = calculateTotalPages();
  
  // Get current products for the page
  let currentProducts = [];
  if (totalPages > 0) {
    const startIndex = (currentPage - 1) * 14;
    if (currentPage === 1) {
      // First page: 14 products
      currentProducts = filteredProducts.slice(startIndex, startIndex + 14);
    } else {
      // Subsequent pages: 13 products each
      const adjustedIndex = 14 + (currentPage - 2) * 13;
      currentProducts = filteredProducts.slice(adjustedIndex, adjustedIndex + 13);
    }
  }
  
  // Adjust current page if it exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Get unique categories from products
  const categories = [...new Set(products.map(product => product.category.name))];

  // Scroll to top with smooth animation
  const scrollToTop = () => {
    const element = document.getElementById('products-header');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle page change with scroll
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setTimeout(() => scrollToTop(), 100); // Small delay for better UX
  };

  useEffect(() => {
    let filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category.name === selectedCategory);
    }
    
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, selectedCategory, products]);

  return (
    <>
      {/* Header */}
      <div id="products-header" className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-8 border-b border-base-300 pb-5 gap-4">
        <h4 className="font-medium text-md text-center sm:text-left">
          {filteredProducts.length} product{filteredProducts.length > 1 && "s"}
          {(searchTerm || selectedCategory) && (
            <div className="text-sm text-gray-500 mt-1">
              {searchTerm && ` (searching for "${searchTerm}")`}
              {selectedCategory && ` (category: ${selectedCategory})`}
            </div>
          )}
        </h4>
        <div className="flex flex-col sm:flex-row gap-x-4 gap-y-2 items-center sm:items-center justify-center sm:justify-end w-full sm:w-auto">
          {/* Category Filter */}
          <div className="form-control w-full sm:w-auto">
            <select 
              className="select select-bordered select-sm bg-green-50 border-green-300 focus:border-green-500 focus:outline-green-500 text-gray-700 w-full sm:w-40"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          {/* Search Bar */}
          <div className="form-control w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              className="input input-bordered input-sm w-full bg-green-50 border-green-300 focus:border-green-500 focus:outline-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Layout Toggle */}
          <div className="flex gap-x-2 justify-center">
            <button
              type="button"
              onClick={() => setLayout("grid")}
              className={`text-xl btn btn-circle btn-sm ${
                layout === "grid"
                  ? "bg-green-600 text-white border-green-600 hover:bg-green-700"
                  : "btn-ghost text-base-content hover:bg-green-50"
              }`}
            >
              <BsFillGridFill />
            </button>
            <button
              type="button"
              onClick={() => setLayout("list")}
              className={`text-xl btn btn-circle btn-sm ${
                layout === "list"
                  ? "bg-green-600 text-white border-green-600 hover:bg-green-700"
                  : "btn-ghost text-base-content hover:bg-green-50"
              }`}
            >
              <BsList />
            </button>
          </div>
        </div>
      </div>
      <div>
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <h5 className="text-xl font-medium text-gray-500 mb-2">Sorry, no products matched your search</h5>
            <p className="text-gray-400">Try searching with different keywords</p>
          </div>
        ) : layout === "grid" ? (
          <ProductsGrid products={currentProducts} />
        ) : (
          <ProductsList products={currentProducts} />
        )}
      </div>
      
      {/* Custom Pagination */}
      {totalPages > 1 && (
        <div className="mt-16 flex justify-center">
          <div className="join flex-wrap justify-center max-w-xs sm:max-w-none">
            <button 
              className="btn btn-xs sm:btn-md join-item bg-green-50 border-green-300 hover:bg-green-100 hover:border-green-400 text-green-700 text-xs sm:text-sm" 
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Previous</span>
            </button>
            {Array.from({length: totalPages}, (_, i) => i + 1).map((pageNumber) => (
              <button 
                key={pageNumber} 
                onClick={() => handlePageChange(pageNumber)}
                className={`btn btn-xs sm:btn-md border-none join-item text-xs sm:text-sm ${
                  pageNumber === currentPage 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-green-50 text-green-700 hover:bg-green-100'
                }`}
              >
                {pageNumber}
              </button>
            ))}
            <button 
              className="btn btn-xs sm:btn-md join-item bg-green-50 border-green-300 hover:bg-green-100 hover:border-green-400 text-green-700 text-xs sm:text-sm" 
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <span className="hidden sm:inline">Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
