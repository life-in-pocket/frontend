import "../../assets/css/features/day-dashboard/EditForm.css"
import ProgresBar from "../../element/ProgresBar";


function EditForm() {
    return (
        <div className="edit-form-overlary" >
            <form>
                <h2>Edit Development Block</h2>
                <label>
                    Time spent (hours):
                    <input type="text" name="title" />
                </label>
                <ProgresBar />
            </form>
        </div>
    )
}

export default EditForm