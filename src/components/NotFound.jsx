import React from "react";

export default function NotFound() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-100 flex items-center justify-center">
      <div
        className="w-full h-full bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('/assets/404.svg')" }}
      ></div>
    </div>
  );
}
  