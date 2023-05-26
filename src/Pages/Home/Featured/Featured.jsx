import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featured from '../../../assets/home/featured.jpg';
import './Featured.css';

const Featured = () => {
    return (
        <div className="featured-item bg-fixed pt-8 my-20">
            <SectionTitle
            subHeading="Check it out"
            heading="FROM OUR MENU"
            ></SectionTitle>
            <div className="md:flex justify-center items-center bg-slate-500 bg-opacity-30 text-white mx-auto pb-20 pt-12 px-36">
                <div>
                    <img src={featured} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>March 20, 2023</p>
                    <p>WHERE CAN I GET SOME?</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore, sit. Porro obcaecati laborum aut consectetur? Iste optio nesciunt placeat rem?</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4 ">Button</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;