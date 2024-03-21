import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ModalNoti from "./components/modal/ModalNoti";

function MainLayout() {
  return (
    <div>
      <Header />
      <ModalNoti />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
