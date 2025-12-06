"use client";
import { useState } from "react";
import { useEffect } from "react";
import { TaskList } from "@/components/TaskList";
import { nanoid } from "nanoid";

export default function Home() {
  const [tasks, setTasks] = useState([
    { 
      id: 0,
      title: "Sample Task 1",
      hours: 0,
      minutes: 0,
      seconds: 30
    },
    {
      id: 1,
      title: "Sample Task 2",
      hours: 0,
      minutes: 0,
      seconds: 30
    },
    {
      id: 2,
      title: "Sample Task 3",
      hours: 0,
      minutes: 0,
      seconds: 30
    },
  ]);
  
  function addTask(newTask) {
    newTask.id = tasks.length;
    setTasks([...tasks, newTask]);
  }
  
  function deleteTask(id) {
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

  /* if I decide to implement local storage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("react-app-focus-flow-data"));
    
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-app-focus-flow-data", JSON.stringify(tasks));
  }, [tasks]);
  */

  

  return (
    <div className="container">
      <h1>Container</h1>
      <TaskList tasks={tasks} 
        addTask={addTask}
        handleDeleteTask={deleteTask}
        />
    </div>
  )
  /*
  return (
    <div>
      <h2>Books from API</h2>
      {books.map((book) => (
        <div>
          <p>Title: {book.title}</p>
          <p>Author: {book.author}</p>
          <p>Quantity: {book.quantity}</p>
        </div>
      ))}
    </div>
  );
  */
}
