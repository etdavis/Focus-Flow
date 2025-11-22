import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";

export function Task({ id, title, timer }) {
    return <div className="task">
        <h1>{title}</h1>
        <h1>{timer}</h1>
        <div className="icons">       
            <MdEdit className="edit-icon" size="1.3em"/>
            <MdDeleteForever className="delete-icon" size="1.3em"/>
        </div>

    </div>
}
