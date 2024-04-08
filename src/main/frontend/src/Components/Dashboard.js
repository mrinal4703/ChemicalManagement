import React, { useState } from 'react';
import {assess, chemord, inventory, orders, shedule, trackraw} from "../Assets/images";
import { Link } from "react-router-dom";
import { isLoggedIn, isLoggedIn_session, rank, rank_session } from "../data/constants";
import WelcomePage from "./WelcomePage";
import {TbInfoHexagon, TbPoint, TbPointFilled} from "react-icons/tb";
import {IoClose} from "react-icons/io5";
import {LiaUserCircle} from "react-icons/lia";
import {dashfo, inventorynfo} from "../data";

const Sidebar = ({ isOpen, onClose }) => {
    return (
        <div className={`fixed inset-y-0 right-0 w-96 bg-[#ededed] border-2 border-black text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition duration-300 ease-in-out`}>
            <div className="flex justify-between items-center mb-4">
                <div className={'text-black w-full'}>
                    <h1 className="text-xl">Information on</h1><h1 className="text-xl font-bold">Dashboard</h1>
                </div>
                <button className={'absolute text-black text-2xl top-3 right-3 '} onClick={onClose}><IoClose/></button>
            </div>
            <div className={'bg-white rounded-lg shadow-md mx-3 p-2 my-4'}>
                {dashfo.map(dash => (
                    <div key={dash.id} className={'text-black text-start'}>
                        <p><TbPointFilled className="text-black mr-2 inline-block"/> {dash.intro}</p><br/>
                        <p><TbPointFilled className="text-black mr-2 inline-block"/> {dash.body}</p>
                        <p><TbPoint className="text-black mx-2 inline-block"/> {dash.inveman}</p>
                        <p><TbPoint className="text-black mx-2 inline-block"/> {dash.asses}</p>
                        <p><TbPoint className="text-black mx-2 inline-block"/> {dash.distr}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MenuItem = ({ to, onClick, image, alt, title }) => (
    <div className="h-96 w-96 mb-8 bg-white shadow-lg rounded-lg mx-5 ">
        <Link to={to} onClick={onClick}>
            <img className="p-3" src={image} alt={alt} />
            <h1 className="text-lg">{title}</h1>
        </Link>
    </div>
);


const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    console.log(localStorage.getItem('loggedinuserrank'));
    const [toggle, setToggle] = useState(false);

    const handleMenuItemClick = () => {
        setToggle(true);
    };

    return (
        (isLoggedIn || isLoggedIn_session) ? (
            <div className={'my-4'}>
                <button onClick={toggleSidebar}
                        className={`absolute z-10 right-0 px-4 ${isSidebarOpen ? 'hidden' : 'block'}`}>
                    <TbInfoHexagon className="text-3xl"/>
                </button>
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}/>
                <h1 className={'text-3xl'}>Dashboard</h1>
                <hr className={'align-middle my-2 mx-auto w-5/6'}></hr>
                <div className={'flex flex-wrap justify-center mx-3'}>
                    {(rank === 'CEO' || rank_session === 'CEO') && (
                        <div className={'flex flex-wrap justify-center'}>
                            <MenuItem to="/ManageInventory" onClick={handleMenuItemClick} image={inventory}
                                      alt="Inventory" title="Inventory"/>
                            <MenuItem to="/TrackOrderRawMaterials" onClick={handleMenuItemClick} image={trackraw}
                                      alt="Track Raw Materials" title="Track Raw Materials"/>
                            <MenuItem to="/ScheduleProduction" onClick={handleMenuItemClick} image={shedule}
                                      alt="Schedule Production" title="Schedule Production"/>
                            <MenuItem to="/AssessProduction" onClick={handleMenuItemClick} image={assess}
                                      alt="Assess Production" title="Assess Production"/>
                            <MenuItem to="/CompanyOrders" onClick={handleMenuItemClick} image={orders}
                                      alt="Orders from companies" title="Orders from companies"/>
                        </div>
                    )}
                    {(rank === 'Assesser' || rank_session === 'Assesser') && (
                        <div className={'flex flex-wrap justify-center'}>
                            <MenuItem to="/ScheduleProduction" onClick={handleMenuItemClick} image={shedule}
                                      alt="Schedule Production" title="Schedule Production"/>
                            <MenuItem to="/AssessProduction" onClick={handleMenuItemClick} image={assess}
                                      alt="Assess Production" title="Assess Production"/>
                        </div>
                    )}
                    {(rank === 'Distributor' || rank_session === 'Distributor') && (
                        <div className={'flex flex-wrap justify-center'}>
                            <MenuItem to="/CompanyOrders" onClick={handleMenuItemClick} image={orders}
                                      alt="Orders from companies" title="Orders from companies"/>
                        </div>
                    )}
                    {(rank === 'Inventory Manager' || rank_session === 'Inventory Manager') && (
                        <div className={'flex flex-wrap justify-center'}>
                            <MenuItem to="/ManageInventory" onClick={handleMenuItemClick} image={inventory}
                                      alt="Inventory" title="Inventory"/>
                            <MenuItem to="/TrackOrderRawMaterials" onClick={handleMenuItemClick} image={trackraw}
                                      alt="Track Raw Materials" title="Track Raw Materials"/>
                        </div>
                    )}
                </div>
                <div className={'my-4 mb-10'}>
                    {(rank === 'CEO' || rank_session === 'CEO') && (
                        <Link to="/UserList">
                            <button className={'absolute flex flex-col left-3 text-lg'}>
                                <LiaUserCircle className={'items-center mx-auto text-6xl'}/>
                                <p>All users</p>
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        ) : (
            <WelcomePage/>
        )
    );
};

export default Dashboard;
