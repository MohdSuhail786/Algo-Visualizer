import React from "react";
import "../common.css";
import ChartTracer from "./ChartTracer";
import LogsTracer from "./LogsTracer";
import ProgramTracer from "./ProgramTracer";

function Sorting({sortMethod}) {
  

  return (
    <>
      <div className="main-container row">
        <ChartTracer method={sortMethod} />
        <LogsTracer method={sortMethod}/>
        <ProgramTracer method={sortMethod} />
      </div>
    </>
  );
}

export default Sorting;
