import { MdDeleteForever } from "react-icons/md";
import { Timer } from "./Timer";

export function Task({ id, title, hours, minutes, seconds, isActive, autoStart, onManualStart, onComplete, handleDeleteTask }) {
    const time = new Date();
    const totalSeconds = Number(seconds) + Number(minutes) * 60 + Number(hours) * 3600;
    time.setSeconds(time.getSeconds() + totalSeconds);

    return <div className={`task ${isActive ? "active" : ""}`}>
        <h1>{title}</h1>
        <Timer 
            expiryTimestamp={time}
            startValue={totalSeconds}
            isActive={isActive}
            autoStart={autoStart}
            onManualStart={onManualStart}
            onComplete={onComplete}
        />
        <div className="icons">       
            <button onClick={() => handleDeleteTask(id)}>
                <MdDeleteForever className="delete-icon" size="1.3em"/>
            </button>
        </div>

    </div>
}
