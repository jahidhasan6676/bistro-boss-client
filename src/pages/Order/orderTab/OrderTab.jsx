
import FoodCart from "../../../components/foodCart/FoodCart";


const OrderTab = ({ items }) => {
    
    
    return (
       
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10'>
                {
                    items.map(items => <FoodCart key={items._id} items={items}></FoodCart>)
                }
            </div>

            
       
    );
};

export default OrderTab;