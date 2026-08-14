import "../assets/css/element/Calendar.css";

function Calendar({sellectedDate, setSellectedDate}) {

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const mounths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return (
        <div className="calendar">
            <div className="calendar-header">
                <h3 className="calendar-title">Choose Date</h3>
                <p>{weekdays[sellectedDate.getDay()]} {mounths[sellectedDate.getMonth()]} {sellectedDate.getYear()}</p>
            </div>
            
            <div className="calendar-body">
                <div className="calendar-table">
                    {
                        weekdays.map((day) => {
                            return <div className="weekday" key={day}><p>{day}</p></div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Calendar