import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { FaTrash, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const  { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    })

    const handleMakeAdmin = user =>{
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH',
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount){
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  }) 
            }
        })
    }


    const handleDelete = user =>{

    }
    return (
        <div className="w-full px-5">
            <Helmet>
        <title>Bistro Boss | AllUsers</title>
      </Helmet>
            <h3 className="uppercase text-xl font-bold h-[50px]">all Users: {users.length}</h3>
            <div className="overflow-x-auto">
  <table className="table table-zebra w-full">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        users.map((user,index) => <tr key={user._id}>
        <th>{index + 1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role === "admin"? 'admin' : 
        <button onClick={()=> handleMakeAdmin(user)} className="btn btn-ghost bg-[#D1A054] text-white"><FaUserShield></FaUserShield></button>
        }</td>
        <td><button onClick={()=> handleDelete(user)} className="btn btn-ghost bg-[#B91C1C] text-white"><FaTrash></FaTrash></button></td>
      </tr>)
      }
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AllUsers;