import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import '../common.css'

function LogsTracer({method}) {

  const logMessage = useSelector(state=>state.log);
  const state = useSelector(state=>state.play);
  const [logs,setLogs] = useState([logMessage])
  useEffect(()=>{
    setLogs([...logs,logMessage])
    let LogScreen = document.getElementById("logscreen");
    LogScreen.scrollTo({top:LogScreen.scrollHeight,behavior:"smooth"})
  },[logMessage])

  useEffect(()=>{
    state && setLogs(["is mounted"])
  },[state])

  useEffect(()=>{
    setLogs(["is mounted"])
  },[method])
  return (
    <>
      <div className="log-tracer row">
        <div className="heading">Logs Tracer</div>
        <div className="program" id="logscreen" style={{overflow:"scroll"}}>
            {logs.map((v,k)=>{
              return <>
                <div key={k}><span style={{color:"blue"}}>@{method}</span><span> {v}</span></div>
              </>
            })}
            
        </div>
      </div>
    </>
  );
}

export default LogsTracer;
