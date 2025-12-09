"use client";
import { useState } from "react";
import { useEffect } from "react";
import { TaskList } from "@/components/TaskList";

export default function Home() {
  
  const [tasks, setTasks] = useState([
    
  ]);
  
  const addTask = (newTask) => {
    newTask.id = Date.now().toString();
    setTasks([...tasks, newTask]);
  }
  
  const deleteTask = (id) => {
    const newTasks = tasks.filter((task)=> task.id !== id)
    setTasks(newTasks);
  }

  /*commented out until backend is ready
  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((data) => data.json())
      .then((data) => {
        setTasks(data);
      })
  }, []);
  */

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("react-app-focus-flow-data"));
    
    if (savedTasks) {
      setTasks(savedTasks);
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
