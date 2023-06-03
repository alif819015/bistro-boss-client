import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaShoppingCart } from 'react-icons/fa';
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const [isAdmin] = useAdmin();

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  const navOption = (
    <>
      <li className="sm:text-black md:text-white">
        <Link to="/">HOME</Link>
        <Link to="/menu">OUR MENU</Link>
        <Link to="/order/salad">Order Food</Link>
        {isAdmin?
          <Link to="/dashboard/adminHome">Dash Board</Link>:
          <Link to="/dashboard/userHome">Dash Board</Link>

        }
        <Link to="/dashboard">
          <button className="btn gap-2">
            <FaShoppingCart></FaShoppingCart>
            <div className="badge badge-secondary">+{cart?.length || 0}</div>
          </button>
        </Link>

        {user ? (
          <>
            <button onClick={handleLogout} className="my-auto btn btn-active btn-ghost">
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
          </>
        )}
      </li>
    </>
  );
  return (
    <>
      <div
        style={{ fontFamily: "font-Cinzel" }}
        className="navbar fixed z-10 bg-opacity-30 bg-black text-white"
      >
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOption}
            </ul>
          </div>
          <div className="flex flex-col uppercase py-1 md:ml-5">
            <a
              style={{
                fontSize: "24px",
                fontWeight: "900px",
                letterSpacing: "3px",
              }}
              className="text-xl"
            >
              Bistro Boss
            </a>
            <a
              style={{
                fontWeight: "700px",
                letterSpacing: "0.50em",
              }}
              className=""
            >
              Restaurant
            </a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOption}</ul>
        </div>
        <div className="navbar-end">
          {user && (
            <div className="avatar online">
              <div className="w-12 rounded-full">
                <img title={user?.displayName} src={user?.photoURL} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
