import { useState, useEffect } from "react";

export function EditModal({ id, title, hours, minutes, seconds, onClose, onSave }) {
    const [newTitle, setNewTitle] = useState(title);
    const [newHours, setNewHours] = useState(hours);
    const [newMinutes, setNewMinutes] = useState(minutes);
    const [newSeconds, setNewSeconds] = useState(seconds);

    const [errors, setErrors] = useState([]);
    const [isValid, setIsValid] = useState(true);

    const [submitted, setSubmitted] = useState(false);

    const parseNumber = (value) => {
        if (value === "" || value === null) return "";
        return Number(value);
    };

    useEffect(() => {
        validate();
    }, [newTitle, newHours, newMinutes, newSeconds]);

    const validate = () => {
        const errs = [];

        if (!newTitle.trim()) {
            errs.push("Title cannot be empty.");
        }

        const h = parseNumber(newHours);
        const m = parseNumber(newMinutes);
        const s = parseNumber(newSeconds);

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

        if (!hasPositive) {
            errs.push("At least one time field must contain a positive number.");
        }

        setErrors(errs);
        setIsValid(errs.length === 0);
    };

    const handleSubmit = () => {
        setSubmitted(true);  // ← show errors now

        if (!isValid) return;

        onSave({
            title: newTitle.trim(),
            hours: newHours === "" ? 0 : Number(newHours),
            minutes: newMinutes === "" ? 0 : Number(newMinutes),
            seconds: newSeconds === "" ? 0 : Number(newSeconds)
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Edit Task</h2>

                {/* Only show errors AFTER submit attempt */}
                {submitted && errors.length > 0 && (
                    <div className="modal-errors">
                        {errors.map((err, idx) => (
                            <p key={idx} className="error-text">{err}</p>
                        ))}
                    </div>
                )}

                <label>Title</label>
                <input 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />

                <label>Hours</label>
                <input 
                    type="number" 
                    value={newHours} 
                    onChange={(e) => setNewHours(e.target.value)} 
                />

                <label>Minutes</label>
                <input 
                    type="number" 
                    value={newMinutes} 
                    onChange={(e) => setNewMinutes(e.target.value)} 
                />

                <label>Seconds</label>
                <input 
                    type="number" 
                    value={newSeconds} 
                    onChange={(e) => setNewSeconds(e.target.value)} 
                />

                <div className="modal-buttons">
                    <button
                        className="save" 
                        onClick={handleSubmit}
                    >Save</button>
                    <button 
                        className="cancel"
                        onClick={onClose}
                    >Cancel</button>
                </div>
            </div>
        </div>
    );
}
