import React, {useEffect, useState} from 'react';
import axios from "axios";
import {isLoggedIn, isLoggedIn_session, rank, rank_session} from "../data/constants";
import Dashboard from "./Dashboard";
import {TbInfoHexagon, TbPointFilled} from "react-icons/tb";
import {concl, Persistence, PhExplanation, Toxicity, Volatility} from "../data";
import {IoClose} from "react-icons/io5";

const Sidebar = ({ isOpen, onClose }) => {
    return (
        <div className={`fixed inset-y-0 right-0 w-96 bg-[#ededed] border-2 border-black text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition duration-300 ease-in-out`}>
            <div className="flex justify-between items-center mb-4">
                <div className={'text-black w-full'}>
                    <h1 className="text-xl">Information on</h1><h1 className="text-xl font-bold">Assess Production</h1>
                </div>
                <button className={'absolute text-black text-2xl top-3 right-3 '} onClick={onClose}><IoClose/></button>
            </div>
            <div className={'bg-white rounded-lg shadow-md mx-3 p-2 my-4'}>

            </div>
        </div>
    );
};

const AssessProduction = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const [chemicalsList, setChemicalsList] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8085/getAllChemicals')
            .then(response => {
                setChemicalsList(response.data);
            })
            .catch(error => {
                console.error('Error fetching chemicals', error);
            })
    }, []);

    const handleAssessSubmit = async (event1, chemicalId) => {
        event1.preventDefault();
        let hazard = '';

        let vola = Math.round(Math.random());
        let toxic = Math.round(Math.random());
        let persist = Math.round(Math.random());
        if (vola === 0 && toxic === 0 && persist === 0) {
            hazard = 'Least to none';
        }
        if (vola === 1) {
            hazard = 'Physical';
        } else {
            if (toxic === 1) {
                hazard = 'Health';
            } else {
                hazard = 'Environmental';
            }
        }

        let volatility = (vola === 1) ? 'Highly' : 'Least to none';
        let toxicity = (toxic === 1) ? 'Highly' : 'Least to none';
        let persistence = (persist === 1) ? 'Highly' : 'Least to none';

        let nature = '';
        let pH = Math.random() * 14;
        if (pH < 7.0) {
            if (pH < 3.5) {
                nature = "Highly Acidic";
            } else {
                nature = "Acidic";
            }
        } else {
            if (pH < 10.5) {
                nature = "Basic";
            } else {
                nature = "Highly Basic";
            }
        }
        const expiry = new Date(Date.now() + Math.floor(Math.random() * (5 * 365 * 24 * 60 * 60 * 1000)) + (5 * 365 * 24 * 60 * 60 * 1000));
        const chemicalToUpdate = chemicalsList.find(chemical => chemical.id === chemicalId);
        const updatedChemical = {
            ...chemicalToUpdate,
            assess: 'Assessed',
            expiry_date: expiry,
            hazarduous: hazard,
            nature: nature,
            pH: pH
        };
        const updatedChemical1 = {
            ...chemicalToUpdate,
            expiry_date: expiry,
            hazarduous: hazard,
            nature: nature,
            pH: pH,
            volatility: volatility,
            toxicity: toxicity,
            persistence: persistence
        };
        try {
            const response = await axios.put(`http://localhost:8085/updateChemical/${chemicalId}`, updatedChemical);
            const response1 = await axios.put(`http://localhost:8085/updateChemicalReport/${chemicalId}`, updatedChemical1);
            console.log(response);
            console.log(response1);
            window.location.reload();
        } catch (error) {
            console.error('Error updating chemical:', error);
        }
    }

    return (
        ((isLoggedIn || isLoggedIn_session) && (rank === 'Assesser' || rank_session === 'Assesser') || (rank === 'CEO' || rank_session === 'CEO')) ? (
            <div>
                <button onClick={toggleSidebar}
                        className={`absolute z-10 right-0 px-4 ${isSidebarOpen ? 'hidden' : 'block'}`}>
                    <TbInfoHexagon className="text-3xl"/>
                </button>
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <h1 className={'text-3xl my-4'}>Assessment of production</h1>
                {/*<hr className={'align-middle my-4 mx-auto w-5/6'}></hr>*/}

                <div className="flex justify-center items-center bg-white rounded-lg shadow-md mx-3 p-2 my-4">
                    <div className={'align-middle'}>
                        <table className="table-auto mx-auto">
                            <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 border border-solid border-black font-bold">Chemical name</th>
                                <th className="px-4 py-2 border border-solid border-black font-bold">Quantity Produced
                                    expected
                                </th>
                                <th className="px-4 py-2 border border-solid border-black font-bold">Quantity of raw
                                    materials
                                </th>
                                <th className="px-4 py-2 border border-solid border-black font-bold">Production Date
                                </th>
                                <th className="px-4 py-2 border border-solid border-black font-bold">Status</th>
                                <th className="px-4 py-2 border border-solid border-black font-bold">Assess</th>
                            </tr>
                            </thead>
                            <tbody>
                            {chemicalsList.length > 0 ? (
                                chemicalsList.map(chemical => (
                                    <tr key={chemical.id} className="border border-solid border-black">
                                        <td className="border border-solid border-black px-4 py-2">{chemical.name}</td>
                                        <td className="border border-solid border-black px-4 py-2">{chemical.chemquantity} {chemical.quantity_type}</td>
                                        <td className="border border-solid border-black px-4 py-2">{chemical.quantity} {chemical.quantity_type}</td>
                                        <td className="border border-solid border-black px-4 py-2">
                                            {(() => {
                                                let time = new Date(chemical.production_date);
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
                                        <td className="border border-solid border-black px-4 py-2">{chemical.assess}</td>
                                        {(isLoggedIn && chemical.assess?.match('pending')) || (isLoggedIn_session && chemical.assess?.match('pending')) ? (
                                            <td>
                                                <form onSubmit={(event) => handleAssessSubmit(event, chemical.id)}>
                                                    <button className={'p-2 bg-blue-600 mt-4 text-white rounded-lg'}
                                                            type="submit">Assess
                                                    </button>
                                                </form>
                                            </td>
                                        ) : <td className="border border-solid border-black px-4 py-2">Is already
                                            ready</td>}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border border-solid border-black px-4 py-2 font-bold">No Data
                                        available currently!
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={'bg-white rounded-lg shadow-md mx-3 p-2 my-4'}>
                    <h1 className={'text-2xl font-bold my-4'}>This is how assessment is done for a chemical</h1>
                    <div className={'grid grid-cols-2 gap-3'}>
                        <div>
                            <h2 className="text-xl font-bold mb-4">On Volatility, Toxicity and Persistency</h2>
                            <div className="mb-8">
                                <Volatility/>
                                <Toxicity/>
                                <Persistence/>
                                <p className="mb-4">{concl}</p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-4">On pH Levels</h2>
                            <div className="mb-8">
                                <PhExplanation/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (<Dashboard/>)
    );
};

export default AssessProduction;