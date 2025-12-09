import React from 'react';
import { useState, useEffect } from "react";
import { useTimer } from 'react-timer-hook';
import { MdPause, MdPlayArrow, MdReplay } from "react-icons/md";


export function Timer({ expiryTimestamp, startValue, ...props }) {
    const playSound = () => {
        const audio = new Audio("/sounds/timer-terminer-342934.mp3"); 
        audio.play().catch(err => console.log("Audio play error:", err));
    };
    
    const {
        totalSeconds,
        milliseconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp,
        autoStart: false,
        onExpire: () => {
            playSound();
            props.onComplete();
        }, 
        interval: 20 
    });
    
    //const autoStart = false;
    const startTime = startValue;

    useEffect(() => {
        if (props.isActive) {
            const time = new Date();
            time.setSeconds(time.getSeconds() + startValue);
            restart(time, props.isActive && props.autoStart); // auto-start only the active timer
        } else {
            pause();
        }
    }, [props.isActive, props.autoStart, startValue, expiryTimestamp, restart, pause]);

    const handlePlayClick = () => {
        props.onManualStart();  // enable cascade
        resume();         // start this timer
    };

  return (
    <div className="timer">
        <div className="timer-numbers">
            <span>{hours.toString().padStart(2, "0")}</span>:
                <span>{minutes.toString().padStart(2, "0")}</span>:
                <span>{seconds.toString().padStart(2, "0")}</span>
        </div>
        
        {props.isActive && (
            <div className="timer-buttons">
                <div>{!isRunning ? 
                    <button onClick={handlePlayClick}>
                        <MdPlayArrow className="play-icon"/>
                    </button> :
                    <button onClick={pause}>
                        <MdPause className="pause-icon"/>
                    </button>}
                </div>
                
                <button onClick={() => {
                    
                    const time = new Date();
                    time.setSeconds(time.getSeconds() + startTime);
                    restart(time, false)
                }}><MdReplay className="restart-icon"/></button>
            </div>
        )}
    </div>
  );
}