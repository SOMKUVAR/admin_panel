import { Link } from "react-router-dom";
import SUPER_ADMIN_LINKS from "../constants/super_links";
import ADMIN_LINKS from "../constants/admin_links";

const LeftSideBar = (props) => {
    const { isOpenLeftSidebar } = props;
    const user_type_id = JSON.parse(localStorage.getItem("admin")).user_type_id;
    const LINKS = user_type_id === 1 ? SUPER_ADMIN_LINKS : ADMIN_LINKS;
    
    return (
        <div
            className={`z-[50] ${!isOpenLeftSidebar && "ml-[-260px]"
                } w-[250px] transition-[0.3s] min-h-[calc(100vh-65px)] top-0 bg-red-900 font-semibold text-white`}
        >
            <ul className="px-5 flex flex-col justify-center pt-10 text-sm">
                {LINKS.map((link) => (
                    <li key={link.name} className="cursor-pointer mt-3">
                        {
                            !link.title &&
                            <Link to={`.${link.to}`}>
                                <div className="flex items-center">
                                    <link.Icon />
                                    <span className="ml-1.5">{link.name}</span>
                                </div>
                            </Link>
                        }
                        {
                            link.title &&
                            <div className="flex items-center">
                                <span >{link.title}</span>
                            </div>
                        }
                        {link.subLinks &&
                            (
                                <ul className="px-4 flex flex-col justify-center text-sm mt-1">
                                    {link.subLinks.map((link) => (
                                        <li key={link.name} className="cursor-pointer mt-1">
                                            <Link to={`.${link.to}`}>
                                                <div className="flex items-center">
                                                    <link.Icon />
                                                    <span className="ml-1.5">{link.name}</span>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeftSideBar;
