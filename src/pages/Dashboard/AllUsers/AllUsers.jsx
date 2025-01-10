
import { MdDelete } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

//  {
//     headers:{
//         authorization: `Bearer ${localStorage.getItem("access-token")}`
//     }
// }


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
   


    const { data: users = [], refetch, isLoading, error } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
        onError: (err) => {
            console.error("Error fetching users:", err);
        }
    });
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading users: {error.message}</p>;


    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })

    }

    const handleDeleteUser = (id) => {
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
                axiosSecure.delete(`/users/${id}`)
                    .then(res => {

                        if (res.data.deletedCount) {
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
        <div className="py-20">
            <div>
                <h2 className="text-xl">All Users: {users.length}</h2>

            </div>

            {/* table form */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users?.map((user, index) => <tr key={user._id} index={index}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user.role === 'admin' ? "Admin" : <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost text-2xl bg-orange-300"><FaUsers /></button>
                                    }
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user._id)} className="btn btn-ghost text-2xl text-white bg-red-500"><MdDelete /></button>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;