import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_image_upload_token;
const AddItem = () => {
    const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
  const onSubmit = (data) => {

    const formData = new FormData();
    formData.append('image', data.image[0])

    fetch(img_hosting_url, {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then( imgResponse => {
        if(imgResponse.success){
            const imgURL = imgResponse.data.display_url;
            const {name, price, category, recipe} = data;
            const newItem = {name, price: parseFloat(price), category, recipe, image:imgURL}

            console.log(newItem)
            axiosSecure.post('/menu',  newItem)
            .then( data => {
                console.log('after posting new item', data.data)
                if(data.data.insertedId){
                    reset();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Item added Successfully',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            })
        }
    })

  };

  return (
    <div className="w-full min-h-full">
      <SectionTitle subHeading="wat's new" heading="add an item"></SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-20">
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Recipe Name*</span>
          </label>
          <input
            type="text"
            placeholder="Recipe Name"
            className="input input-bordered w-full "
            {...register("name", {required: true, maxLength: 80})}
          />
        </div>
        <div className="md:flex gap-4 my-4">
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Category*</span>
          </label>
          <select defaultValue='Pick one' className="select select-bordered" {...register("category", { required: true })}>
            <option disabled>
              Pick one
            </option>
            <option>Pizza</option>
            <option>Salad</option>
            <option>Soup</option>
            <option>Dessert</option>
            <option>Deshi</option>
            <option>Drinks</option>
          </select>
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Price*</span>
          </label>
          <input
            type="number"
            placeholder="price"
            {...register("price", { required: true })}
            className="input input-bordered w-full "
          />
        </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Recipe Details*</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Recipe Details"
            {...register("recipe", { required: true })}
          ></textarea>
        </div>
        <div className="form-control w-full my-4">
          <label className="label">
            <span className="label-text">Item Image*</span>
          </label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full "
          />
        </div>
        <input
          className="btn btn-active btn-accent"
          type="submit"
          value="Add Item"
        />
      </form>
    </div>
  );
};

export default AddItem;
