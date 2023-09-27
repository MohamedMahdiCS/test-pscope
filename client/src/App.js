import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import Personalitytestpage from "./components/PersonalityTestPage";
import AboutUs from './components/AboutUs';
import VerifyEmail from './components/VerifyEmail';
import RequestReset from "./components/RequestReset";
import CompleteReset from "./components/CompleteReset";
import ContactUs from "./components/contactus/contactus";
import SuggestionsFeedback from "./components/SuggestionsFeedback/SuggestionsFeedback";  // Import your new component here







function App() {
    const user = localStorage.getItem("token");

    return (
        <Routes>
            <Route path="/" exact element={<Main />} />
            {user && <Route path="/personalitytestpage" exact element={<Personalitytestpage />} />}
            <Route path="/AboutUs" exact element={<AboutUs />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/contactus" exact element={<ContactUs />} />
            <Route path="/verify/:token" element={<VerifyEmail />} />
            <Route path="/requestReset" element={<RequestReset />} />
            <Route path="/reset/:token" element={<CompleteReset />} />
            {user && <Route path="/suggestions-feedback" element={<SuggestionsFeedback />} />}  {/* Add the new Route here */}
            {!user && <Route path="*" element={<Navigate replace to="/login" />} />}
        </Routes>
    );
}

export default App;
