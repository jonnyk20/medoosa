import React from "react";
import { eyes, mouth } from "../../Mods";
import "./Ephyra.scss";

const Ephyra = ({ modSelections, aura, glowFilter, filterProp }) => {
  const Eyes = eyes[modSelections[1].value];
  const Mouth = mouth[modSelections[2].value];

  return (
    <div className="ephyra">
      {aura}
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
      >
        <title>Ephyra</title>
        <defs>{glowFilter}</defs>
        <path
          d="M662.82,693.31c-27.15,0-52.61-17.89-68.09-47.86-2.82-5.45-7.71-8.71-13.07-8.71s-10.25,3.26-13.07,8.71c-15.49,30-40.94,47.86-68.09,47.86s-52.6-17.89-68.09-47.86c-2.82-5.45-7.71-8.71-13.07-8.71s-10.25,3.26-13.07,8.71c-15.49,30-40.94,47.86-68.09,47.86-45.59,0-82.68-49.5-82.68-110.36,0-1.78,0-3.59.11-5.53l.19-5.19h-.27c2-176.31,111.14-318.92,245-318.92s242.94,142.61,245,318.92h-.27l.19,5.19c.07,1.89.11,3.76.11,5.53C745.5,643.81,708.41,693.31,662.82,693.31Z"
          style={{ fill: "currentcolor" }}
          filter={filterProp}
        />
        <path d="M500.5,258.31c129.82,0,235.89,137.68,239.88,308.92H740l.39,10.38c.07,1.83.1,3.63.1,5.34,0,28.64-8.4,55.47-23.64,75.52-14.63,19.25-33.82,29.84-54,29.84-25.24,0-49-16.88-63.65-45.16-3.7-7.14-10.24-11.41-17.51-11.41s-13.82,4.27-17.51,11.41c-14.61,28.28-38.41,45.16-63.65,45.16s-49-16.88-63.65-45.16c-3.69-7.14-10.24-11.41-17.51-11.41s-13.81,4.27-17.51,11.41c-14.61,28.28-38.41,45.16-63.65,45.16-20.22,0-39.41-10.59-54-29.84C268.9,638.42,260.5,611.59,260.5,583c0-1.7,0-3.5.1-5.35l.39-10.37h-.37c4-171.24,110.06-308.92,239.88-308.92m0-10c-138.07,0-250,147.27-250,328.92h.11c-.07,1.9-.11,3.8-.11,5.72,0,63.72,39.26,115.36,87.68,115.36,30.17,0,56.76-20,72.54-50.57,2.06-4,5.34-6,8.62-6s6.56,2,8.62,6c15.78,30.52,42.37,50.57,72.54,50.57s56.76-20,72.54-50.57c2.06-4,5.34-6,8.62-6s6.56,2,8.62,6c15.78,30.52,42.37,50.57,72.54,50.57,48.42,0,87.68-51.64,87.68-115.36,0-1.92,0-3.82-.11-5.72h.11c0-181.65-111.93-328.92-250-328.92Z" />
      </svg>
      <div className="ephyra__eyes">
        <Eyes />
      </div>
      <div className="ephyra__mouth">
        <Mouth />
      </div>
    </div>
  );
};

export default Ephyra;
