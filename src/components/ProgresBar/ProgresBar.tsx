function ProgresBar({currentTime, targetTime}: {currentTime: number, targetTime: number}) {
    const progress = (currentTime / targetTime) * 100;

    return (
        <div className="w-full border-2 border-dark rounded-3xl bg-[#b0b2ce]">
            <div className="w-1/4 rounded-3xl h-8 bg-second-accent" style={{ width: `${Math.min(progress, 100)}%` }}></div>
        </div>
    )
}

export default ProgresBar