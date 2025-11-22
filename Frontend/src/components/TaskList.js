import { Task } from "@/components/Task";

export function TaskList({ tasks }) {
    return (
    <div className="task-list">
        <h2>Task List</h2>
        {tasks.map((task) => (
            <Task id={task.id} title={task.title} timer={task.timer}/>
        ))}
    </div>
    );
}
