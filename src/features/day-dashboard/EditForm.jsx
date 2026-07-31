import "../../assets/css/features/day-dashboard/EditForm.css"
import ProgresBar from "../../element/ProgresBar";


function EditForm({ onClose, title, time, target }) {
    return (
        <div className="edit-form-overlay" >
            <div className="edit-form">

                <div className="edit-form-close">
                    <a onClick={onClose}>
                        <svg className="edit-form-close" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </a>
                </div>
                
                <form>
                    <h2 className="edit-form-title">Editing Block</h2>

                    <div className="form-container block-title-container">
                        <label htmlFor="block-title">Title:</label>
                        <input type="text" id="block-title" name="block-title" defaultValue={title} />
                    </div>
                    
                    <div className="form-container block-time-container">
                        <label htmlFor="block-time">Time (hours):</label>
                        <input type="number" id="block-time" name="block-time" defaultValue={time} step="0.5" min="0" max="24" />
                    </div>

                    <div className="form-container block-target-container">
                        <label htmlFor="block-target">Target:</label>
                        <input type="number" id="block-target" name="block-target" defaultValue={target} step="0.5" min="0" max="24" />
                    </div>

                    <ProgresBar currentTime={time} targetTime={target} />

                    <div className="form-container block-buttons-container">
                        <button className="block-button btn-save" type="submit">Save</button>
                        <button className="block-button btn-delete" type="button">Delete</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditForm