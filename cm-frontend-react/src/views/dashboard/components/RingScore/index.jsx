import React from "react";

const cleanPercentage = (percentage) => {
  const tooLow = !Number.isFinite(+percentage) || percentage < 0;
  const tooHigh = percentage > 100;
  return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

const Circle = ({ colour, pct, r }) => {
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct) * circ) / 100;
  return (
    <circle
      r={r}
      cx={180}
      cy={180}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
      strokeWidth={"1.8rem"}
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};


const Text = ({ percentage, y, score, tcolor }) => {
  return (
    <text   
      x="50%"
      y={y}
      fill = {tcolor}
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={"1.3em"}
      textAlign ={"center"}
      fontFamily = {"sans-serif"}
      
    >
      {score} 
      {percentage.toFixed(0)}
    </text>
  );
};


const RingScore = ({ percentage, colour, progressdata,targetdata}) => {

  const { swimming, running, cycling } = percentage
  const pct = cleanPercentage(percentage);
  
  return (
    <div style={{height: 300, width: "100%"}}>
    {/* <div>
    <h2 style={{fontSize: 10}}>TSS Score </h2>
    
    </div> */}
    <svg width="100%" height="100%" viewBox="0 0 360 360">
     
      <g transform={`rotate(-90 ${"180 180"})`}>
       
        <Circle colour={"lightgrey"} r={90}/>
        <Circle colour={"#F67126"} pct={cycling} r={90}/>
        
        <Circle colour={"lightgrey"} r={120}/>
        <Circle colour={"#8469D6"} pct={running} r={120}/>

        <Circle colour={"lightgrey"} r={150}/>
        <Circle colour={"#0F83FF"} pct={swimming} r={150}/>
        

      </g>
      <text x="50%" y="38%" dominantBaseline="central" textAnchor="middle" textAlign ={"center"} fontSize={"1.3em"}>Score</text>
      <Text percentage={swimming} y="44%" score="Swimming: " tcolor="#0F83FF"/>
      <Text percentage={running} y="50%" score="Running: " tcolor="#8469D6"/>
      <Text percentage={cycling} y="56%" score="Cycling: " tcolor="#F67126"/>
      
    </svg>
  
    </div>
  );
};

export default RingScore;


