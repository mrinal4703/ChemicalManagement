import React, { useState } from 'react';
import {assess, inventory, orders, shedule, trackraw} from "../Assets/images";
import { Link } from "react-router-dom";
import { isLoggedIn, isLoggedIn_session, rank, rank_session } from "../data/constants";
import WelcomePage from "./WelcomePage";

const Dashboard = () => {
    console.log(localStorage.getItem('loggedinuserrank'));
    const [toggle, setToggle] = useState(false);

    const handleMenuItemClick = () => {
        setToggle(true);
    };

    return (
        (isLoggedIn || isLoggedIn_session) ? (
            <div>
                <h1 className={'text-3xl'}>Dashboard</h1>
                <hr className={'align-middle my-2 mx-auto w-5/6'}></hr>
                <div className={'flex flex-row gap-3 justify-evenly'}>
                    {(rank === 'CEO' || rank_session === 'CEO') && (
                        <>
                            <div className={'h-96 w-96'}>
                                <Link to="/ManageInventory" onClick={handleMenuItemClick}>
                                    <img className={'p-3'} src={inventory} alt="Inventory" />
                                    <h1 className={'text-lg'}>Inventory</h1>
                                </Link>
                            </div>
                            <div className={'h-96 w-96'}>
                                <Link to="/TrackOrderRawMaterials" onClick={handleMenuItemClick}>
                                    <img className={'p-3'} src={trackraw} alt="Track Raw Materials" />
                                    <h1 className={'text-lg'}>Track Raw Materials</h1>
                                </Link>
                            </div>
                            <div className={'h-96 w-96'}>
                                <Link to="/ScheduleProduction" onClick={handleMenuItemClick}>
                                    <img className={'p-3'} src={shedule} alt="Schedule Production" />
                                    <h1 className={'text-lg'}>Schedule Production</h1>
                                </Link>
                            </div>
                            <div className={'h-96 w-96'}>
                                <Link to="/AssessProduction" onClick={handleMenuItemClick}>
                                    <img className={'p-3'} src={assess} alt="Assess Production" />
                                    <h1 className={'text-lg'}>Assess Production</h1>
                                </Link>
                            </div>
                            <div className={'h-96 w-96'}>
                                <Link to="/CompanyOrders" onClick={handleMenuItemClick}>
                                    <img className={'p-3'} src={orders} alt="Orders from companies" />
                                    <h1 className={'text-lg'}>Orders from companies</h1>
                                </Link>
                            </div>
                        </>
                    )}
                    {(rank === 'Assesser' || rank_session === 'Assesser') && (
                        <>
                            <div className={'h-96 w-96'}>
                                <Link to="/ScheduleProduction" onClick={handleMenuItemClick}>
                                    <img className={'p-3'} src={shedule} alt="Schedule Production" />
                                    <h1 className={'text-lg'}>Schedule Production</h1>
                                </Link>
                            </div>
                            <div className={'h-96 w-96'}>
                                <Link to="/AssessProduction" onClick={handleMenuItemClick}>
                                    <img className={'p-3'} src={assess} alt="Assess Production" />
                                    <h1 className={'text-lg'}>Assess Production</h1>
                                </Link>
                            </div>
                        </>
                    )}
                    {(rank === 'Distributor' || rank_session === 'Distributor') && (
                        <>
                            <div className={'h-96 w-96'}>
                                <Link to="/CompanyOrders" onClick={handleMenuItemClick}>
                                    <img className={'p-3'} src={orders} alt="Orders from companies" />
                                    <h1 className={'text-lg'}>Orders from companies</h1>
                                </Link>
                            </div>
                        </>
                    )}
                    {(rank === 'Inventory Manager' || rank_session === 'Inventory Manager') && (
                        <>
                            <div className={'h-96 w-96'}>
                                <Link to="/ManageInventory" onClick={handleMenuItemClick}>
                                    <img className={'p-3'} src={inventory} alt="Inventory" />
                                    <h1 className={'text-lg'}>Inventory</h1>
                                </Link>
                            </div>
                            <div className={'h-96 w-96'}>
                                <Link to="/TrackOrderRawMaterials" onClick={handleMenuItemClick}>
                                    <img className={'p-3'} src={trackraw} alt="Track Raw Materials" />
                                    <h1 className={'text-lg'}>Track Raw Materials</h1>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        ) : (
            <WelcomePage />
        )
    );
};

export default Dashboard;
