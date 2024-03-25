import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {isLoggedIn, isLoggedIn_session, rank, rank_session} from "../data/constants";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import {logo} from "../Assets/images";

const NavBar = () => {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);

    const handleClick = () => {
        // Redirect to "/Notifications" route
        navigate('/Dashboard');
        window.location.reload()
    };

    const handleToggle = () => {
        setToggle(!toggle);
    };

    const handleMenuItemClick = () => {
        setToggle(true);
    };
    let rank1="Raw materials provider";
    let rank2="Company";

    const localStorageRank = localStorage.getItem('loggedinuserrank');
    const sessionStorageRank = sessionStorage.getItem('loggedinuserrank');

    console.log(localStorageRank);
    console.log(sessionStorageRank, "Hello");
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loggedinuseremail');
        sessionStorage.removeItem('loggedinuseremail');
        navigate('/');
        window.location.reload();
        rank1="";
        window.location.reload();
    };
    return (
        <div>
            {/*{rank1 && localStorage.getItem('loggedinuserrank').match(rank1) || rank1 && sessionStorage.getItem('loggedinuserrank').match(rank1) ?*/}
                <div className={'navbar-container'}>
                    <div className={'flex items-center justify-between mx-3'}>
                        <Link to="/" onClick={handleMenuItemClick}><img className={'w-40'} src={logo}/></Link>
                        {/*<HiOutlineMenuAlt3 className="text-3xl" onClick={handleToggle}/>*/}
                        <ul className="flex items-center">
                            {isLoggedIn || isLoggedIn_session ? (
                                <div className={'flex'}>
                                    <li className="menuItem mx-2">
                                        {rank1 && (localStorage.getItem('loggedinuserrank').match(rank1) || sessionStorage.getItem('loggedinuserrank').match(rank1)) ? (
                                            <Link to="/ProviderDashboard" onClick={handleMenuItemClick}>Dashboard</Link>
                                        ) : rank2 && (localStorage.getItem('loggedinuserrank').match(rank2) || sessionStorage.getItem('loggedinuserrank').match(rank2)) ? (
                                            <Link to="/CompanyDashboard" onClick={handleMenuItemClick}>Dashboard</Link>
                                        ) : (
                                            <Link to="/Dashboard" onClick={handleMenuItemClick}>Dashboard</Link>
                                        )}
                                    </li>

                                    <li className="menuItem mx-2" onClick={handleMenuItemClick}>
                                        <Link to="/" onClick={handleLogout}>Logout</Link>
                                    </li>
                                </div>
                            ) : (
                                <div className={'flex'}>
                                    <li className="menuItem mx-2">
                                        <Link to="/SignUp" onClick={handleMenuItemClick}>Dashboard</Link>
                                    </li>
                                    <li className="menuItem mx-2" onClick={handleMenuItemClick}>
                                        <Link to="/SignUp" onClick={handleMenuItemClick}>Sign Up/Login</Link>
                                    </li>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
            {/*: (*/}
            {/*    <div className={'navbar-container'}>*/}
            {/*        <div className={'flex items-center justify-between mx-3'}>*/}
            {/*            <h1 className={'md:text-2xl'}>ABCD</h1>*/}
            {/*            /!*<HiOutlineMenuAlt3 className="text-3xl" onClick={handleToggle}/>*!/*/}
            {/*            <ul className="flex items-center">*/}
            {/*                {isLoggedIn || isLoggedIn_session ? (*/}
            {/*                    <div className={'flex'}>*/}
            {/*                        <li className="menuItem mx-2">*/}
            {/*                            <Link to="/Dashboard" onClick={handleMenuItemClick}>Dashboard</Link>*/}
            {/*                        </li>*/}
            {/*                        <li className="menuItem mx-2" onClick={handleMenuItemClick}>*/}
            {/*                            <Link to="/" onClick={handleLogout}>Logout</Link>*/}
            {/*                        </li>*/}
            {/*                    </div>*/}
            {/*                ) : (*/}
            {/*                    <div className={'flex'}>*/}
            {/*                        <li className="menuItem mx-2">*/}
            {/*                            <Link to="/SignUp" onClick={handleMenuItemClick}>Dashboard</Link>*/}
            {/*                        </li>*/}
            {/*                        <li className="menuItem mx-2" onClick={handleMenuItemClick}>*/}
            {/*                            <Link to="/SignUp" onClick={handleMenuItemClick}>Sign Up/Login</Link>*/}
            {/*                        </li>*/}
            {/*                    </div>*/}
            {/*                )}*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default NavBar;
