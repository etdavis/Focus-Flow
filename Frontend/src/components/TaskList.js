import { Task } from "@/components/Task";
import { NewTask } from "./NewTask";
import { useState, useEffect } from "react";

export function TaskList({ tasks, addTask, setTasks, handleDeleteTask }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [autoStartNext, setAutoStartNext] = useState(false);
    const [isRunning, setIsRunning] = useState(false);

    const moveTaskUp = (index) => {
        if (index === 0) return; // already at top

        const newTasks = [...tasks];
        [newTasks[index - 1], newTasks[index]] =
            [newTasks[index], newTasks[index - 1]];

        setTasks(newTasks);
    };

    const moveTaskDown = (index) => {
        if (index === tasks.length - 1) return; // already at bottom

        const newTasks = [...tasks];
        [newTasks[index], newTasks[index + 1]] =
            [newTasks[index + 1], newTasks[index]];

        setTasks(newTasks);
    };

    // If tasks change (task added/deleted)
    useEffect(() => {
        if (tasks.length === 0) return;
        // Always make the first task active when list changes
        setActiveIndex(0);
        setAutoStartNext(false);
    }, [tasks]);

    const handleTimerComplete = () => {
        if (activeIndex + 1 < tasks.length) {
            // Move to next timer and auto-start it
            setActiveIndex(i => i + 1);
            //setAutoStartNext(true);
        } else {
            // Finished last task → go back to first, but do NOT auto start
            setActiveIndex(0);
            //setAutoStartNext(false);
            setIsRunning(false);
        }
    };

    const handleManualStart = () => {
        // User clicked Play → allow cascade to auto-start next timers
        //setAutoStartNext(true);
        setIsRunning(true);
    };

    const updateTask = (id, updatedValues) => {
    const newTasks = tasks.map((task) =>
        task.id === id ? { ...task, ...updatedValues } : task
    );

    setTasks(newTasks);
    };


    return (
    <div className="task-list">
        <h2>Task List</h2>
        {tasks.map((task, idx) => (
            
            //Next two lines are equivalent
            //<Task id={task.id} title={task.title} timer={task.timer} key = {idx}/>
            <Task 
                {...task} 
                key={task.id}
                updateTask={updateTask}
                index={idx}
                moveUp={() => moveTaskUp(idx)}
                moveDown={() => moveTaskDown(idx)}
                isActive={idx === activeIndex}
                autoStart={idx === activeIndex && isRunning}
                onManualStart={handleManualStart}
                onComplete={handleTimerComplete}
                handleDeleteTask={handleDeleteTask}
                setActiveIndex={setActiveIndex}
            />
        ))}
        <h2>New Task</h2>
        <NewTask addTask={addTask}/>
    </div>
    );
}
