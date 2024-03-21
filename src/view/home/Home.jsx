import CarouselHome from "../components/Carousel/CarouselHome";
import Banner from "./Banner/Banner";
import Dashboard from "./Dashboard/Dashboard";

export default function Home() {
  return (
    <div>
      <Banner />
      <CarouselHome/>
      <Dashboard />
    </div>
  );
}


