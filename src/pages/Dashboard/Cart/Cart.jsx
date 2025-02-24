import React from 'react';
import useCart from '../../../hooks/useCart';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cart,refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axiosSecure = useAxiosSecure();

    const handleItemDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                .then(res => {
                    
                    if(res.data.deletedCount){
                        refetch()
                        Swal.fire({
                            title: "Deleted!",
                            text: "Item successfully deleted.",
                            icon: "success"
                        });
                       
                    }
                })
            }
        });
    }
    return (
        <div className='my-20'>
            <div className='flex justify-between'>
                <h2 className='text-3xl'>Total Orders: {cart.length}</h2>
                <h2 className='text-3xl'>Total Price: ${totalPrice}</h2>
                {
                    cart.length ? 
                    <Link to="/dashboard/payment"><button className='btn btn-success text-white'>Pay</button></Link> :
                    <button disabled className='btn btn-success text-white'>Pay</button>
                }
            </div>

            <div className="overflow-x-auto bg-gray-100 mt-10 p-8">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='bg-orange-700 text-white'>
                            <th>#</th>
                            <th>Item Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            cart.map((item, index) => <tr key={item._id} idx={index}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={item.image}
                                                    alt="Food Image" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>{item.price}</td>
                                <th>
                                    <button onClick={() => handleItemDelete(item._id)} className="btn btn-ghost text-2xl text-red-500"><MdDelete /></button>
                                </th>
                            </tr>)
                        }



                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Cart;