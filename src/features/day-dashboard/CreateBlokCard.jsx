import "../../assets/css/features/day-dashboard/CreateBlokCard.css"


function CreateBlokCard({ onAdd }) {

    return (
        <div className="create-blok-card" onClick={onAdd}>
            <svg className="create-blok-card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1V23M1 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    );
}

export default CreateBlokCard;