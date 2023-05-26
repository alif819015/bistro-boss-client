
const FoodCard = ({item}) => {
    const {name, image, recipe, price} = item;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
  <figure className="">
    <img src={image} alt="Shoes" className="rounded-xl" />
  </figure>
  <p className="bg-black text-white absolute right-0 mt-5 mr-5 px-3 py-1">${price}</p>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{name}</h2>
    <p>{recipe}</p>
    <div className="card-actions">
      <button className="btn btn-outline bg-slate-100 border-orange-500 text-orange-500 border-0 border-b-4 mt-4">Add to Card</button>
    </div>
  </div>
</div>
    );
};

export default FoodCard;