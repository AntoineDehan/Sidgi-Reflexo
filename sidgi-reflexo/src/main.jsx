import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header/index.jsx";
import Footer from "./components/footer/index.jsx";
import Home from "./pages/home/index.jsx";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <React.StrictMode>
      <Router>
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Routes>
          <Route
            path="/"
            element={
              <Home isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </React.StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<App />);
