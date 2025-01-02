import { Link } from "react-router-dom";
import Cover from "../../../shared/Cover";
import MenuItem from "../../../shared/MenuItem";


const MenuCategory = ({ items, title, img }) => {
    return (
        <div className="py-14">

            {title && <Cover img={img} title={title}></Cover>
            }
            <div className="grid md:grid-cols-2 gap-10 mt-8">
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <div className="text-center">
                <Link to={`/order/${title}`}>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Order Your Favorite Food</button>
                </Link>
            </div>
        </div>
    );
};

export default MenuCategory;