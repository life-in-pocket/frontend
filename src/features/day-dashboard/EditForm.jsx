import "../../assets/css/features/day-dashboard/EditForm.css"
import ProgresBar from "../../element/ProgresBar";


function EditForm({ onClose, title, setTitle, time, setTime, target, setTarget }) {

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }
    
    const handleTimeChange = (event) => {
        setTime(event.target.value);
    }

    const handleTargetChange = (event) => {
        setTarget(event.target.value);  
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onClose();
    }

    return (
        <div className="edit-form-overlay" >
            <div className="edit-form">

                <div className="edit-form-close">
                    <button 
                        onClick={(event) => {
                            event.stopPropagation();
                            onClose();
                        }
                        }
                        type="button"
                        className="edit-form-close-button"
                        >
                        <svg className="edit-form-close-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <h2 className="edit-form-title">Editing Block</h2>

                    <div className="form-container block-title-container">
                        <label htmlFor="block-title">Title:</label>
                        <input className="form-input" 
                        type="text" 
                        id="block-title" 
                        name="block-title" 
                        defaultValue={title}
                        onChange={handleTitleChange} />
                    </div>
                    
                    <div className="form-container block-time-container">
                        <label htmlFor="block-time">Time (hours):</label>
                        <input className="form-input" 
                        type="number" 
                        id="block-time" 
                        name="block-time"
                        defaultValue={time} 
                        step="0.5" 
                        min="0" 
                        max="24"
                        onChange={handleTimeChange} />
                    </div>

                    <div className="form-container block-target-container">
                        <label htmlFor="block-target">Target:</label>
                        <input 
                        className="form-input" 
                        type="number" 
                        id="block-target" 
                        name="block-target" 
                        defaultValue={target} 
                        step="0.5" 
                        min="0" 
                        max="24" 
                        onChange={handleTargetChange}/>
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