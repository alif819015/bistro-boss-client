import { NavLink, Outlet } from "react-router-dom";
import {
  FaShoppingCart,
  FaWallet,
  FaCalendarAlt,
  FaHome,
  FaBars,
  FaShopify,
  FaEnvelope,
  FaUtensils,
  FaUsers,
  FaBook,
} from "react-icons/fa";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [cart] = useCart();

    // TODO: load data from server to have dynamic isAdmin based on data
    // const isAdmin = true;
    const [isAdmin] = useAdmin();


  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* <!-- Page content here --> */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side bg-[#D1A054]">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 text-base-content">
          {/* <!-- Sidebar content here --> */}
          {
            isAdmin? 
            <>
            <li>
            <NavLink to='/dashboard/adminHome'>
              <FaHome></FaHome> Admin Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/addItem'>
              <FaUtensils></FaUtensils> Add an Items
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/manageItem'>
              <FaBars></FaBars> Manage Items
            </NavLink>
          </li>
          {/* <li>
            <NavLink to='/dashboard/myCart'>
              <FaShoppingCart></FaShoppingCart> My Cart
              <span className="badge badge-secondary">+{cart?.length || 0}</span>
            </NavLink>
          </li> */}
          <li>
            <NavLink to='/dashboard/review'>
              <FaBook></FaBook> Manage Booking
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/allUser'>
              <FaUsers></FaUsers> All Users
            </NavLink>
          </li>
            </>:
            <>
            <li>
            <NavLink to='/dashboard/userHome'>
              <FaHome></FaHome> User Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/reservation'>
              <FaCalendarAlt></FaCalendarAlt> Reservation
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/history'>
              <FaWallet></FaWallet> Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/myCart'>
              <FaShoppingCart></FaShoppingCart> My Cart
              <span className="badge badge-secondary">+{cart?.length || 0}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/review'>
              <FaShoppingCart></FaShoppingCart> Add Review
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/booking'>
              <FaShoppingCart></FaShoppingCart> My Booking
            </NavLink>
          </li>
            </>
          }
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome> HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu">
              <FaBars></FaBars> MENU
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <FaShopify></FaShopify> Shop
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/contract'>
              <FaEnvelope></FaEnvelope> Contract
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
