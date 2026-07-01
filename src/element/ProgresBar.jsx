import "../assets/css/element/ProgresBar.css"

function ProgresBar({currentTime, targetTime}) {
    const progress = (currentTime / targetTime) * 100;

    return (
        <div className="progress">
            <div className="bar" style={{ width: `${Math.min(progress, 100)}%` }}></div>
        </div>
    )
}

export default ProgresBar