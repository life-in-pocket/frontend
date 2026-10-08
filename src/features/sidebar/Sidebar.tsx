import { getUser } from '../../api/tasks';
import { deleteToken } from '../../api/tokenStorage'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Sidebar.css';

function Sidebar() {

    const [username, setUsername] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        getUser()
            .then(user => setUsername(user.username))
            .catch((err) => {console.error(err)})
    }, [])

    const exitAccount = () => {
        deleteToken();
        navigate("/login");
    }

    return (
        <div className="sidebar">
            <h1 className="sidebar-title">Pocket</h1>
            <ul className="sidebar-list">
                <li className="sidebar-item" onClick={() => navigate("/pocket")}>
                    Tasks
                </li>
                <li className="sidebar-item" onClick={() => navigate("/statistics")}>
                    Statistics
                </li>
                <li className="sidebar-item">Media</li>
            </ul>

            <div className="sidebar-account">
                <svg className="img-user-logo" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                </svg>
                <span className="username">{username}</span>
                <a onClick={exitAccount} className="exit-account">
                    <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                </a>
            </div>
        </div>
    )
}

export default Sidebar;