import React from "react";
import Header from "../components/Header/Header";
import Destaque from "../components/Destaque/Destaque";
import Topicos from "../components/Topicos/Topicos";
import FooterNav from "../components/FooterNav/FooterNav";
import temas from "../data/temas";
import "../App.css";

const Home = ({ userId }) => {
  return (
    <div className="home">
      <Header userId={userId} />
      <Destaque />
      <Topicos topicos={temas} />
      <FooterNav />
    </div>
  );
};

export default Home;
