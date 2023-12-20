import React from 'react';
import "../App.css";
import SleepTrack from "./SleepTrack";
import DreamTrack from "./DreamTrack";
import "./SunriseBack.css";
import {useEffect, useState} from "react";
export function  Home () {
  const [username, setUsername] = useState('');
     useEffect(() => {
        if(localStorage.getItem('access_token') === null){                   
            window.location.href = '/login'
        }
        else{
         (async () => {
           try {
            /*** https://drive.google.com/file/d/1BqKO1gakcb5xCSHrw0OfswDM8gae0SEg/view?usp=sharing */
             setUsername(localStorage.getItem('username'));
          } catch (e) {
            console.log('not auth')
          }
         })()};
     }, []);
    
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
      starsArr.push(<div key={i} style={{left: `${x}%`, top: `${y}%`}}></div>)
    }

    return (
      <>
      <h1 className="text-center" style={{marginTop: 1+"em"}}>Hi {username}, how terrible is your sleep?</h1>
      <div className="sky">
      <div className="sky__phase sky__dawn"></div>
      <div className="sky__phase sky__noon"></div>
      <div className="sky__phase sky__dusk"></div>
      <div className="sky__phase sky__midnight">
      <div id="sky__stars">
      {starsArr}
      </div>
      </div>
      <div className="orbit">
      <div className="sun"></div>
      <div className="moon"></div>
      </div>
      </div>

      <SleepTrack username={username}/>
      <DreamTrack username={username}/>
    </>
   );
 }