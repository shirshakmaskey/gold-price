import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MetalForm from "./components/MetalForm";
import ShowPrice from "./components/ShowPrice";
import HomePage from "./components/HomePage";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/set-price" element={<MetalForm />} />
        <Route path="/show-price" element={<ShowPrice />} />
        {/* Add other routes here */}
        <Route path="/" exact element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
