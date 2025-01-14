import { CiMenuBurger } from "react-icons/ci";
import { FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaUsers, FaUtensils } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { MdRateReview, MdShoppingBag } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";


const Dashboard = () => {
    const [cart] = useCart();

    const [isAdmin] = useAdmin();
    return (
        <div className="flex gap-20">

            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu">
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminHome">
                                        <FaHome></FaHome>
                                        Admin Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addItems">
                                        <FaUtensils></FaUtensils>
                                        Add Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageItems">
                                       <FaList></FaList>
                                        Manage Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookings">
                                        <FaBook></FaBook>
                                        Manage Bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/users">
                                        <FaUsers></FaUsers>
                                        All Users
                                    </NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/userHome">
                                        <FaHome></FaHome>
                                        User Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/history">
                                        <FaCalendar></FaCalendar>
                                        History
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
                                    <NavLink to="/dashboard/paymentHistory">
                                        <FaCalendar></FaCalendar>
                                        Payment History
                                    </NavLink>
                                </li>
                            </>
                    }

                    <div className="divider"></div>

                    {/* shared nav links */}
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                            <CiMenuBurger />
                            Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact">
                            <FaEnvelope />
                            Contact
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