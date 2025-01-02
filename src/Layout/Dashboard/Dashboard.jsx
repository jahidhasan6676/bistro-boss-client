import { CiMenuBurger } from "react-icons/ci";
import { FaCalendar, FaHome } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { MdRateReview, MdShoppingBag } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../../hooks/useCart";


const Dashboard = () => {
    const [cart] = useCart();
    return (
        <div className="flex gap-20">

            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu">
                    <li>
                        <NavLink to="/dashboard/UserHome">
                            <FaHome></FaHome>
                            User Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/reservation">
                            <FaCalendar></FaCalendar>
                            Reservation
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/cart">
                            <IoMdCart />
                            My Cart {cart.length}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/review">
                            <MdRateReview />
                            Add Review
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/booking">
                            <FaCalendar></FaCalendar>
                            My Booking
                        </NavLink>
                    </li>
                    <div className="divider"></div>

                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/menu">
                            <CiMenuBurger />
                            Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/booking">

                            <MdShoppingBag />
                            Shop
                        </NavLink>
                    </li>
                </ul>
            </div>


            <div className="w-full">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;