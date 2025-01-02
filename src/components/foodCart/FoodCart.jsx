

const FoodCart = ({items}) => {
    const {name, image, price, recipe} = items;
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
                    <button className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCart;