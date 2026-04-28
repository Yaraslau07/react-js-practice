import { useSearchParams } from "react-router"
import "./pagination.scss"

export function Pagination({totalPages}){
    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = Number(searchParams.get("page")) || 1

    const changePage = (type) => {
        const paramCopy = new URLSearchParams(searchParams)
        if(type === 'next' && currentPage < totalPages){
            paramCopy.set("page", currentPage + 1)
            setSearchParams(paramCopy)
        }else if(type === 'back' && currentPage > 1){
            paramCopy.set("page", currentPage - 1)
            setSearchParams(paramCopy)
        }
    }

    if(totalPages < 2) return null
    
    return(
      <div className="pagination-controls">
            <button 
                type="button"
                onClick={() => changePage('back')} 
                disabled={currentPage === 1}
            >
                Back
            </button>
            
            <span className="page-indicator">
                Page {currentPage} of {totalPages}
            </span>
            
            <button 
                type="button"
                onClick={() => changePage('next')} 
                disabled={currentPage >= totalPages}
            >
                Next
            </button>
        </div>
    )
}