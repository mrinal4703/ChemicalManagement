import React, { useState } from 'react';
import {logo} from "../Assets/images";
import { Link, useNavigate } from "react-router-dom";
import {isLoggedIn, isLoggedIn_session, rank, rank_session} from "../data/constants";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

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

    const localStorageRank = localStorage.getItem('loggedinuserrank');
    const sessionStorageRank = sessionStorage.getItem('loggedinuserrank');
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loggedinuseremail');
        sessionStorage.removeItem('loggedinuseremail');
        // navigate('/Dashboard');
        window.location.reload();
        // if(rankk && (!rankk.match(rank1) || !rankk1.match(rank1))){
        //     navigate('/RawMaterialProvider');
        // }
        // else{
        //     navigate('/ProviderDashboard');
        // }
        rank1="";
        // console.log(rankk, rankk1);
        window.location.reload();
    };
    return (
        <div>
            {/*{rank1 && localStorage.getItem('loggedinuserrank').match(rank1) || rank1 && sessionStorage.getItem('loggedinuserrank').match(rank1) ?*/}
                <div className={'navbar-container'}>
                    <div className={'flex items-center justify-between mx-3'}>
                        <img className={'p-1 w-40 h-38'} src={logo} alt="Logo"/>

                        {/*<HiOutlineMenuAlt3 className="text-3xl" onClick={handleToggle}/>*/}
                        <ul className="flex items-center">
                            {isLoggedIn || isLoggedIn_session ? (
                                // <div className={'flex'}>
                                //     <li className="menuItem mx-2">
                                //         <Link to="/Dashboard" onClick={handleMenuItemClick}>Dashboard</Link>
                                //     </li>
                                //     <li className="menuItem mx-2" onClick={handleMenuItemClick}>
                                //         <Link to="/" onClick={handleLogout}>Logout</Link>
                                //     </li>
                                // </div>
                                <div className="flex">
                                    <li className="menuItem mx-2">
                                        <Link to="/Dashboard" onClick={handleMenuItemClick}
                                              className="text-blue-500 hover:text-blue-700 font-bold">Dashboard</Link>
                                    </li>
                                    <li className="menuItem mx-2" onClick={handleMenuItemClick}>
                                        <Link to="/" onClick={handleLogout}
                                              className="text-red-500 hover:text-red-700 font-bold">Logout</Link>
                                    </li>
                                </div>

                            ) : (
                                // <div className={'flex'}>
                                //     <li className="menuItem mx-2">
                                //         <Link to="/SignUp" onClick={handleMenuItemClick}>Dashboard</Link>
                                //     </li>
                                //     <li className="menuItem mx-2" onClick={handleMenuItemClick}>
                                //         <Link to="/SignUp" onClick={handleMenuItemClick}>Sign Up/Login</Link>
                                //     </li>
                                // </div>
                                <div className="flex">
                                    <li className="menuItem mx-2">
                                        <Link to="/Dashboard" onClick={handleMenuItemClick}
                                              className="text-blue-500 hover:text-blue-700 font-bold">Dashboard</Link>
                                    </li>
                                    <li className="menuItem mx-2" onClick={handleMenuItemClick}>
                                        <Link to="/SignUp" onClick={handleMenuItemClick}
                                              className="text-green-500 hover:text-green-700 font-bold">Sign
                                            Up/Login</Link>
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
