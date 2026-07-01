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
        </div>
    )
}

export default Sidebar