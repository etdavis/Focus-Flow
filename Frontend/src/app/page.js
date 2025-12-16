"use client";
import { useState } from "react";
import { useEffect } from "react";
import { TaskList } from "@/components/TaskList";

export default function Home() {
  
  const [tasks, setTasks] = useState([]);
  
  const addTask = (newTask) => {
    newTask.id = Date.now().toString();
    setTasks([...tasks, newTask]);
    /* api demonstration
    fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask)
    }); 
    */
  }
  
  const deleteTask = (id) => {
    const newTasks = tasks.filter((task)=> task.id !== id)
    setTasks(newTasks);
    /* api demonstration
    fetch("http://localhost:8080/tasks/:id", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task) //won't work without a restructure
    });
    */
  }

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("react-app-focus-flow-data"));
    
    if (savedTasks) {
      setTasks(savedTasks);
      /* api demonstration
      savedTasks.map((task) => {
        fetch("http://localhost:8080/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task)
        });
    });
      */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-app-focus-flow-data", JSON.stringify(tasks));
    
  }, [tasks]);
    

  return (
    <div className="container">
      <h1>Focus Flow</h1>
      <TaskList tasks={tasks} 
        addTask={addTask}
        handleDeleteTask={deleteTask}
        setTasks={setTasks}
        />
    </div>
  )
}
