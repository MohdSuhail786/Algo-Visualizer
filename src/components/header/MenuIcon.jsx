import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { navState } from "../../actions";

function MenuIcon() {
  let lineRef = React.useRef([...new Array(3)].map(() => React.createRef()));
  const open = useSelector(state=>state.nav)
  const dispatch = useDispatch()

  function animateIcon() {
    if (  open) {
      lineRef.current[0].current.style.transform = "rotate(-40deg)";
      lineRef.current[2].current.style.transform = "rotate(40deg)";
      lineRef.current[0].current.style.width = "14px";
      lineRef.current[1].current.style.borderRadius = "20px";
      lineRef.current[2].current.style.width = "14px";
      document.body.style.position = "fixed"
    } else {
      lineRef.current[0].current.style.transform = "rotate(0deg)";
      lineRef.current[2].current.style.transform = "rotate(0deg)";
      lineRef.current[1].current.style.borderRadius = "0px";
      lineRef.current[0].current.style.width = "20px";
      lineRef.current[2].current.style.width = "20px";
      document.body.style.position = ""
    }
  }

  function animateNavBar() {
    let nav = document.getElementsByClassName("nav-bar")[0];
    if (open) {
        nav.classList.remove("slide")
    }
    else {
        nav.classList.add("slide")
    }
  }

  function handleClick() {
    dispatch(navState(!open?true:false));
  }

  useEffect(()=>{
    
      animateIcon();
      animateNavBar();
  
  },[open])

  return (
    <>
      <div className="col menu-icon" onClick={handleClick}>
        <div ref={lineRef.current[0]} className="line"></div>
        <div ref={lineRef.current[1]} className="line"></div>
        <div ref={lineRef.current[2]} className="line"></div>
      </div>
    </>
  );
}

export default MenuIcon;
