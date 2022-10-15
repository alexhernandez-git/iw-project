import React from "react";

const Loading = () => {
  return (
    <div className="absolute bottom-4 right-2 z-10">
      <span className="text-md bold bg-white shadow rounded p-3">
        Cargando...
      </span>
    </div>
  );
};

export default Loading;
