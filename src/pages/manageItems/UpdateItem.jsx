import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../components/section-title/SectionTitle";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUtensils } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const UpdateItem = () => {
    const {name,category,recipe,price,image, _id} = useLoaderData();
   

    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

     const onSubmit = async(data) => {
            console.log(data)
            // image upload to imgbb and then get and url
            const imageFile = {image: data.image[0]};
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {'content-type': 'multipart/form-data'}
            })
            console.log(res.data)
            if(res.data.success){
                // now send the menu item data to the server with the image url
                const menuItem = {
                    name: data.name,
                    category: data.category,
                    price: parseFloat(data.price),
                    recipe: data.recipe,
                    image: res.data.data.display_url
                }
                const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
                console.log(menuRes.data)
                if(menuRes.data.modifiedCount > 0){
                    reset()
                    // show success popup
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${data.name} is updated to the menu`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
    
            }
    
        }
    return (
        <div>
            <SectionTitle  heading="UPDATE ITEM" />

            <div className="bg-[#F3F3F3] p-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input  type="text" defaultValue={name} {...register("name", { required: true })} placeholder="Recipe Name" required className="input input-bordered w-full" />
                    </div>

                    <div className="flex gap-6">
                        {/* category */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue={category} {...register("category", { required: true })} className="select select-bordered w-full" required>
                                <option value="" disabled>Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="dessert">dessert</option>
                                <option value="pizza">pizza</option>
                                <option value="soup">Soup</option>
                                <option value="drinks">Drinks</option>

                            </select>
                        </div>

                        {/* price */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input type="text" defaultValue={price} {...register("price", { required: true })} placeholder="price" className="input input-bordered w-full" required />
                        </div>
                    </div>
                    {/* textarea */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Recipe Details*</span>
                        </label>
                        <textarea
                            defaultValue={recipe}
                            {...register("recipe", { required: true })}
                            placeholder="Recipe Details"
                            className="textarea textarea-bordered textarea-lg w-full " required></textarea>
                    </div>

                    {/* file input */}
                    <div>
                        <input type="file" {...register("image", { required: true })} className="file-input file-input-ghost w-full max-w-xs bg-gray-100" required />
                    </div>

                    <button className="btn color text-white">Update Item <FaUtensils /> </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;