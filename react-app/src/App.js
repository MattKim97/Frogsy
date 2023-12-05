import React from "react";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import Main from "./components/Main";

function App() {


  return (
    <>
    <div><Header/></div>
    <div><Categories/></div>
    <div><Main/></div>
    <div className="FooterContainer"><Footer /></div>
    </>
  );
}

export default App;
