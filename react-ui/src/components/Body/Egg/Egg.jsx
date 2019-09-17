import React from "react";
import "./Egg.scss";

const Egg = ({ aura, glowFilter, filterProp }) => (
  <div className="egg">
    {aura}
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
    >
      <title>Artboard 22</title>
      <defs>{glowFilter}</defs>
      <path
        d="M501.26,745c-58.63,0-105.28-15.69-138.65-46.64C324.38,662.92,305,608.2,305,535.71,305,380.93,392.48,255,500,255S695,380.93,695,535.71c0,72.66-19,127.39-56.38,162.68C605.84,729.32,559.62,745,501.26,745Z"
        style={{ fill: "#fff" }}
        filter={filterProp}
      />
      <path
        filter={filterProp}
        d="M500,260c25.15,0,49.6,7.07,72.68,21,22.61,13.67,43,33.32,60.55,58.41,17.75,25.35,31.7,54.93,41.46,87.92A381.34,381.34,0,0,1,690,535.71C690,704.56,587.36,740,501.26,740c-27.53,0-52.76-3.64-75-10.81C402.8,721.61,382.52,710,366,694.7c-37.17-34.46-56-88-56-159a381.34,381.34,0,0,1,15.31-108.37c9.76-33,23.71-62.57,41.46-87.92,17.56-25.09,37.94-44.74,60.55-58.41,23.08-13.94,47.53-21,72.68-21m0-10c-110.46,0-200,127.92-200,285.71S390.8,750,501.26,750,700,693.51,700,535.71,610.46,250,500,250Z"
      />
    </svg>
  </div>
);

export default Egg;
