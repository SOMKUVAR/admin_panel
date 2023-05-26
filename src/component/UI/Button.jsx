import React from "react";

const Button = (props) => {
  return (
    <button className="bg-red-800 rounded-md py-1.5 hover:bg-red-900 font-bold text-md px-10 text-white" {...props}>
      {props.children}
    </button>
  );
};

export default Button;
