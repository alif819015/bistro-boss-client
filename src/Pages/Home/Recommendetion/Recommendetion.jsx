
import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import FoodCard from "../../../Components/SectionTitle/FoodCard/FoodCard";

const Recommendetion = () => {
    const [menu, setMenu] = useState([])
    useEffect(()=> {
        fetch('menu.json')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const offered = data.filter( offer => offer.category === 'offered')
            setMenu(offered);
        })
    },[])
    return (
        <section className="mb-16">
            <SectionTitle
            subHeading='Should Try'
            heading='CHEF RECOMMENDS'
            ></SectionTitle>
            <div className="flex gap-4">
        {
            menu.map(item => <FoodCard item={item} key={item}></FoodCard>)
        }
            </div>
        </section>
    );
};

export default Recommendetion;