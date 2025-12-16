import { useLoaderData, useLocation, useNavigate } from "react-router-dom"


export default function PaginionContainer() {
  const {meta} = useLoaderData()
  const { currentPage, numberOfPages, nextPage } = meta
  const pages = Array.from({length: numberOfPages}, (_, index) => {
    return index + 1
  })
  const { search, pathname } = useLocation()
  const navigate = useNavigate()
  
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', pageNumber)
    navigate(`${pathname}?${searchParams.toString()}`)
  }
  
  if (numberOfPages < 2) return null

  return (
    <div className="mt-16 flex justify-center">
      <div className="join">
        <button 
          className="btn btn-xs sm:btn-md join-item bg-green-50 border-green-300 hover:bg-green-100 hover:border-green-400 text-green-700" 
          onClick={() => {
            let prevPage = currentPage - 1;
            if (prevPage < 1) prevPage = numberOfPages
            handlePageChange(prevPage)
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        {pages.map((pageNumber) => {
          return (
            <button 
              key={pageNumber} 
              onClick={() => handlePageChange(pageNumber)}
              className={`btn btn-xs sm:btn-md border-none join-item ${
                pageNumber === currentPage 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-green-50 text-green-700 hover:bg-green-100'
              }`}
            >
              {pageNumber}
            </button>
          )
        })}
        <button 
          className="btn btn-xs sm:btn-md join-item bg-green-50 border-green-300 hover:bg-green-100 hover:border-green-400 text-green-700" 
          onClick={() => {
            let nextPage = currentPage + 1;
            if (nextPage > numberOfPages) nextPage = 1
            handlePageChange(nextPage)
          }}
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}