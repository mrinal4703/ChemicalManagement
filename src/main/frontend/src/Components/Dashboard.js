import React, { useState } from 'react';
import { assess, inventory, orders, shedule, trackraw } from "../Assets/images";
import { Link } from "react-router-dom";
import { rank, rank_session } from "../data/constants";

const Dashboard = () => {
    console.log(localStorage.getItem('loggedinuserrank'));
    const [toggle, setToggle] = useState(false);

    const handleMenuItemClick = () => {
        setToggle(true);
    };

    return (
        <div>
            <h1 className={'text-3xl'}>Dashboard</h1>
            <hr className={'align-middle my-2 mx-auto w-5/6'}></hr>
            <div className={'flex flex-row gap-3 justify-evenly'}>
                { (rank === 'CEO' || rank_session === 'CEO') && (
                    <>
                        <div className={'h-96 w-96'}>
                            <Link to="/ManageInventory" onClick={handleMenuItemClick}>
                                <img className={'p-3'} src={inventory}/>
                                <h1 className={'text-lg'}>Inventory</h1>
                            </Link>
                        </div>
                        <div className={'h-96 w-96'}>
                            <Link to="/TrackOrderRawMaterials" onClick={handleMenuItemClick}>
                                <img className={'p-3'} src={trackraw}/>
                                <h1 className={'text-lg'}>Track Raw Materials</h1>
                            </Link>
                        </div>
                        <div className={'h-96 w-96'}>
                            <Link to="/ScheduleProduction" onClick={handleMenuItemClick}>
                                <img className={'p-3'} src={shedule}/>
                                <h1 className={'text-lg'}>Schedule Production</h1>
                            </Link>
                        </div>
                        <div className={'h-96 w-96'}>
                            <Link to="/AssessProduction" onClick={handleMenuItemClick}>
                                <img className={'p-3'} src={assess}/>
                                <h1 className={'text-lg'}>Assess Production</h1>
                            </Link>
                        </div>
                        <div className={'h-96 w-96'}>
                            <Link to="/CompanyOrders" onClick={handleMenuItemClick}>
                                <img className={'p-3'} src={orders}/>
                                <h1 className={'text-lg'}>Orders from companies</h1>
                            </Link>
                        </div>
                    </>
                )}
                { (rank === 'Assesser' || rank_session === 'Assesser') && (
                    <>
                        <div className={'h-96 w-96'}>
                            <Link to="/ScheduleProduction" onClick={handleMenuItemClick}>
                                <img className={'p-3'} src={shedule}/>
                                <h1 className={'text-lg'}>Schedule Production</h1>
                            </Link>
                        </div>
                        <div className={'h-96 w-96'}>
                            <Link to="/AssessProduction" onClick={handleMenuItemClick}>
                                <img className={'p-3'} src={assess}/>
                                <h1 className={'text-lg'}>Assess Production</h1>
                            </Link>
                        </div>
                    </>
                )}
                { (rank === 'Distributor' || rank_session === 'Distributor') && (
                    <>
                        <div className={'h-96 w-96'}>
                            <Link to="/CompanyOrders" onClick={handleMenuItemClick}>
                                <img className={'p-3'} src={orders}/>
                                <h1 className={'text-lg'}>Orders from companies</h1>
                            </Link>
                        </div>
                    </>
                )}
                { (rank === 'Inventory Manager' || rank_session === 'Inventory Manager') && (
                    <>
                        <div className={'h-96 w-96'}>
                            <Link to="/ManageInventory" onClick={handleMenuItemClick}>
                                <img className={'p-3'} src={inventory}/>
                                <h1 className={'text-lg'}>Inventory</h1>
                            </Link>
                        </div>
                        <div className={'h-96 w-96'}>
                            <Link to="/TrackOrderRawMaterials" onClick={handleMenuItemClick}>
                                <img className={'p-3'} src={trackraw}/>
                                <h1 className={'text-lg'}>Track Raw Materials</h1>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
