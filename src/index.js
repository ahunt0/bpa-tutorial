import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoginForm from "./Components/Auth/LoginForm";
import RegistrationForm from "./Components/Auth/RegistrationForm";
import { NextUIProvider } from "@nextui-org/react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NextUIProvider>
    <Router>
      <AnimatePresence exit>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </AnimatePresence>
    </Router>
  </NextUIProvider>
);

reportWebVitals();
