"use client";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import {MdAdd} from "react-icons/md";



export function NewTask({ addTask }) {
    const [title, setTitle] = useState("");
    const [timer, setTimer] = useState("");
    const characterLimit = 40;

    function handleTitleChange( event ) {
        if(characterLimit - event.target.value.length >= 0) {
            setTitle(event.target.value);
        }
    }

    function handleTimerChange( event ) {
        setTimer(event.target.value);
    }

    function handleSubmit( event ) {
        event.preventDefault();
        // Add logic to handle form submission
        const newTask = {
            id: null,
            title: title,
            timer: timer
        }
        addTask(newTask);
        setTitle("");
        setTimer("");
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
        <input 
            className="text-input" 
            value={timer}
            onChange={handleTimerChange}
            placeholder="Timer (HH:MM:SS)" 
            required
        ></input>
        <div className="icons">       
            <button type="submit">
                <MdAdd className="add-icon" size="1.3em"/>
            </button>
            <button >
                <MdDeleteForever className="delete-icon" size="1.3em"/>
            </button>
        </div>
    </form>
    );
}
