import { Helmet } from "react-helmet-async";
import Cover from "../../shared/Cover";
import menuImg from '../../assets/menu/banner3.jpg'
import SectionTitle from "../../components/section-title/SectionTitle";
import useMenu from "../../hooks/useMenu";
import MenuCategory from "./MenuCategory/MenuCategory";
import dessertImg from '../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../assets/menu/pizza-bg.jpg';
import saladImg from '../../assets/menu/salad-bg.jpg';
import soupImg from '../../assets/menu/soup-bg.jpg';

const Menu = () => {
    const [menu, loading] = useMenu();
    const pizza = menu.filter(item => item.category === 'pizza');
    const dessert = menu.filter(item => item.category === 'dessert');
    const salad = menu.filter(item => item.category === 'salad');
    const soup = menu.filter(item => item.category === 'soup');
    const offered = menu.filter(item => item.category === 'offered');
   
    return (
        <div >
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover img={menuImg} title={"our menu"}></Cover>
           {/* main cover */}
            <SectionTitle subHeading={"Don't miss"} heading={"Today's Offer"}></SectionTitle>

            {/* offered menu items */}
            <MenuCategory items={offered}></MenuCategory>

            {/* dessert menu items */}
            <MenuCategory
            items={dessert}
            title={"dessert"}
            img={dessertImg}>
            </MenuCategory>

            {/* pizza menu items */}
            <MenuCategory
            items={pizza}
            title={"pizza"}
            img={pizzaImg}>
            </MenuCategory>

            {/* salad menu items */}
            <MenuCategory
            items={salad}
            title={"salad"}
            img={saladImg}>
            </MenuCategory>

            {/* soup menu items */}
            <MenuCategory
            items={soup}
            title={"soup"}
            img={soupImg}>
            </MenuCategory>
   
        </div>
    );
};

export default Menu;