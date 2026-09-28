import '../assets/css/components/Sidebar.css'

function Sidebar() {

    return (
        <div className="sidebar">
            <h1 className="sidebar-title">Pocket</h1>
            <ul className="sidebar-list">
                <li className="sidebar-item">Day</li>
                <li className="sidebar-item">Analysis</li>
                <li className="sidebar-item">Media</li>
            </ul>

            <div className="sidebar-account">
                <svg className="img-user-logo" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                </svg>
                <span className="username">qqwz4tyfifi</span>
            </div>
        </div>
    )
}

export default Sidebar