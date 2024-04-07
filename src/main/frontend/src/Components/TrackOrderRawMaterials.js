import React, {useEffect, useState} from 'react';
import Modal from "react-modal";
import {IoClose} from "react-icons/io5";
import axios from "axios";
import {email, email_session, isLoggedIn, isLoggedIn_session, rank, rank_session} from "../data/constants";
import {producedchemicals} from "../data";
import Dashboard from "./Dashboard";
import {TbInfoHexagon} from "react-icons/tb";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderWidth: '2px',
        borderColor: 'black',
        borderRadius: '16px',
    },
};

const Sidebar = ({ isOpen, onClose }) => {
    return (
        <div className={`fixed inset-y-0 right-0 w-96 bg-[#ededed] border-2 border-black text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition duration-300 ease-in-out`}>
            <div className="flex justify-between items-center mb-4">
                <div className={'text-black w-full'}>
                    <h1 className="text-xl">Information on</h1><h1 className="text-xl font-bold">Raw Material Tracking</h1>
                </div>
                <button className={'absolute text-black text-2xl top-3 right-3 '} onClick={onClose}><IoClose/></button>
            </div>
            <div className={'bg-white rounded-lg shadow-md mx-3 p-2 my-4'}>

            </div>
        </div>
    );
};

const TrackOrderRawMaterials = () => {

    // let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [rawmaterial_for, setRawmaterial_for] = useState('');
    const [providername, setProvidername] = useState('');
    const [orderedemail, setOrderedemail] = useState('');
    const [quantity, setQuantity] = useState(0);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const pend = "pending";
        // const timetaken = Math.floor(Math.random() * (1000 - 120 + 1)) + 120;
        // const minRandomSeconds = 120; // 2 minutes
        // const maxRandomSeconds = 300; // 5 minutes

        // Generate a random time interval between 120 and 300 seconds
        // const randomTimeInterval = Math.floor(Math.random() * (maxRandomSeconds - minRandomSeconds + 1)) + minRandomSeconds;

        const ordertime = new Date();
        // const finishtime = new Date(ordertime.getTime() + randomTimeInterval * 1000); // Adding milliseconds
        try {
            const response = await axios.post('http://localhost:8085/neworderforrawmaterials', { // Make a POST request to the sign-up endpoint
                rawmaterial_for: rawmaterial_for,
                ordertoemail: orderedemail,
                providerComp: providername,
                ordereremail: email_session,
                // rawmaterial_name: rawmaterial_name,
                quantity: quantity,
                // timetaken: Math.floor((finishtime.getTime() - ordertime.getTime()) / 1000), // Converting milliseconds to seconds
                track: pend,
                ordertime: ordertime,
                // finishtime: finishtime
            });
            closeModal();
            window.location.reload();
            console.log(response.data); // Log the response from the backend

        } catch (error) {
            console.error('Error ordering raw material up:', error);
        }

    };

    const [rawmaterialprovider, setRawmaterialprovider] = useState([]);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                let url = 'http://localhost:8085/rawmaterialproviderslist';
                const response = await axios.get(url);
                setRawmaterialprovider(response.data);
            } catch (error) {
                console.log('Error fetching provider:', error);
            }
        };

        fetchProviders();
    }, []);

    const [rawmaterialOrder, setRawmaterialOrder] = useState([]);
    // const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        const fetchRawMaterialReports = async () => {
            try {
                let url = 'http://localhost:8085/getrawmaterials';
                const response = await axios.get(url);
                setRawmaterialOrder(response.data);
            } catch (error) {
                console.error('Error fetching chemical reports:', error);
            }
        };

        fetchRawMaterialReports();
    }, []);
    return (
        ((isLoggedIn || isLoggedIn_session) && (rank === 'Inventory Manager' || rank_session === 'Inventory Manager') || (rank === 'CEO' || rank_session === 'CEO')) ? (
            <div>
                <button onClick={toggleSidebar}
                        className={`absolute z-10 right-0 px-4 ${isSidebarOpen ? 'hidden' : 'block'}`}>
                    <TbInfoHexagon className="text-3xl"/>
                </button>
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}/>
                <h1 className={'text-3xl my-4'}>Order and track the raw materials</h1>
                {/*<hr className={'align-middle my-4 mx-auto w-5/6'}></hr>*/}
                <div className="flex justify-center items-center my-4 rounded-lg shadow-md mx-3 bg-white">
                    <h1 className={'text-3xl my-2 p-2'}>Companies providing the raw materials</h1>
                    <div className={'align-middle p-2'}>
                        <table className="table-auto mx-auto">
                            <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 border border-solid border-black font-bold">Raw Material
                                    Provider's Name
                                </th>
                                <th className="px-4 py-2 border border-solid border-black font-bold">Company Name</th>
                                <th className="px-4 py-2 border border-solid border-black font-bold">Raw materials for
                                    Chemicals
                                </th>
                                <th className="px-4 py-2 border border-solid border-black font-bold">Provider's Email
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {rawmaterialprovider.length > 0 ? (
                                rawmaterialprovider.map(report => (
                                    <tr key={report.id} className="border border-solid border-black">
                                        <td className="border border-solid border-black px-4 py-2">{report.providername}</td>
                                        <td className="border border-solid border-black px-4 py-2">{report.providerComp}</td>
                                        <td className="border border-solid border-black px-4 py-2">{report.rawmaterialsname}</td>
                                        <td className="border border-solid border-black px-4 py-2">{report.provideremail}</td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border border-solid border-black px-4 py-2 font-bold">No
                                        Data available
                                        currently!
                                    </td>
                                </tr>
                            )}

                            </tbody>

                        </table>
                    </div>
                </div>
                <h1 className={'text-3xl my-2 '}>Track order</h1>
                <div className="w-fit justify-center items-center my-4 rounded-lg shadow-md mx-auto bg-white">
                    <div className={'align-middle p-2'}>
                        <table className="table-auto mx-auto">
                            <thead className="bg-gray-200">
                            <tr>
                                {/*<th className="px-4 py-2">Raw Material's Name</th>*/}
                                <th className="px-4 py-2 border border-solid border-black font-bold">Raw Material for
                                </th>
                                <th className="px-4 py-2 border border-solid border-black font-bold">Quantity</th>
                                <th className="px-4 py-2 border border-solid border-black font-bold">Order Date</th>
                                <th className="px-4 py-2 border border-solid border-black font-bold">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rawmaterialOrder.length > 0 ? (
                                rawmaterialOrder.map(report => (
                                    <tr key={report.id} className="border border-solid border-black">
                                        {email.match(report.ordereremail) || email_session.match(report.ordereremail) || (rank === 'CEO' || rank_session === 'CEO') ? (
                                            <>
                                                {/*<td className="border px-4 py-2">{report.rawmaterial_name}</td>*/}
                                                <td className="border border-solid border-black px-4 py-2">{report.rawmaterial_for}</td>
                                                <td className="border border-solid border-black px-4 py-2">{report.quantity}</td>
                                                <td className="border border-solid border-black px-4 py-2">
                                                    {(() => {
                                                        let time = new Date(report.ordertime);
                                                        let dateFormatOptions = {
                                                            month: 'long',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        };
                                                        let timeFormatOptions = {
                                                            hour: 'numeric',
                                                            minute: 'numeric',
                                                            hour12: true
                                                        };
                                                        let formattedDate = time.toLocaleDateString(undefined, dateFormatOptions);
                                                        let formattedTime = time.toLocaleTimeString(undefined, timeFormatOptions);
                                                        return `${formattedDate} ${formattedTime}`;
                                                    })()}
                                                </td>
                                                <td className="border border-solid border-black px-4 py-2">{report.track}</td>
                                            </>
                                        ) : (
                                            <td className="border border-solid border-black px-4 py-2 font-bold">No
                                                Data available
                                                currently!</td>)}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border border-solid border-black px-4 py-2 font-bold">No
                                        Data available currently!
                                    </td>
                                </tr>
                            )}

                            </tbody>

                        </table>
                    </div>
                </div>

                <button
                    className={'fixed right-4 bottom-4 px-5 py-4 rounded-2xl text-lg bg-green-700 shadow-md text-white border-0 '}
                    onClick={openModal}>Order Raw materials
                </button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 className="text-2xl mb-4">Order and track</h2>
                    <button className={'absolute top-3 right-3 '} onClick={closeModal}><IoClose/></button>
                    {/*<div>I am a modal</div>*/}
                    <form className={'my-5'} onSubmit={handleSubmit}>
                        <div className={'my-2'}>
                            <label className="block">Raw Materials provider's email:</label>
                            <select value={providername} className={'w-full'}
                                    onChange={(e) => setProvidername(e.target.value)}>
                                {rawmaterialprovider.map(raw => (
                                    <option key={raw.id} value={raw.provideremail}>{raw.providerComp}</option>
                                ))}
                            </select>
                        </div>
                        {/*<div className={'my-2'}>*/}
                        {/*    <label>Raw Material's Name:</label>*/}
                        {/*    <input*/}
                        {/*        type="text"*/}
                        {/*        value={rawmaterial_name}*/}
                        {/*        onChange={(e) => setRawmaterial_name(e.target.value)}*/}
                        {/*        required*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <input
                            type="text"
                            value={orderedemail}
                            name={'email'}
                            className={'hidden'}
                            onChange={(e) => setOrderedemail(e.target.value)}
                        />
                        <div className={'my-2'}>
                            <label className="block">Raw Materials for:</label>
                            <select value={rawmaterial_for} onChange={(e) => setRawmaterial_for(e.target.value)}>
                                {producedchemicals.map(raw => (
                                    <option key={raw.id} value={raw.name}>{raw.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className={'my-2'}>
                            <label className="block">Quantity:</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <button className={'p-2 bg-blue-600 mt-4 text-white rounded-lg'} type="submit">Submit</button>
                    </form>
                </Modal>
            </div>
        ) : (<Dashboard/>)
    )
        ;
};

export default TrackOrderRawMaterials;
