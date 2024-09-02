import VerificationCode from "./Components/Verificationcodepage";
import EnterPassword from "./Components/EnterNewPasspage";
import Loginpage from "./Components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signuppage from "./Components/Signup";
import ForgotPassword from "./Components/ForgotPassword";
import Home from "./Components/Home";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProductPage from "./Components/products/ProductPage";
import Channels from "./Components/community/Channels";
import Profile from "./Components/user-profile/Profile";
import Memory from "./Components/memory/Memory";
import CreateChannel from "./Components/community/CreateChannel";
import Channel from "./Components/community/Channel";
import EventsContainer from "./Components/community/EventsContainer";
import Chatroom from "./Components/community/Chatroom";
import Shorts from "./Components/memory/Shorts/Shorts"

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="font-ubuntu bg-custom-background-gradient bg-fixed">
        <Routes>
          <Route path="/verification" element={<VerificationCode />} />
          <Route path="/enter-password" element={<EnterPassword />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/community" element={<Channels />} />
          <Route path="/community/channel/:channelId" element={<Channel/>}>
          <Route>
            <Route path="/community/channel/:channelId/" element={<EventsContainer/>} />
            <Route path="/community/channel/:channelId/events" element={<EventsContainer/>} />
            <Route path="/community/channel/:channelId/chatroom" element={<Chatroom/>} />
          </Route>
          </Route>
          <Route path="/community/create" element={<CreateChannel/>} />
          <Route path="/user" element={<Profile />} />
          <Route path="/memory" element={<Memory/>} />
          <Route path="/memory/shorts" element={<Shorts/>} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
//success!
