import { MdDeleteForever, MdEdit } from "react-icons/md";
import { Timer } from "./Timer";

export function Task({ id, title, hours, minutes, seconds, isActive, onComplete, handleDeleteTask }) {
    const time = new Date();
    const totalSeconds = Number(seconds) + Number(minutes) * 60 + Number(hours) * 3600;
    time.setSeconds(time.getSeconds() + totalSeconds);

    return <div className="task">
        <h1>{title}</h1>
        <Timer 
            expiryTimestamp={time}
            startValue={totalSeconds}
            isActive={isActive}
            onComplete={onComplete}
        />
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
