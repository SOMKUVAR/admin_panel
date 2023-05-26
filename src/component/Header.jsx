import React from "react";

const Header = (props) => {
  const { setIsOpenLeftSidebar } = props;
  const onLogout = () => {
      localStorage.removeItem('admin');
      localStorage.removeItem('admin_login');
      window.location.href = '/';
  }
  return (
    <div className="w-full top-0 text-red-900 font-bold bg-white flex flex-col items-center md:flex-row md:justify-between px-5 py-3">
      <span className="cursor-pointer" onClick={()=> setIsOpenLeftSidebar(prev => !prev)}>
           VERIFICATION
      </span>
      <ul className="flex flex-col items-center md:flex-row">
        <li><button className="rounded bg-red-50  px-2 text-sm py-2">Profile</button></li>
        <li className="ml-2"><button className="rounded bg-red-50  px-2 text-sm py-2" onClick={onLogout}>Log Out</button></li>
      </ul>
    </div>
  );
};

export default Header;
