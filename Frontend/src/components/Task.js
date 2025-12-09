import { MdArrowUpward, MdArrowDownward, MdDeleteForever, MdEdit } from "react-icons/md";
import { Timer } from "./Timer";
import { useState } from "react";
import { EditModal} from "./EditModal";

export function Task({ id, title, hours, minutes, seconds, index, setActiveIndex, handleDeleteTask, updateTask, ...props }) {
    const [isEditing, setIsEditing] = useState(false);
    
    const time = new Date();
    const totalSeconds = Number(seconds) + Number(minutes) * 60 + Number(hours) * 3600;
    time.setSeconds(time.getSeconds() + totalSeconds);

    return (
        <div 
            className={`task ${props.isActive ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
            >
            
            <h1>{title}</h1>
            <Timer 
                expiryTimestamp={time}
                startValue={totalSeconds}
                {...props}
            />
            <div className="icons">       
                <button 
                    onClick={(e) => { 
                        e.stopPropagation(); 
                        setIsEditing(true); 
                    }}
                >
                    <MdEdit size="1.3em" />
                </button>
                <button 
                    onClick={(e) => { 
                        e.stopPropagation();
                        if (confirm("Are you sure you want to delete this task?")) {
                            handleDeleteTask(id);
                        }
                    }}
                >
                    <MdDeleteForever className="delete-icon" size="1.3em"/>
                </button>
                <div className="reorder-buttons">
                    <button onClick={(e) => { e.stopPropagation(); props.moveUp(); }}>
                        <MdArrowUpward size="1.3em"/>
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); props.moveDown(); }}>
                        <MdArrowDownward size="1.3em"/>
                    </button>
                </div>
            </div>
                {isEditing && (
                    <EditModal
                        id={id}
                        title={title}
                        hours={hours}
                        minutes={minutes}
                        seconds={seconds}
                        onClose={() => setIsEditing(false)}
                        onSave={(updated) => {
                            updateTask(id, updated);
                            setIsEditing(false);
                        }}
                    />
                )}
        </div>
    );
}
