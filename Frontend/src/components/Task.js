import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";

export function Task({ id, title, timer, handleDeleteTask }) {
    return <div className="task">
        <h1>{title}</h1>
        <h1>{timer}</h1>
        <div className="icons">       
            <button type="submit">
                <MdEdit className="edit-icon" size="1.3em"/>
            </button>
            <button onClick={() => handleDeleteTask(id)}>
                <MdDeleteForever className="delete-icon" size="1.3em"/>
            </button>
        </div>

    </div>
}
