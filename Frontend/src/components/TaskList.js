import { Task } from "@/components/Task";
import { NewTask } from "./NewTask";

export function TaskList({ tasks, addTask, handleDeleteTask }) {
    return (
    <div className="task-list">
        <h2>Task List</h2>
        {tasks.map((task, idx) => (
            //Next two lines are equivalent
            //<Task id={task.id} title={task.title} timer={task.timer} key = {idx}/>
            <Task 
                {...task} 
                key = {idx}
                handleDeleteTask={handleDeleteTask}
            />
        ))}
        <h2>New Task</h2>
        <NewTask addTask={addTask}/>
    </div>
    );
}
