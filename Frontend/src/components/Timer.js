import React from 'react';
import { useState, useEffect } from "react";
import { useTimer } from 'react-timer-hook';
import { MdPause, MdPlayArrow, MdReplay } from "react-icons/md";


export function Timer({ expiryTimestamp, startValue, isActive, onComplete }) {
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
            console.warn('Timer expired');
            onComplete();
        }, 
        interval: 20 
    });
    
    const autoStart = false;
    const startTime = startValue;

    useEffect(() => {
        if (isActive) {
            const time = new Date();
            time.setSeconds(time.getSeconds() + startValue);
            restart(time, true); // auto-start only the active timer
        } else {
            pause();
        }
    }, [isActive]);

  return (
    <div className="timer">
        <p>Seconds: {startTime}</p>
        <div className="timer-numbers">
            <span>{hours.toString().padStart(2, "0")}</span>:
                <span>{minutes.toString().padStart(2, "0")}</span>:
                <span>{seconds.toString().padStart(2, "0")}</span>
        </div>
        <p>{isRunning ? 'Running' : 'Not running'}</p>
        {isActive && (
            <div className="timer-buttons">
                <div>{!isRunning ? 
                    <button onClick={resume}>
                        <MdPlayArrow className="play-icon"/>
                    </button> :
                    <button onClick={pause}>
                        <MdPause className="pause-icon"/>
                    </button>}
                </div>
                
                <button onClick={() => {
                    // Restarts to 5 minutes timer
                    const time = new Date();
                    time.setSeconds(time.getSeconds() + startTime);
                    restart(time, autoStart)
                }}><MdReplay className="restart-icon"/></button>
            </div>
        )}
    </div>
  );
}