import React, {useEffect, useState} from 'react';
import axios from "axios";
import {email, email_session, isLoggedIn, isLoggedIn_session} from "../data/constants";
import {biodata, producedchemicals, rawbio, rawbio1} from "../data";
import {TbPointFilled} from "react-icons/tb";

const RawMaterialProviderDashboard = () => {
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

    console.log(rawmaterialprovider);

    const handleReadySubmit = async (event1, reportId) => {
        event1.preventDefault();
        const ready = "Ready"; // Make sure 'ready' is not enclosed in quotes
        try {
            const response = await axios.put(`http://localhost:8085/updatetrack/${reportId}?track=${ready}`);
            console.log(response);
            window.location.reload();
        } catch (error) {
            console.error('Error updating track:', error);
        }
    }

    console.log(email_session);
    console.log(email);

    // console.log(localStorage.getItem('loggedinuserrank'));

    return (
        <div>
            <h1 className={'text-3xl my-2 '}>Orders for Raw materials</h1>
            <div className={'bg-white mx-3 my-4 p-2 rounded-lg shadow-md'}>
                <h1 className={'text-3xl my-4'}>Seemsan Company Welcomes you!</h1>
                <h1 className={'text-lg my-1'}>{rawbio}</h1>
                <h1 className={'text-lg my-1'}>{rawbio1}</h1>
            </div>
            <hr className={'align-middle my-4 mx-auto w-5/6'}></hr>
            <div className="w-fit justify-center items-center mx-auto my-4 bg-white rounded-lg shadow-md p-3">
                <div className={'align-middle'}>
                    <table className="table-auto mx-auto">
                        <thead className="bg-gray-200">
                        <tr>
                            {/*<th className="px-4 py-2">Raw Material's Name</th>*/}
                            <th className="px-4 py-2 border border-solid border-black font-bold">Raw Material for</th>
                            <th className="px-4 py-2 border border-solid border-black font-bold">Quantity</th>
                            <th className="px-4 py-2 border border-solid border-black font-bold">Order Date</th>
                            <th className="px-4 py-2 border border-solid border-black font-bold">Status</th>
                            <th className="px-4 py-2 border border-solid border-black font-bold">Ready?</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rawmaterialOrder.map(report => (
                            <tr key={report.id} className="border border-solid border-black">
                                {email.match(report.providerComp) || email_session.match(report.providerComp) ? (
                                    <>
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
                                        {(isLoggedIn && report.track.match('pending')) || (isLoggedIn_session && report.track.match('pending')) ? (
                                            <td>
                                                <form
                                                    onSubmit={(event1) => handleReadySubmit(event1, report.id)}>
                                                    <input
                                                        type="number"
                                                        value={report.id}
                                                        name={'id'}
                                                        className={'hidden'}
                                                        required
                                                    />
                                                    <button
                                                        className={'p-2 bg-blue-600 mt-4 text-white rounded-lg'}
                                                        type="submit">Ready?
                                                    </button>
                                                </form>
                                            </td>
                                        ) : <td className="border border-solid border-black px-4 py-2">Is already
                                            ready</td>}
                                    </>
                                ) : null
                                    //     (
                                    //     <td className="border px-4 py-2" colSpan="5">No Data available currently!</td>
                                    // )
                                }
                            </tr>
                        ))}

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default RawMaterialProviderDashboard;