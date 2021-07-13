import React, {
  useEffect,
  useState,
} from "react";
import useSorting from "./useSorting";
import "../common.css";
import { useDispatch, useSelector } from "react-redux";
import { arrayState, playState } from "../../actions";

function ChartTracer(props) {
  const array = useSelector(state=>state.arrayState);
  const [originalArray,setOriginalArray] = useState(array.slice());
  let tilesRef = React.useRef(
    [...new Array(array.length)].map(() => React.createRef())
  );

  const { bubbleSort, selectionSort, insertionSort, reset } = useSorting();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.play);
  function sortingStatus() {
    dispatch(playState(false));
  }
  
  function animate() {
    switch (props.method) {
      case "Bubble Sort":
        bubbleSort(tilesRef, array, sortingStatus);
        break;
      case "Insertion Sort":
        insertionSort(tilesRef, array, sortingStatus);
        break;
      case "Selection Sort":
        selectionSort(tilesRef, array, sortingStatus);
        break;
    }
  }

  useEffect(() => {
    if (state) {
      reset(tilesRef);
      dispatch(arrayState([...originalArray]));
      setTimeout(() => {
        animate();
      }, 500);
    }
  }, [state]);

  useEffect(() => {
    if (!state) {
      reset(tilesRef);
      dispatch(arrayState([...originalArray]));
    }
  }, [props.method]);

  useEffect(()=>{
    reset(tilesRef);
    setOriginalArray(array.slice())
  },[array])

  return (
    <>
      <div className="chart-tracer row">
        <div className="heading">Chart Tracer</div>
        <div className="col program">
          <div className="program row chart">
            {originalArray.map((v, i) => {
              return (
                <div
                  key={i}
                  ref={tilesRef.current[i]}
                  className="tile"
                  style={{ height: v * 3.5, transform: "translateX(0px)" }}
                >
                  {v}
                </div>
              );
            })}
          </div>
          <div className="row" style={{ textAlign: "center" }}>
            {array.map((v, i) => {
              return (
                <div key={i} className="index">
                  {i}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChartTracer;
