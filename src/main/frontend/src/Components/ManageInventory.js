import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import axios from "axios";
import {hazard} from "../data";
import {IoClose} from "react-icons/io5";
// import {useNavigate} from "react-router-dom";
import {FaRegFilePdf} from "react-icons/fa6";
import jsPDF from "jspdf";

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

            const pdf = new jsPDF();
            chemicalReport.forEach(report => {
                pdf.text(20,10, `Company Name`);
                pdf.text(20, 20, `Name: ${report.name}`);
                pdf.text(20, 30, `Expiry: ${report.expiry_date}`);
                pdf.text(20, 40, `Hazarduous: ${report.hazarduous}`);
                pdf.text(20, 50, `Nature: ${report.nature}`);
                pdf.text(20, 60, `pH: ${report.pH}`);
                pdf.text(20, 70, `Production Date: ${report.production_date}`);
                pdf.text(20, 80, `Quantity: ${report.quantity} ${report.quantity_type}`);
                pdf.text(20, 90, `Quantity Type: ${report.quantity_type}`);
                pdf.text(20, 100, `Volatility: ${report.volatility}`);
                pdf.text(20, 110, `Persistence: ${report.persistence}`);
                pdf.text(20, 120, `Toxicity: ${report.toxicity}`);
                pdf.addPage();
            });

            pdf.save(`Report_${id}.pdf`);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };


    return (
        <div>
            <h1 className={'text-3xl my-2 '}>MANAGE INVENTORY</h1>
            <hr className={'align-middle my-4 mx-auto w-5/6'}></hr>
            <div className={'flex flex-row gap-10 justify-evenly mt-10'}>
                <button className={'px-4 py-4 bg-amber-500'} onClick={() => handleCategoryClick('Physical')}>
                    <h1>Physical Hazarduous</h1>
                </button>
                <button className={'px-4 py-4 bg-amber-500'} onClick={() => handleCategoryClick('Environmental')}>
                    <h1>Environmental Hazarduous</h1>
                </button>
                <button className={'px-4 py-4 bg-amber-500'} onClick={() => handleCategoryClick('Health')}>
                    <h1>Health Hazarduous</h1>
                </button>
                <button className={'px-4 py-4 bg-amber-500'} onClick={() => handleCategoryClick('Least to none')}>
                    <h1>Least to non Hazarduous</h1>
                </button>
            </div>
            <div className="flex justify-center items-center my-10">
                <div className={'align-middle'}>
                    <table className="table-auto mx-auto">
                        <thead>
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Hazard type</th>
                            <th className="px-4 py-2">Nature</th>
                            <th className="px-4 py-2">Expiry Date</th>
                            <th className="px-4 py-2">pH Level</th>
                            <th className="px-4 py-2">Quantity(present)</th>
                            <th className="px-4 py-2">Download Report</th>
                        </tr>
                        </thead>
                        <tbody>
                        {chemicalReports.length > 0 ? (
                            chemicalReports.map(report => (
                                <tr key={report.id}
                                    // onClick={() => handleClick(report.id)}
                                >
                                    <td className="border px-4 py-2">{report.name}</td>
                                    <td className="border px-4 py-2">{report.hazarduous}</td>
                                    <td className="border px-4 py-2">{report.nature}</td>
                                    <td className="border px-4 py-2">{report.expiry_date}</td>
                                    <td className="border px-4 py-2">{report.pH}</td>
                                    <td className="border px-4 py-2">{report.quantity}</td>
                                    {/*<button>*/}
                                    {/*    <td className="border px-4 py-2"><FaRegFilePdf /></td>*/}
                                    {/*</button>*/}
                                    <button onClick={() => handleDownloadPDF(report.id)}>
                                        <FaRegFilePdf/>
                                    </button>
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


            <button
                className={'fixed right-4 bottom-4 px-5 py-4 rounded-2xl text-lg bg-green-700 shadow-lg text-white border-0 '}
                onClick={openModal}>Create report
            </button>
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
    );
};

export default ManageInventory;