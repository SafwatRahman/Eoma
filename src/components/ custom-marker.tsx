import React from "react";
import "./Marker.css";

const CustomMarker = (props: any) => {
  const { color, name, id } = props;
  return (
    <div
      className="marker"
      style={{ backgroundColor: color, cursor: "pointer" }}
      title={name}
    />
  );
};
export default CustomMarker;
