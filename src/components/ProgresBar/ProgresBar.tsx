import "./ProgresBar.css"

function ProgresBar({currentTime, targetTime}: {currentTime: number, targetTime: number}) {
    const progress = (currentTime / targetTime) * 100;

    return (
        <div className="progress">
            <div className="bar" style={{ width: `${Math.min(progress, 100)}%` }}></div>
        </div>
    )
}

export default ProgresBar