import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import LeftSideBar from "../component/LeftSidebar";

const MainPage = () => {
  const [isOpenLeftSidebar, setIsOpenLeftSidebar] = useState(false);

  return (
    <div>
     <Header setIsOpenLeftSidebar={setIsOpenLeftSidebar} />
     <div className="relative overflow-auto">
      <div className="flex relative">
        <LeftSideBar isOpenLeftSidebar={isOpenLeftSidebar} />
        <div className="w-full absolute ">
          <Outlet />
        </div>
      </div>
      </div>
    </div>
  );
};

export default MainPage;
