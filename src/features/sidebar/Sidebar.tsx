import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../../api/tasks';
import { deleteToken } from '../../api/tokenStorage';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `cursor-pointer transition-colors hover:text-(--second-accent-color) ${
        isActive ? 'text-(--second-accent-color)' : ''
    }`;

function Sidebar() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getUser()
            .then((user) => setUsername(user.username))
            .catch((err) => console.error(err));
    }, []);

    const handleLogout = () => {
        deleteToken();
        navigate('/login', { replace: true });
    };

    return (
        <aside className="sticky top-0 flex h-screen w-full flex-col gap-4 bg-(--bg-sidebar) px-20 py-12 text-[3rem] text-white">
            <h1 className="pb-16 font-bold">Pocket</h1>

            <nav aria-label="Головна навігація">
                <ul className="flex flex-col gap-4">
                    <li>
                        <NavLink to="/pocket" className={navLinkClass}>
                            Tasks
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/statistics" className={navLinkClass}>
                            Statistics
                        </NavLink>
                    </li>
                    <li>
                        <span aria-disabled="true" className="cursor-not-allowed opacity-50">
                            Media
                        </span>
                    </li>
                </ul>
            </nav>

            <div className="mt-auto flex items-center justify-between gap-4 text-[2rem]">
                <div className="flex min-w-0 items-center gap-4">
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        className="size-10 shrink-0 rounded-full bg-(--dark)"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                    </svg>
                    <span className="truncate">{username}</span>
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    aria-label="Вийти з акаунта"
                    title="Вийти"
                    className="shrink-0 cursor-pointer rounded-md transition-colors hover:text-(--second-accent-color) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--second-accent-color)"
                >
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        className="size-8"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;