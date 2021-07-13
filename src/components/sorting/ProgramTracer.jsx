import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function ProgramTracer(props) {
  const program = {
    "Bubble Sort": [
      `for i = 0 to n`,
      `{`,
      `for j = 0 to n - i`,
      `{`,
      `if arr[j] > arr[j+1]`,
      `{`,
      `swap (arr[j],arr[j+1])`,
      `}`,
      `}`,
      `}`,
    ],
    "Selection Sort": [
      `for i = 0 to n`,
      `{`,
      `let min = i`,
      `for j = i+1 to n`,
      `{`,
      `if arr[j] < arr[min]`,
      `{`,
      `min = j`,
      `}`,
      `swap (arr[i],arr[min])`,
      `}`,
      `}`,
    ],
    "Insertion Sort": [
      `for i = 1 to n`,
      `{`,
      `for j = i-1 to 0`,
      `{`,
      `if arr[j+1] < arr[j]`,
      `{`,
      `swap (arr[j],arr[j+1])`,
      `}`,
      `else break`,
      `}`,
      `}`,
    ],
  };
  const lineRef = useRef(
    [...new Array(program[props.method].length)].map(() => React.createRef())
  );
  const pLine = useSelector((state) => state.programState);

  function updateCurrent(line) {
    for (let i = 0; i < lineRef.current.length; i++) {
      if (i === line) {
        lineRef.current[i].current.style.backgroundColor = "black";
        lineRef.current[i].current.style.color = "white";
      } else {
        lineRef.current[i].current.style.backgroundColor = "white";
        lineRef.current[i].current.style.color = "black";
      }
    }
  }

  useEffect(() => {
    updateCurrent(pLine);
  }, [pLine]);

  return (
    <>
      <div className="program-tracer row">
        <div className="heading">Program Tracer</div>

        <table className="program">
          <tbody> 
            <tr>
              <td>S.No.</td>
              <td>Source Code</td>
            </tr>
          </tbody>
          {program[props.method].map((v, i) => {
            return (
              < >
                <tbody key={i}>
                  <tr ref={lineRef.current[i]}>
                    <td>{i}</td>
                    <td>{v}</td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default ProgramTracer;
