import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/section-title/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddItems = () => {
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const onSubmit = async(data) => {
        console.log(data)
        // image upload to imgbb and then get and url
        const imageFile = {image: data.image[0]};
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {'content-type': 'multipart/form-data'}
        })
        console.log(res.data)

    }
    return (
        <div className="pb-20 ">
            <SectionTitle heading="---What's New---" subHeading="ADD AN ITEM" />

            <div className="bg-[#F3F3F3] p-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input type="text" {...register("name", {required: true})} placeholder="Recipe Name" required className="input input-bordered w-full" />
                    </div>

                    <div className="flex gap-6">
                        {/* category */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select {...register("category", {required: true})} className="select select-bordered w-full" required>
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
                            <input type="text" {...register("price", {required: true})} placeholder="price" className="input input-bordered w-full" required />
                        </div>
                    </div>
                    {/* textarea */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Recipe Details*</span>
                        </label>
                        <textarea
                            {...register("recipe", {required: true})}
                            placeholder="Recipe Details"
                            className="textarea textarea-bordered textarea-lg w-full " required></textarea>
                    </div>

                    {/* file input */}
                    <div>
                        <input type="file" {...register("image", {required: true})} className="file-input file-input-ghost w-full max-w-xs bg-gray-100" required />
                    </div>

                    <button className="btn color text-white">Add Item <FaUtensils /> </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;