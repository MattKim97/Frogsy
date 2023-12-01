import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Footer from "./components/Footer";

function App() {


  return (
    <>
    <div><Header/></div>
    <div><Categories/></div>
    <div className="FooterContainer"><Footer /></div>
    </>
  );
}

export default App;
