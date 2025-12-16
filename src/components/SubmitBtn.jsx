


export default function SubmitBtn({text,isloading}) {

  return (
      <button  
        type="submit" 
        className="btn bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold border-none shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 btn-block"
        disabled={isloading}
      >
        { isloading ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            <span>Signing in...</span>
          </>
        ) : (
          text
        )}
      </button>
  )
}