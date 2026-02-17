export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
    if (!open) return null;

    return (
        <div className="confirm-overlay">
            <div className="confirm-box">
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="confirm-actions">
                    <button className="btn btn-cancel" onClick={onCancel}>No</button>
                    <button className="btn btn-reschedule" onClick={onConfirm}>Yes</button>
                </div>
            </div>
        </div>
    );
}
