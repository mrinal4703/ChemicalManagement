import React, {useEffect, useState} from 'react';
import axios from "axios";
import {isLoggedIn, isLoggedIn_session} from "../data/constants";

const AssessProduction = () => {
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
        if(vola === 1){
            hazard = 'Physical';
        }

        else{
            if(toxic === 1){
                hazard = 'Health';
            }
            else{
                hazard = 'Environmental';
            }
        }

        let volatility = (vola === 1) ? 'Highly' : 'Least to none';
        let toxicity = (toxic === 1) ? 'Highly' : 'Least to none';
        let persistence = (persist === 1) ? 'Highly' : 'Least to none';

        let nature ='';
        let pH=Math.random() * 14;
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
        const updatedChemical = { ...chemicalToUpdate,
            assess: 'Assessed',
            expiry_date: expiry,
            hazarduous: hazard,
            nature: nature,
            pH: pH
        };
        const updatedChemical1 = { ...chemicalToUpdate,
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
        <div>
            <h1 className={'text-3xl my-2 '}>Assessment of production</h1>
            <hr className={'align-middle my-4 mx-auto w-5/6'}></hr>

            <div className="flex justify-center items-center my-10">
                <div className={'align-middle'}>
                    <table className="table-auto mx-auto">
                        <thead>
                        <tr>
                            <th className="px-4 py-2">Chemical name</th>
                            <th className="px-4 py-2">Quantity Produced expected</th>
                            <th className="px-4 py-2">Quantity of raw materials</th>
                            <th className="px-4 py-2">Production Date</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Assess</th>
                        </tr>
                        </thead>
                        <tbody>
                        {chemicalsList.length > 0 ? (
                            chemicalsList.map(chemical => (
                                <tr key={chemical.id}>
                                    <td className="border px-4 py-2">{chemical.name}</td>
                                    <td className="border px-4 py-2">{chemical.chemquantity} {chemical.quantity_type}</td>
                                    <td className="border px-4 py-2">{chemical.quantity} {chemical.quantity_type}</td>
                                    <td className="border px-4 py-2">
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
                                    <td className="border px-4 py-2">{chemical.assess}</td>
                                    {(isLoggedIn && chemical.assess?.match('pending')) || (isLoggedIn_session && chemical.assess?.match('pending')) ? (
                                        <td>
                                            <form onSubmit={(event) => handleAssessSubmit(event, chemical.id)}>
                                                <button className={'p-2 bg-blue-600 mt-4 text-white rounded-lg'}
                                                        type="submit">Assess
                                                </button>
                                            </form>
                                        </td>
                                    ) : <td className="border px-4 py-2">Is already ready</td>}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="border px-4 py-2" colSpan="5">No Data available currently!</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AssessProduction;