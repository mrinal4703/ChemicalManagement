import React, {useEffect, useState} from 'react';
import Modal from "react-modal";
import {IoClose} from "react-icons/io5";
import axios from "axios";
import {isLoggedIn, isLoggedIn_session, rank, rank_session} from "../data/constants";
import Dashboard from "./Dashboard";
import {TbInfoHexagon, TbPointFilled} from "react-icons/tb";
import {schedfo} from "../data";

const Sidebar = ({ isOpen, onClose }) => {
    return (
        <div className={`fixed inset-y-0 right-0 w-96 z-40 bg-[#ededed] border-2 border-black text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition duration-300 ease-in-out`}>
            <div className="flex justify-between items-center my-4">
                <div className={'text-black w-full'}>
                    <h1 className="text-xl">Information on</h1><h1 className="text-xl font-bold">Schedule Production</h1>
                </div>
                <button className={'absolute text-black text-2xl top-3 right-3 '} onClick={onClose}><IoClose/></button>
            </div>
            <div className={'bg-white rounded-lg shadow-md mx-3 p-2 my-4'}>
                {schedfo.map(sched => (
                    <div key={sched.id} className={'text-black text-start'}>
                        <p><TbPointFilled className="text-black mr-2 inline-block"/> {sched.intro}</p><br/>
                        <p><TbPointFilled className="text-black mr-2 inline-block"/> {sched.prod}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

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

const ScheduleProduction = () => {
    // let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [idd, setIdd] = useState(0);
    const [existingrawmaterials, setExisitingrawmaterials] = useState([]);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const handleMaterialChange = (selectedMaterial) => {
        const selectedRawMaterial = existingrawmaterials.find(raw => raw.rawmaterial_for === selectedMaterial);
        if (selectedRawMaterial) {
            setName(selectedRawMaterial.rawmaterial_for);
            setQuantity(selectedRawMaterial.quantity);
            setIdd(selectedRawMaterial.id);
        } else {
            setName('');
            setQuantity(0);
            setIdd(0);
        }
    };

    const handleSchedule = async (event) => {
        event.preventDefault();
        const productiondate = new Date();
        let quanttype = '';
        if (name === 'Sulfuric Acid' || name === 'Chlorine' || name === 'Sodium Hydroxide (caustic soda)' || name === 'Ammonia' || name === 'Hydrogen' || name === 'Ethylene' || name === 'Propylene' || name === 'Benzene' || name === 'Toluene' || name === 'Xylene' || name === 'Polyethylene' || name === 'Polypropylene') {
            quanttype = 'Ltrs';
        } else {
            quanttype = 'Kgs'
        }
        let percent = 0;
        switch (name) {
            case 'Sulfuric Acid':
            case 'Chlorine':
            case 'Sodium Hydroxide (caustic soda)':
            case 'Ammonia':
            case 'Hydrogen':
                percent = 0.45;
                break;
            case 'Ethylene':
            case 'Propylene':
            case 'Benzene':
            case 'Toluene':
            case 'Xylene':
                percent = 0.25;
                break;
            case 'Polyethylene':
            case 'Polypropylene':
            case 'Polyvinyl Chloride (PVC)':
            case 'Polystyrene':
                percent = 0.20;
                break;
            case 'Nitrogen-based fertilizers (urea, ammonium nitrate)':
            case 'Phosphate fertilizers':
            case 'Potash':
                percent = 0.075;
                break;
            case 'Active Pharmaceutical Ingredients (APIs)':
            case 'Drug Intermediates (Pharmaceuticals)':
            case 'Fine Chemicals (Specialty Chemicals)':
            case 'Performance Chemicals (Specialty Chemicals)':
                percent = 0.075;
                break;
            case 'Industrial Gases':
                percent = 0.025;
                break;
            case 'Olefins (Petrochemicals)':
            case 'Aromatics (Petrochemicals)':
            case 'Polyisoprene Rubber (IR)':
            case 'Styrene-Butadiene rubber':
                percent = 0.01;
                break;
            default:
                console.log(`No percentage defined for ${name}`);
                break;
        }
        const chemquant = quantity * (1 - percent);
        const assess = 'pending'
        try {
            const response = await axios.post('http://localhost:8085/newchemicals', {
                name: name,
                production_date: productiondate,
                quantity: quantity,
                chemquantity: chemquant,
                quantity_type: quanttype,
                assess: assess
            });
            const response1 = await axios.post('http://localhost:8085/newreport', {
                name: name,
                production_date: productiondate,
                quantity_type: quanttype,
                quantity: chemquant
            });
            console.log(response1.data)
            console.log(response.data);
            closeModal();
            window.location.reload();
        } catch (error) {
            console.error('Error scheduling production:', error);
        }
    };


    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // subtitle.style.color = '#f00';
    }

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

    useEffect(() => {
        axios.get('http://localhost:8085/getrawmaterials')
            .then(response => {
                setExisitingrawmaterials(response.data);
            })
            .catch(error => {
                console.error('Error fetching rawmaterials', error);
            })
    }, []);

    const [chemicalsList, setChemicalslist] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8085/getAllChemicals')
            .then(response => {
                setChemicalslist(response.data);
            })
            .catch(error => {
                console.error('Error fetching chemicals', error);
            })
    }, []);


    function closeModal() {
        setIsOpen(false);
    }

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

    const [selectedMaterial, setSelectedMaterial] = useState('');

    const [isTableVisible, setIsTableVisible] = useState(true);

    const toggleTableVisibility = () => {
        setIsTableVisible(!isTableVisible);
    };

    return (
        ((isLoggedIn || isLoggedIn_session) && (rank === 'Assesser' || rank_session === 'Assesser') || (rank === 'CEO' || rank_session === 'CEO')) ? (
            <div>
                <button onClick={toggleSidebar}
                        className={`absolute z-10 right-0 px-4 ${isSidebarOpen ? 'hidden' : 'block'}`}>
                    <TbInfoHexagon className="text-3xl"/>
                </button>
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}/>
                <h1 className={'text-3xl my-4'}>Schedule production</h1>
                <div className={'bg-white rounded-lg shadow-md mx-3 p-2 my-4'}>
                    <h1 className={'text-2xl my-2 '}>To see which chemicals are ready to be produced, click
                        here&nbsp;&nbsp;
                        <button
                            className={'underline text-xl'}
                            onClick={toggleTableVisibility}
                        >
                            {isTableVisible ? 'Show Table' : 'Hide Table'}
                        </button>
                    </h1>

                    {!isTableVisible && (
                        <div className="flex justify-center items-center my-10">
                            <div className={'align-middle'}>
                                <table className="table-auto mx-auto">
                                    <thead className="bg-gray-200">
                                    <tr>
                                        {/*<th className="px-4 py-2">Raw Material's Name</th>*/}
                                        <th className="px-4 py-2 border border-solid border-black font-bold">Raw
                                            Material for
                                        </th>
                                        <th className="px-4 py-2 border border-solid border-black font-bold">Quantity</th>
                                        <th className="px-4 py-2 border border-solid border-black font-bold">Order
                                            Date
                                        </th>
                                        {/*<th className="px-4 py-2">Status</th>*/}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rawmaterialOrder.length > 0 ? (
                                        rawmaterialOrder.map(report => (
                                            <tr key={report.id} className="border border-solid border-black">
                                                {report.track.match('Ready') ? (
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
                                                        {/*<td className="border px-4 py-2">{report.track}</td>*/}
                                                    </>
                                                ) : null}
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
                    )}
                </div>

                <div className="flex justify-center items-center bg-white rounded-lg shadow-md mx-3 p-2 mb-24 my-4">
                    <h1 className={'text-2xl my-2 p-2'}>Scheduled for production</h1>
                    <div className={'align-middle'}>
                        <table className="table-auto mx-auto">
                            <thead className="bg-gray-200">
                            <tr>
                                {/*<th className="px-4 py-2">Raw Material's Name</th>*/}
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
                            </tr>
                            </thead>
                            <tbody>
                            {chemicalsList.length > 0 ? (
                                chemicalsList.map(report => (
                                    <tr key={report.id} className="border border-solid border-black">
                                        <td className="border border-solid border-black px-4 py-2">{report.name}</td>
                                        <td className="border border-solid border-black px-4 py-2">{report.chemquantity} {report.quantity_type}</td>
                                        <td className="border border-solid border-black px-4 py-2">{report.quantity} {report.quantity_type}</td>
                                        <td className="border border-solid border-black px-4 py-2">
                                            {(() => {
                                                let time = new Date(report.production_date);
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
                                        <td className="border border-solid border-black px-4 py-2">{report.assess}</td>
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

                <button
                    className={'fixed right-4 bottom-4 px-5 py-4 rounded-2xl text-lg bg-green-700 shadow-lg text-white border-0 '}
                    onClick={openModal}>Start Production
                </button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 className="text-2xl mb-4">Send for assessment</h2>
                    <button className={'absolute top-3 right-3 '} onClick={closeModal}><IoClose/></button>
                    {/*<div>I am a modal</div>*/}
                    <form className={'my-5'} onSubmit={handleSchedule}>
                        <div className="my-2">
                            <label className="block">Raw Materials for:</label>
                            <select className={'w-full'} value={selectedMaterial} onChange={(e) => {
                                setSelectedMaterial(e.target.value);
                                handleMaterialChange(e.target.value);
                            }}>
                                <option value="">Select Material</option>
                                {existingrawmaterials.map(raw => (
                                    <option key={raw.id} value={raw.rawmaterial_for}>{raw.rawmaterial_for}</option>
                                ))}
                            </select>
                            {selectedMaterial && (
                                <>
                                    <input
                                        type="number"
                                        value={idd}
                                        name="id"
                                        readOnly
                                        className="hidden"
                                    />
                                    <input
                                        type="number"
                                        value={quantity}
                                        name="quantity"
                                        readOnly
                                        className="hidden"
                                    />
                                    <input
                                        type="text"
                                        value={name}
                                        name="name"
                                        readOnly
                                        className="hidden"
                                    />
                                </>
                            )}
                        </div>
                        {selectedMaterial && (
                            <button className={'p-2 bg-blue-600 mt-4 text-white rounded-lg'}
                                    type="submit">Submit</button>
                        )}
                    </form>
                </Modal>
            </div>
        ) : (<Dashboard/>)
    );
};

export default ScheduleProduction;