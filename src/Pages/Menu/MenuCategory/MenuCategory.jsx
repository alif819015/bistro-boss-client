import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title, img }) => {
  return (
    <div className="mb-20">
      {title && (
        <Cover
          img={img}
          title={title}
          subTitle="Would you like to try a dish?"
        ></Cover>
      )}
      <div className="grid md:grid-cols-2 md:mx-28 mx-10 gap-4 my-16">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="flex justify-center">
      <Link to={`/order/${title}`}>
      <button className="btn btn-outline border-0 border-b-4 ">Order Now</button>
      </Link>
      </div>
    </div>
  );
};

export default MenuCategory;
