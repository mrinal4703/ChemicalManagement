import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import axios from "axios";
import {hazard} from "../data";
import {IoClose} from "react-icons/io5";
// import {useNavigate} from "react-router-dom";
import {FaRegFilePdf} from "react-icons/fa6";
import jsPDF from "jspdf";
import {logo} from "../Assets/images";
import {isLoggedIn, isLoggedIn_session, rank, rank_session} from "../data/constants";
import Dashboard from "./Dashboard";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
const ManageInventory = ({onToggleManageInventory}) => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [name, setName] = useState('');
    // const [chemcode, setChemcode] = useState('');
    const [hazarduous, setHazarduous] = useState('');
    let nature = '';
    const [quantity, setQuantity] = useState(0);
    const [expdate, setExpdate] = useState('');
    const [pH, setPh] = useState(0);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
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

            const response = await axios.post('http://localhost:8085/newreport', { // Make a POST request to the sign-up endpoint
                name: name,
                // chemcode: chemcode,
                hazarduous: hazarduous,
                pH: pH,
                nature: nature,
                expiry_date: expdate,
                quantity: quantity
            });
            closeModal();
            window.location.reload();
            console.log(response.data); // Log the response from the backend

        } catch (error) {
            console.error('Error signing up:', error);
        }

    };

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

    // const navigate = useNavigate();
    // // const handleClick = (id) => {
    // //     navigate(`/Report/${id}`);
    // // };

    const handleDownloadPDF = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8085/getreport/${id}`);
            const chemicalReport = response.data;
            let name = '';

            const pdf = new jsPDF();
            chemicalReport.forEach(report => {
                name = report.name;
                pdf.addImage(logo, 'JPEG', 60, 10, 100, 50);
                pdf.text(20, 70, `Name: ${report.name}`);
                pdf.text(20, 80, `Expiry: ${report.expiry_date}`);
                pdf.text(20, 90, `Hazarduous: ${report.hazarduous}`);
                pdf.text(20, 100, `Nature: ${report.nature}`);
                pdf.text(20, 110, `pH: ${report.pH}`);
                pdf.text(20, 120, `Production Date: ${report.production_date}`);
                pdf.text(20, 130, `Quantity: ${report.quantity} ${report.quantity_type}`);
                pdf.text(20, 140, `Quantity Type: ${report.quantity_type}`);
                pdf.text(20, 150, `Volatility: ${report.volatility}`);
                pdf.text(20, 160, `Persistence: ${report.persistence}`);
                pdf.text(20, 170, `Toxicity: ${report.toxicity}`);
                // pdf.addPage();
            });

            pdf.save(`${name} Report for Seemsan.pdf`);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

    const handleDownloadPDF1 = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8085/getreport/${id}`);
            const chemicalReport = response.data;
            let name = '';

            const pdf = new jsPDF();
            chemicalReport.forEach(report => {
                name = report.name;
                pdf.addImage(logo, 'JPEG', 60, 10, 100, 50);
                pdf.text(20, 70, 'Company Name');
                pdf.text(20, 80, `Name: ${report.name}`);
                pdf.text(20, 90, `Expiry: ${report.expiry_date}`);
                pdf.text(20, 100, `Hazarduous: ${report.hazarduous}`);
                pdf.text(20, 110, `Nature: ${report.nature}`);
                pdf.text(20, 120, `pH: ${report.pH}`);
                pdf.text(20, 130, `Volatility: ${report.volatility}`);
                pdf.text(20, 140, `Persistence: ${report.persistence}`);
                pdf.text(20, 150, `Toxicity: ${report.toxicity}`);
                // pdf.addPage();
            });

            pdf.save(`${name}.pdf`);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };


    return (
        ((isLoggedIn || isLoggedIn_session) && (rank === 'Inventory Manager' || rank_session === 'Inventory Manager') || (rank === 'CEO' || rank_session === 'CEO')) ? (
            <div>
                {/*<h1 className={'text-3xl my-2 '}>MANAGE INVENTORY</h1>*/}
                <h1 className="text-4xl my-4 font-bold text-center text-gray-900">
                    <span className="text-yellow-600">MANAGE</span>{" "}
                    <span className="text-green-600">INVENTORY</span>
                </h1>


                <hr className={'align-middle my-4 mx-auto w-5/6'}></hr>
                <div className={'flex flex-row gap-10 justify-evenly mt-10'}>
                    <button className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-black"
                            onClick={() => window.location.reload()}>
                        <h1 className="text-lg font-bold">All</h1>
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                            onClick={() => handleCategoryClick('Physical')}>
                        <h1 className="text-lg font-bold">Physical Hazardous</h1>
                    </button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
                            onClick={() => handleCategoryClick('Environmental')}>
                        <h1 className="text-lg font-bold">Environmental Hazardous</h1>
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
                            onClick={() => handleCategoryClick('Health')}>
                        <h1 className="text-lg font-bold">Health Hazardous</h1>
                    </button>
                    <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600"
                            onClick={() => handleCategoryClick('Least to none')}>
                        <h1 className="text-lg font-bold">Least to non Hazardous</h1>
                    </button>

                </div>
                <div className="flex justify-center items-center mx-3 my-10 bg-white rounded-lg shadow-md py-3">
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
                                <th className="px-4 py-2 border border-solid border-black font-bold">Download Report</th>
                                <th className="px-4 py-2 border border-solid border-black font-bold">Report for company</th>
                            </tr>
                            </thead>
                            <tbody>
                            {chemicalReports.length > 0 ? (
                                chemicalReports.map(report => (
                                    <tr key={report.id} className="border border-solid border-black">
                                        <td className="border border-solid border-black px-4 py-2">{report.name}</td>
                                        <td className="border border-solid border-black px-4 py-2">{report.hazarduous}</td>
                                        <td className="border border-solid border-black px-4 py-2">{report.nature}</td>
                                        {/*<td className="border border-solid border-black px-4 py-2">{report.expiry_date}</td>*/}
                                        {(() => {
                                            let time = new Date(report.expiry_date);
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
                                        <td className="border border-solid border-black px-4 py-2">{report.pH}</td>
                                        <td className="border border-solid border-black px-4 py-2">{report.quantity}</td>
                                        <td className="border border-solid border-black px-4 py-2">
                                            <button onClick={() => handleDownloadPDF(report.id)}>
                                                <FaRegFilePdf/>
                                            </button>
                                        </td>
                                        <td className="border border-solid border-black px-4 py-2">
                                            <button onClick={() => handleDownloadPDF1(report.id)}>
                                                <FaRegFilePdf/>
                                            </button>
                                        </td>
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
                </div>


                {/*<button*/}
                {/*    className={'fixed right-4 bottom-4 px-5 py-4 rounded-2xl text-lg bg-green-700 shadow-lg text-white border-0 '}*/}
                {/*    onClick={openModal}>Create report*/}
                {/*</button>*/}
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>A new report</h2>
                    <button className={'absolute top-3 right-3 '} onClick={closeModal}><IoClose/></button>
                    {/*<div>I am a modal</div>*/}
                    <form className={'my-5'} onSubmit={handleSubmit}>
                        <div className={'my-2'}>
                            <label>Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className={'my-2'}>
                            <label>Hazarduous:</label>
                            <select value={hazarduous} onChange={(e) => setHazarduous(e.target.value)}>
                                {hazard.map(hzd => (
                                    <option key={hzd.id} value={hzd.type}>{hzd.type}</option>
                                ))}
                            </select>
                        </div>
                        <div className={'my-2'}>
                            <label>pH Level:</label>
                            <input
                                type="text"
                                value={pH}
                                onChange={(e) => setPh(e.target.value)}
                                required
                            />
                        </div>
                        <div className={'my-2'}>
                            <label>Expiry Date:</label>
                            <input
                                type="date"
                                value={expdate}
                                onChange={(e) => setExpdate(e.target.value)}
                                required
                            />
                        </div>
                        <div className={'my-2'}>
                            <label>Quantity:</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </div>
                        <button className={'p-2 bg-blue-600 mt-4 text-white rounded-lg'} type="submit">Submit</button>
                    </form>
                </Modal>
            </div>
        ):(<Dashboard/>)
    );
};

export default ManageInventory;