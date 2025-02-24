import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";


const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const navigate = useNavigate();
    const [cart, isLoading] = useCart();

    const handleLogOut = () => {
        signOutUser()
        navigate("/login")
    }
   


    const links = <>

        <li ><Link to="/">Home</Link></li>
        <li ><Link to="/menu">Our Menu</Link></li>
        <li ><Link to="/order/salad">Order Food</Link></li>
        <li ><Link to="/secret">Secret</Link></li>
        {
            user && isAdmin && <li ><Link to="/dashboard/adminHome">Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li ><Link to="/dashboard/userHome">Dashboard</Link></li>
        }


    </>
    return (
        <div className="navbar fixed z-10 max-w-screen-xl bg-opacity-30 bg-black text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Bistro Boss</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user && user?.email ?

                        <div className="flex gap-2">
                            <div className="flex">
                                <img referrerPolicy="referrer" className="w-10 rounded-[100%]" src={user?.photoURL} alt="" />
                                <Link to="/dashboard/cart">
                                <div className="badge badge-secondary">+{cart.length}</div>
                                </Link>
                            </div>
                            <div>

                                <button onClick={handleLogOut} className="btn btn-success text-white">LogOut</button>
                            </div>
                        </div>

                        :
                        <div className="flex gap-2">
                            <div className="flex">
                                <img className="w-10 rounded-[100%]" referrerPolicy="no-referrer" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                <div className="badge badge-secondary">+0</div>
                            </div>
                            <button className="btn btn-success text-white"><Link to="/login">Login</Link></button>

                        </div>


                }
            </div>
        </div>
    );
};

export default Navbar;