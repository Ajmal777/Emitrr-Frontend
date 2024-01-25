import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import PageNotFound from "./Pages/PageNotFound";
import Exercises from "./Pages/Exercises";
import Leaderboard from "./Pages/Leaderboard";
function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <div style={{padding: '0 5rem'}}>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/exercises" element={<Exercises />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
