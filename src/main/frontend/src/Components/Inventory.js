import React, {useEffect, useState} from 'react';
import {FaRegFilePdf} from "react-icons/fa6";
import axios from "axios";
import {Link} from "react-router-dom";

const Inventory = () => {
    const [chemicalReports, setChemicalReports] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        const fetchChemicalReports = async () => {
            try {
                let url = 'http://localhost:8085/chemical-reports';
                if (selectedCategory !== 'all') {
                    url += `/${selectedCategory}`;
                }
                const response = await axios.get(url);
                setChemicalReports(response.data);
            } catch (error) {
                console.error('Error fetching chemical reports:', error);
            }
        };

        fetchChemicalReports();
    }, [selectedCategory]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };
    return (
        <div>
            <h1 className="text-4xl my-4 font-bold text-center text-gray-900">
                <button onClick={() => window.location.reload()}>
                    <span className="text-green-600">INVENTORY</span>
                </button>

            </h1>


            <hr className={'align-middle my-4 mx-auto w-5/6'}></hr>
            <div className={'flex flex-row gap-10 justify-evenly mt-10'}>
                <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-black"
                        onClick={() => window.location.reload()}>
                    <h1 className="text-lg font-bold">All</h1>
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => handleCategoryClick('Physical')}>
                    <h1 className="text-lg font-bold">Physical Hazardous</h1>
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={() => handleCategoryClick('Environmental')}>
                    <h1 className="text-lg font-bold">Environmental Hazardous</h1>
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleCategoryClick('Health')}>
                    <h1 className="text-lg font-bold">Health Hazardous</h1>
                </button>
                <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        onClick={() => handleCategoryClick('Least to none')}>
                    <h1 className="text-lg font-bold">Least to non Hazardous</h1>
                </button>

            </div>
            <div className="flex justify-center items-center my-10">
                <div className={'align-middle'}>
                    <table className="table-auto mx-auto">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 border border-solid border-black font-bold">Name</th>
                            <th className="px-4 py-2 border border-solid border-black font-bold">Hazard type</th>
                            <th className="px-4 py-2 border border-solid border-black font-bold">Nature</th>
                            <th className="px-4 py-2 border border-solid border-black font-bold">Expiry Date</th>
                            <th className="px-4 py-2 border border-solid border-black font-bold">pH Level</th>
                            <th className="px-4 py-2 border border-solid border-black font-bold">Quantity(present)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {chemicalReports.length > 0 ? (
                            chemicalReports.map(report => (
                                <tr key={report.id} className="border border-solid border-black">
                                    <td className="border border-solid border-black px-4 py-2">{report.name}</td>
                                    <td className="border border-solid border-black px-4 py-2">{report.hazarduous}</td>
                                    <td className="border border-solid border-black px-4 py-2">{report.nature}</td>
                                    <td className="border border-solid border-black px-4 py-2">{report.expiry_date}</td>
                                    <td className="border border-solid border-black px-4 py-2">{report.pH}</td>
                                    <td className="border border-solid border-black px-4 py-2">{report.quantity} {report.quantity_type}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="border border-solid border-black px-4 py-2 font-bold" colSpan="7">
                                    No Data available currently!
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>

                    {/*<table className="table-auto mx-auto">*/}
                    {/*    <thead>*/}
                    {/*    <tr>*/}
                    {/*        <th className="px-4 py-2">Name</th>*/}
                    {/*        <th className="px-4 py-2">Hazard type</th>*/}
                    {/*        <th className="px-4 py-2">Nature</th>*/}
                    {/*        <th className="px-4 py-2">Expiry Date</th>*/}
                    {/*        <th className="px-4 py-2">pH Level</th>*/}
                    {/*        <th className="px-4 py-2">Quantity(present)</th>*/}
                    {/*        <th className="px-4 py-2">Download Report</th>*/}
                    {/*    </tr>*/}
                    {/*    </thead>*/}
                    {/*    <tbody>*/}
                    {/*    {chemicalReports.length > 0 ? (*/}
                    {/*        chemicalReports.map(report => (*/}
                    {/*            <tr key={report.id}*/}
                    {/*                // onClick={() => handleClick(report.id)}*/}
                    {/*            >*/}
                    {/*                <td className="border px-4 py-2">{report.name}</td>*/}
                    {/*                <td className="border px-4 py-2">{report.hazarduous}</td>*/}
                    {/*                <td className="border px-4 py-2">{report.nature}</td>*/}
                    {/*                <td className="border px-4 py-2">{report.expiry_date}</td>*/}
                    {/*                <td className="border px-4 py-2">{report.pH}</td>*/}
                    {/*                <td className="border px-4 py-2">{report.quantity}</td>*/}
                    {/*                /!*<button>*!/*/}
                    {/*                /!*    <td className="border px-4 py-2"><FaRegFilePdf /></td>*!/*/}
                    {/*                /!*</button>*!/*/}
                    {/*                <button onClick={() => handleDownloadPDF(report.id)}>*/}
                    {/*                    <FaRegFilePdf/>*/}
                    {/*                </button>*/}
                    {/*            </tr>*/}
                    {/*        ))*/}
                    {/*    ) : (*/}
                    {/*        <tr>*/}
                    {/*            <td className="border px-4 py-2" colSpan="5">No Data available currently!</td>*/}
                    {/*        </tr>*/}
                    {/*        )}*/}
                    {/*    </tbody>*/}
                    {/*</table>*/}
                </div>
                <button
                    className={'fixed right-4 bottom-4 px-5 py-4 rounded-2xl text-lg bg-green-700 shadow-lg text-white border-0 '}>
                    <Link to="/CompanyOrders">
                        <h1 className={'text-lg'}>Back</h1>
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default Inventory;