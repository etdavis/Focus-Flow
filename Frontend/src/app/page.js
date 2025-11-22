"use client";
import { useEffect } from "react";
import { useState } from "react";
import { TaskList } from "@/components/TaskList";
import { nanoid } from "nanoid";

export default function Home() {
  const [tasks, setTasks] = useState([
    { 
      id: nanoid(),
      title: "Sample Task 1",
      timer: "00:25:00"
    },
    {
      id: nanoid(),
      title: "Sample Task 2",
      timer: "00:15:00"
    },
    {
      id: nanoid(),
      title: "Sample Task 3",
      timer: "00:10:00"
    },
  ]);

  /*commented out until backend is ready
  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((data) => data.json())
      .then((data) => {
        setTasks(data);
      })
  }, []);
  */

  return (
    <div className="container">
      <h1>Container</h1>
      <TaskList tasks={tasks}/>
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
