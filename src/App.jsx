import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./view/home/Home";
import SignIn from "./view/auth/SignIn";
import SignUp from "./view/auth/SignUp";
import MainLayout from "./view/MainLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminRoomManager from "./view/Admin/AdminRoomManager";
import RoomManager from "./view/Admin/BarAdmin/RoomManagers/RoomManager";
import RoomDetail from "./view/components/RoomDetail.jsx/RoomDetail";
import UserManager from "./view/Admin/BarAdmin/UserManager/UserManager";
import UserProvider from "./context/UserContext";



function App() {

  return (
    <UserProvider>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="roomInfo/:roomId" element={<RoomDetail />} />

          </Route>

          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />

          <Route>
            <Route path="/admin" element={<AdminRoomManager />} >
              <Route path="room-manager" element={<RoomManager />} />
              <Route path="user-manager" element={<UserManager />} />

            </Route>
          </Route>

          {/* <Route>
          <Route path="/admin" element={<AdminRoomManager />} />
            <Route path="room-manager" element={<RoomManager />} />

      
        </Route> */}

        </Routes>
      </BrowserRouter >


    </UserProvider>


  );
}

export default App;
