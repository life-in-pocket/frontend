import "../../assets/css/features/day-dashboard/EditForm.css"
import ProgresBar from "../../element/ProgresBar";


function EditForm({ onClose, title, time, target }) {
    return (
        <div className="edit-form-overlary" >
            <a onClick={onClose}>
                <svg className="edit-form-close" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </a>
            <form>
                <h2>Editing Block</h2>
                <label htmlFor="blok-title">Title:</label>
                <input type="text" id="blok-title" name="blok-title" defaultValue={title} />
                <label htmlFor="blok-time">Time (hours):</label>
                <input type="number" id="blok-time" name="blok-time" defaultValue={time} step="0.5" min="0" max="24" />
                <label htmlFor="blok-target">Target:</label>
                <input type="number" id="blok-target" name="blok-target" defaultValue={target} step="0.5" min="0" max="24" />
                <ProgresBar currentTime={time} targetTime={target} />
                <button type="submit">Save</button>
                <button type="button">Delete</button>
            </form>
        </div>
    )
}

export default EditForm