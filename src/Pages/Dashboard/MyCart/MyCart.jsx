import { Helmet } from "react-helmet";
import useCart from "../../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyCart = () => {
  const [cart, refetch] = useCart();
  console.log(cart);
//   how dose reduce work 
  const total = cart.reduce((sum, item) => item.price + sum, 0);

  const handleDelete = item =>{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:5000/carts/${item._id}`,{
            method: "DELETE"
          })
          .then(res =>res.json())
          .then(data => {
            if(data.deletedCount > 0){
                refetch();
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
            }
          })
        }
      })
  }
  return (
    <div className="w-full min-h-full">
      <Helmet>
        <title>Bistro Boss | MyCart</title>
      </Helmet>
      <div className="uppercase h-[70px] flex font-semibold justify-evenly items-center gap-4">
        <h3>My Cart: {cart.length}</h3>
        <h3>total price: ${total.toFixed(2)}</h3>
        <Link to='/dashboard/payment'><button className="btn btn-active btn-primary btn-sm">pay</button></Link>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Food</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                cart.map((item, index) => <tr key={item._id}>
                <td>
                  {index+1}
                </td>
                <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                </td>
                <td>
                {item.name}
                </td>
                <td>${item.price}</td>
                <td>
                  <button onClick={()=> handleDelete(item)} className="btn btn-ghost bg-red-600 text-white"><FaTrash></FaTrash></button>
                </td>
              </tr>)
            }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCart;
