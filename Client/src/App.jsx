import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AppLayout from "./components/AppLayout";
import Error from "./pages/Error";
import Logout from "./pages/Logout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Wrap all routes inside AppLayout */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<Service />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
