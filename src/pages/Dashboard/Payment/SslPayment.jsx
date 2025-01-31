import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";


const SslPayment = () => {
    const [cart,refetch] = useCart();
    const {user} = useAuth();
    // const totalPrice = cart.reduce((total,item)=>total + item.price, 0)


    const handleCreatePayment = async()=>{
    // now save the payment in the database
    const payment = {
        email: user?.email,
        // price: totalPrice,
        transactionId: "",
        data: new Date(), // utc date convert, use moment js
        cartIds: cart.map(item => item._id),
        menuItemsIds: cart.map(item => item.menuId),
        status: "pending"
    }
    
    const response = await axios.post("http://localhost:5000/create-ssl-payment", payment)
    console.log(response.data)
    if(response.data?.gatewayUrl){
        window.location.replace(response.data.gatewayUrl)
    }
    console.log(response.data)



    }
    return (
        <div>
            <div className="bg-gray-50 p-6">
                <h2 className="text-xl font-semibold mb-1">Payment Details</h2>
                <p className="text-sm font-medium text-gray-500">Complete your order by providing your payment details</p>
                <div className="mt-3 mb-2">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" defaultValue={user?.email} placeholder="email" className="input input-bordered" required readOnly/>
                </div>
                <button onClick={handleCreatePayment} className="btn btn-neutral">Place Order</button>
            </div>
        </div>
    );
};

export default SslPayment;