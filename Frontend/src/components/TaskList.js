import { Task } from "@/components/Task";
import { NewTask } from "./NewTask";
import { useState } from "react";

export function TaskList({ tasks, addTask, handleDeleteTask }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleTimerComplete = () => {
        setActiveIndex((prev) => {
            if (prev + 1 < tasks.length) return prev + 1;
            return prev; // last task stays last
        });
    };

    return (
    <div className="task-list">
        <h2>Task List</h2>
        {tasks.map((task, idx) => (
            //Next two lines are equivalent
            //<Task id={task.id} title={task.title} timer={task.timer} key = {idx}/>
            <Task 
                {...task} 
                key = {idx}
                isActive={idx === activeIndex}
                onComplete={handleTimerComplete}
                handleDeleteTask={handleDeleteTask}
            />
        ))}
        <h2>New Task</h2>
        <NewTask addTask={addTask}/>
    </div>
    );
}
