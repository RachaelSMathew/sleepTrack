import React from 'react';
import "../App.css";
import SleepTrack from "./SleepTrack";
import DreamTrack from "./DreamTrack";
import "./SunriseBack.css";
const Home = () => {
  const settings = {
    canvas: {
      canvasFillSpace: true,
      useBouncyWalls: false
    },
    particle: {
      particleCount: 90,
      color: 'yellow',
      minSize: 2,
      maxSize: 5,
      maxOpacity: 1
    },
    velocity: {
      directionAngle: 0,
      directionAngleVariance: 360,
      minSpeed: 0.2,
      maxSpeed: 0.2
    },
    opacity: {
      minOpacity: 0,
      maxOpacity: 0.5,
      opacityTransitionTime: 3000
    }
  }
  const stars = 100;
  const starsArr = []
  // Generate stars randomly using absolute position
    for (let i = 0; i < stars; i++) {
      let x = Math.floor(Math.random() * 100 + 1);
      let y = Math.floor(Math.random() * 100 + 1);
      starsArr.push(<div style={{left: `${x}%`, top: `${y}%`}}></div>)
    }

    return (
      <>
      <h1 class="text-center" style={{marginTop: 1+"em"}}>How terrible is your sleep?</h1>
      <div class="sky">
      <div class="sky__phase sky__dawn"></div>
      <div class="sky__phase sky__noon"></div>
      <div class="sky__phase sky__dusk"></div>
      <div class="sky__phase sky__midnight">
      <div id="sky__stars">
      {starsArr}
      </div>
      </div>
      <div class="orbit">
      <div class="sun"></div>
      <div class="moon"></div>
      </div>
      </div>

      <SleepTrack />
      <DreamTrack />
    </>
   );
 };
 
 export default Home;
