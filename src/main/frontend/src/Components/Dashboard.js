import React, {useState} from 'react';
import {assess, inventory, orders, shedule, trackraw} from "../Assets/images";
import {Link} from "react-router-dom";

const Dashboard = () => {
    console.log(localStorage.getItem('loggedinuserrank'));
    const [toggle, setToggle] = useState(false);
    // const handleToggle = () => {
    //     setToggle(!toggle);
    // };
    console.log(toggle);

    const handleMenuItemClick = () => {
        setToggle(true);
    };
    return (
        <div>

        <h1 className={'text-3xl'}>Dashboard</h1>
        <hr className={'align-middle my-2 mx-auto w-5/6'}></hr>
        <div className={'grid grid-cols-4 gap-3'}>
            <div>
                <Link to="/ManageInventory" onClick={handleMenuItemClick}>
                    <img className={'p-3'} src={inventory}/>
                    <h1 className={'text-lg'}>Inventory</h1>
                </Link>
            </div>
            <div>
            <Link to="/TrackOrderRawMaterials" onClick={handleMenuItemClick}>
                    <img className={'p-3'} src={trackraw}/>
                    <h1 className={'text-lg'}>Track Raw Materials</h1>
                </Link>
            </div>
            <div>
                <Link to="/ScheduleProduction" onClick={handleMenuItemClick}>
                    <img className={'p-3'} src={shedule}/>
                    <h1 className={'text-lg'}>Schedule Production</h1>
                </Link>
            </div>
            <div>
                <Link to="/AssessProduction" onClick={handleMenuItemClick}>
                    <img className={'p-3'} src={assess}/>
                    <h1 className={'text-lg'}>Assess Production</h1>
                </Link>
            </div>
            <div>
                <Link to="/CompanyOrders" onClick={handleMenuItemClick}>
                    <img className={'p-3'} src={orders}/>
                    <h1 className={'text-lg'}>Orders from companies</h1>
                </Link>
            </div>
            {/*<div>*/}
            {/*<Link to="/ManageInventory" onClick={handleMenuItemClick}>*/}
            {/*        <img className={'p-3'} src={inventory}/>*/}
            {/*    </Link>*/}
            {/*</div>*/}


        </div>
    </div>);
};

export default Dashboard;