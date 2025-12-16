import { NavLink } from 'react-router-dom';

const links = [
  { id: 1, url: '/', text: 'home' },
  { id: 3, url: 'products', text: 'products' },
  { id: 4, url: 'wishlist', text: 'wishlist' },
  { id: 5, url: 'cart', text: 'cart' },
  { id: 7, url: 'categories', text: 'categories' },
  { id: 8, url: 'brands', text: 'Brands' },
];

export default function Navlinks() {
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        return (
          <li key={id}>
            <NavLink
              to={url}
              className="text-gray-600 hover:text-emerald-600 font-semibold px-4 py-2 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-105 capitalize border border-transparent hover:border-emerald-200"
            >
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  )
}
