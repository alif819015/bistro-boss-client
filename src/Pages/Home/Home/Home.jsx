import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Recommendetion from "../Recommendetion/Recommendetion";
import Testimonials from "../Testimonials/Testimonials";
import BestFood from "../BestFood/BestFood";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Home</title>
      </Helmet>
      <Banner></Banner>
      <div className="md:max-w-screen-lg mx-auto">
      <Category></Category>
      <BestFood></BestFood>
      <PopularMenu></PopularMenu>
      </div>
      <Recommendetion></Recommendetion>
      <Featured></Featured>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
