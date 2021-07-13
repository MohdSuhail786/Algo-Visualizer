import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import play from "../../icons/play.png";
import speedometer from "../../icons/speedometer.png";
import shuffle from "../../icons/shuffle.png";
import restart from "../../icons/restart.png";
import { arrayState, navState, playState, speed } from "../../actions/index";
import "../common.css";
import MenuIcon from "./MenuIcon";

function Logo() {
  return <div className="logo">Algo Visualizer</div>;
}

function HeaderRight() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.play);
  const currentSpeed = useSelector((state) => state.speed);

  function handlePlayClick() {
    dispatch(playState(true));
    dispatch(navState(false));
  }

  function rI(max) {
    return Math.floor(Math.random() * (max - 7 + 1)) + 7;
  }

  function handleShuffleClick() {
    dispatch(arrayState([rI(60), rI(50), rI(40), rI(20), rI(50), rI(30)]));
  }

  return (
    <>
      <div className="header-right row">
        {!state && (
          <>
            <div class="tooltip">
              <span class="tooltiptext" style={{padding:0}}>
                <div className={`dropdown ${currentSpeed==1000?"active":""}`} onClick={()=>{dispatch(speed(1000))}}>Slow</div>
                <div className={`dropdown ${currentSpeed==500?"active":""}`} onClick={()=>{dispatch(speed(500))}}>Normal</div>
                <div className={`dropdown ${currentSpeed==200?"active":""}`} onClick={()=>{dispatch(speed(200))}}>Fast</div>
              </span>
              <img
                src={speedometer}
                style={{
                  width: 30,
                }}
              />
            </div>

            <div class="tooltip">
              <span class="tooltiptext">Randomize</span>
              <img
                src={shuffle}
                style={{
                  width: 20,
                }}
                onClick={handleShuffleClick}
              />
            </div>

            <div class="tooltip">
              <span class="tooltiptext">Play</span>
              <img
                src={play}
                style={{
                  width: 20,
                }}
                onClick={handlePlayClick}
              />
            </div>
          </>
        )}
        {
          state && <>
          <div class="tooltip">
              <span class="tooltiptext">Restart</span>
              <img
                src={restart}
                style={{
                  width: 20,
                }}
                onClick={()=>{window.location.reload()}}
              />
            </div>
          </>
        }
      </div>
    </>
  );
}

function NavBar({ sortMethod }) {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <>
      <div className="nav-bar col slide">
        {["Bubble Sort", "Selection Sort", "Insertion Sort"].map((v, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                history.push(v.replace(" ", "_"));
                window.location.reload()
                dispatch(navState(false));
              }}
              style={{
                cursor: "pointer",
                backgroundColor: sortMethod === v ? "gold" : "dodgerblue",
                color: sortMethod === v ? "black" : "white",
              }}
            >
              {v}
            </div>
          );
        })}
      </div>
    </>
  );
}

function Header({ sortMethod }) {
  return (
    <>
      <div className="header-container row">
        <MenuIcon />
        <Logo />
        <HeaderRight />
      </div>
      <NavBar sortMethod={sortMethod} />
    </>
  );
}

export default Header;
