import { Task } from "@/components/Task";
import { NewTask } from "./NewTask";
import { useState, useEffect } from "react";

export function TaskList({ tasks, addTask, setTasks, handleDeleteTask }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const moveTaskUp = (index) => {
        if (index === 0) return;

        const newTasks = [...tasks];
        [newTasks[index - 1], newTasks[index]] =
            [newTasks[index], newTasks[index - 1]];

        setTasks(newTasks);
        /* api demonstration
        fetch("http://localhost:8080/tasks/reorder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTasks)
        });
        */
    };

    const moveTaskDown = (index) => {
        if (index === tasks.length - 1) return;

        const newTasks = [...tasks];
        [newTasks[index], newTasks[index + 1]] =
            [newTasks[index + 1], newTasks[index]];

        setTasks(newTasks);
        /* api demonstration
        fetch("http://localhost:8080/tasks/reorder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTasks)
        });
        */
    };

    useEffect(() => {
        if (tasks.length === 0) return;
        setActiveIndex(0);
    }, [tasks]);

    const handleTimerComplete = () => {
        if (activeIndex + 1 < tasks.length) {
            setActiveIndex(i => i + 1);
        } else {
            setActiveIndex(0);
            setIsRunning(false);
        }
    };

    const handleManualStart = () => {
        setIsRunning(true);
    };

    const updateTask = (id, updatedValues) => {
    const newTasks = tasks.map((task) =>
        task.id === id ? { ...task, ...updatedValues } : task
    );

    setTasks(newTasks);
    /* api demonstration
    fetch("http://localhost:8080/tasks/:id", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedValues)
    });
    */
    };


    return (
    <div className="task-list">
        <h2>Task List</h2>
        {tasks.map((task, idx) => (            
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
