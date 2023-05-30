import { useContext} from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../../hooks/useCart";


const FoodCard = ({item}) => {
    const { _id, name, image, recipe, price} = item;
   const {user} = useContext(AuthContext);
   const [, refetch] = useCart();
   const navigate = useNavigate();
   const location = useLocation();
    const handleAddToCard = item =>{
      if(user && user.email){
        const cartItem = {menuItemId: _id, name, image, price, email: user.email}
        fetch('http://localhost:5000/carts',{
          method: "POST",
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(cartItem)
        })
        .then(res => res.json())
        .then(data => {
          if(data.insertedId){
            refetch(); // refetch cart to update the number of items in the cart
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Food added on the cart',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      }
      else{
        Swal.fire({
          title: 'Please login to order the food',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Login Now'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login', {state:{from:location}})
          }
        })
      }
    }
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
      <button onClick={() => handleAddToCard(item)} className="btn btn-outline bg-slate-100 border-orange-500 text-orange-500 border-0 border-b-4 mt-4">Add to Card</button>
    </div>
  </div>
</div>
    );
};

export default FoodCard;