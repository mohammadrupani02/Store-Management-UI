import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Image from "../components/Image";

const LandingPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex flex-1 md:flex-row flex-col">
        <Outlet />
        <Image />
      </main>
    </div>
  );
};

export default LandingPage;
