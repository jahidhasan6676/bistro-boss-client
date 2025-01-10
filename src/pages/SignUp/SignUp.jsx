import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/socialLogin/SocialLogin";


const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { user, setUser, createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                // setUser(loggedUser);
                // console.log(loggedUser);
                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        // create user entry in the database
                       const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post("/users", userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log("user save in database")
                                    console.log("update user info user")
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Your Sign Up successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate("/")
                                }
                            })

                    })
            })

    }

    return (
        <>

            <Helmet>
                <title>Bistro Boss | SignUp</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">SignUp now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register('name', { required: true })} name="name" placeholder="Name" className="input input-bordered" required />
                                {errors.name && <p>Last name is required.</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="url"  {...register('photo', { required: true })} name="photo" placeholder="Photo URL" className="input input-bordered" required />
                                {errors.name && <p>Photo URL is required.</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register('email')} name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register('password', { required: true, minLength: 6, maxLength: 20 })} name="password" placeholder="password" className="input input-bordered" required />
                                {errors.password && <p>Please enter 6 number password.</p>}

                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="SignUp" />

                            </div>
                        </form>
                        
                        <p className="text-center hover:underline "><small>Already SingUp? <Link to="/login" className="text-blue-500">Login</Link></small></p>

                        <div className='text-center'>
                            <SocialLogin />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default SignUp;