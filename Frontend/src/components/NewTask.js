"use client";
import { useState } from "react";
import {MdAdd} from "react-icons/md";


export function NewTask({ addTask }) {
    const [title, setTitle] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");
    const characterLimit = 40;
    const timerLimit = 60

    function handleTitleChange( event ) {
        if(characterLimit - event.target.value.length >= 0) {
            setTitle(event.target.value);
        }
    }

    function handleHourChange( event ) {
        if(event.target.value < timerLimit) {
            setHours(event.target.value);
        }
    }

    function handleMinuteChange( event ) { 
        if(event.target.value < timerLimit) {
            setMinutes(event.target.value);
        }
    }
    
    function handleSecondChange( event ) {
        if(event.target.value < timerLimit) {
            setSeconds(event.target.value);
        }
    }

    function handleSubmit( event ) {
        event.preventDefault();
        // Add logic to handle form submission
        const newTask = {
            id: null,
            title: title,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
        addTask(newTask);
        setTitle("");
        setHours("");
        setMinutes("");
        setSeconds("");
    }

    return (
    <form className="task-form"
        onSubmit={handleSubmit}>
        <input 
            className="text-input" 
            value={title}
            onChange={handleTitleChange}
            placeholder="Task Title" 
            required
        ></input>
        <div className="time-input">
            <input 
                className="hours"
                type="number" 
                value={hours}
                onChange={handleHourChange}
                placeholder="H" 
            ></input>
                <input 
                className="minutes" 
                type="number"
                value={minutes}
                onChange={handleMinuteChange}
                placeholder="M" 
            ></input>
                <input 
                className="seconds" 
                type="number"
                value={seconds}
                onChange={handleSecondChange}
                placeholder="S" 
            ></input>
        </div>
        <div className="icons">       
            <button type="submit">
                <MdAdd className="add-icon"/>
            </button>
        </div>
    </form>
    );
}
