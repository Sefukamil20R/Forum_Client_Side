import React from "react";
import { GridLoader } from "react-spinners";

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <GridLoader color="rgb(254, 132, 2)" />
    </div>
  );
}

export default Loading;
