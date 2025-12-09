import { useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";

export function NewTask({ addTask }) {
    const [title, setTitle] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");

    const [errors, setErrors] = useState([]);
    const [isValid, setIsValid] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const parseNumber = (value) => (value === "" ? "" : Number(value));

    useEffect(() => {
        validate();
    }, [title, hours, minutes, seconds]);

    const validate = () => {
        const errs = [];

        if (!title.trim()) errs.push("Title cannot be empty.");

        const h = parseNumber(hours);
        const m = parseNumber(minutes);
        const s = parseNumber(seconds);

        const fields = [
            { label: "Hours", value: h },
            { label: "Minutes", value: m },
            { label: "Seconds", value: s }
        ];

        fields.forEach(({ label, value }) => {
            if (value === "") return;
            if (isNaN(value)) errs.push(`${label} must be a number.`);
            else if (value < 0) errs.push(`${label} cannot be negative.`);
            else if (!Number.isInteger(value)) errs.push(`${label} must be a whole number.`);
        });

        if (m !== "" && m >= 60) errs.push("Minutes must be less than 60.");
        if (s !== "" && s >= 60) errs.push("Seconds must be less than 60.");

        const hasPositive =
            (h !== "" && h > 0) ||
            (m !== "" && m > 0) ||
            (s !== "" && s > 0);

        if (!hasPositive) errs.push("At least one time field must contain a positive number.");

        setErrors(errs);
        setIsValid(errs.length === 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true); // show errors now

        if (!isValid) return;

        addTask({
            title: title.trim(),
            hours: hours === "" ? 0 : Number(hours),
            minutes: minutes === "" ? 0 : Number(minutes),
            seconds: seconds === "" ? 0 : Number(seconds)
        });

        setTitle("");
        setHours("");
        setMinutes("");
        setSeconds("");
        setSubmitted(false); // reset after successful add
    };

    return (
        <div className="new-task">
            {/* Errors only show AFTER user tries to submit */}
                {submitted && errors.length > 0 && (
                    <div className="modal-errors">
                        {errors.map((err, idx) => (
                            <p key={idx} className="error-text">{err}</p>
                        ))}
                    </div>
                )}
            <form className="task-form" onSubmit={handleSubmit}>
                <input 
                    className="text-input" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task Title"
                />

                <div className="time-input">
                    <input 
                        className="hours"
                        type="number"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        placeholder="H"
                    />

                    <input 
                        className="minutes" 
                        type="number"
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
                        placeholder="M"
                    />

                    <input 
                        className="seconds" 
                        type="number"
                        value={seconds}
                        onChange={(e) => setSeconds(e.target.value)}
                        placeholder="S"
                    />
                </div>

                <div className="icons">
                    <button type="submit">
                        <MdAdd className="add-icon" />
                    </button>
                </div>

            </form>
        </div>
    );
}
