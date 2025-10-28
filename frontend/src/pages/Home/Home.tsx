import Footer from "./sections/Footer/section";
import Header from "./sections/Header/section";
import Navbar from "./sections/Navbar/section";
import Products from "./sections/Products/sections";
import Sponsored from "./sections/Sponsored/section";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <Navbar />
      <Sponsored />
      <Products />
      <Footer />
    </div>
  );
};

export default Home;
