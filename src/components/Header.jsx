import { Link } from "react-router-dom";
import { userGlobal } from "../context/userContext";



export default function Header() {
  const{ name } = userGlobal()
  if(name == null) return;
  return (
    <header className="bg-gradient-to-r from-green-600 to-emerald-600 py-2 text-white shadow-lg">
      <div className="align-element flex justify-center">
      

        {name ? (
          <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm px-3 py-1 rounded-lg border border-green-300/30">
            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">{name.charAt(0).toUpperCase()}</span>
            </div>
            <h3 className="text-sm font-bold text-white">{name}</h3>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to='/login' className="link link-hover text-xs sm:text-sm text-white hover:text-green-200 transition-colors">Sign in / Guest</Link>
            <Link to='/register' className="link link-hover text-xs sm:text-sm text-white hover:text-green-200 transition-colors">Create Account</Link>
          </div>
        )}
        {/* user */}
        {/* links */}

      
      
      </div>

    </header>
  )
}