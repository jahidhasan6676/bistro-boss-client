import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";



const FoodCart = ({ items }) => {
    const {_id, name, image, price, recipe } = items;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const handleAddToCart = (food) => {
        if (user && user?.email) {
            // send food item database
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }

            axios.post("http://localhost:5000/carts", cartItem)
            .then(res => {
                console.log(res.data)
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${name} added to your cart`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                }

            })
            
        }
        else {
            Swal.fire({
                title: "You are not login?",
                text: "Please login to add to the cart!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", {state: {from: location}})
                }
            });
        }
    }
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src={image}
                    alt="food" />
            </figure>
            <p className="absolute right-0 mt-5 mr-5 bg-slate-900 text-white px-3 ">{price}</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button onClick={() => handleAddToCart(items)} className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCart;