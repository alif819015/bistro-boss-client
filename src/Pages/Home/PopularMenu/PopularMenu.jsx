import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import MenuItem from "../../Shared/MenuItem/MenuItem";


const PopularMenu = () => {
const [menu] = useMenu();
console.log(menu)
const popular = menu.filter(item => item.category === 'popular');
    return (
        <section className="mb-12">
            <SectionTitle 
            subHeading="Popular Items"
            heading="FROM OUR MENU"
            >
            </SectionTitle>
            <div className="grid md:grid-cols-2 gap-4">
            {
                popular.map(item =>  <MenuItem key={item._id} item={item}></MenuItem>)
            }
            </div>
            <div className="flex justify-center mx-auto">
            <button className="btn btn-outline border-0 border-b-4 mt-4 ">View Full Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;