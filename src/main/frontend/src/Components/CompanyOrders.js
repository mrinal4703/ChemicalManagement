import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {hazard, producedchemicals} from "../data";
import {IoClose} from "react-icons/io5";
import Modal from "react-modal";
import {assess} from "../Assets/images";
import {CiDeliveryTruck} from "react-icons/ci";
import Dashboard from "./Dashboard";
import {isLoggedIn, isLoggedIn_session, rank, rank_session} from "../data/constants";
import {TbInfoHexagon} from "react-icons/tb";

const Sidebar = ({ isOpen, onClose }) => {
    return (
        <div className={`fixed inset-y-0 right-0 w-96 bg-[#ededed] border-2 border-black text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition duration-300 ease-in-out`}>
            <div className="flex justify-between items-center mb-4">
                <div className={'text-black w-full'}>
                    <h1 className="text-xl">Information on</h1><h1 className="text-xl font-bold">Company Orders</h1>
                </div>
                <button className={'absolute text-black text-2xl top-3 right-3 '} onClick={onClose}><IoClose/></button>
            </div>
            <div className={'bg-white rounded-lg shadow-md mx-3 p-2 my-4'}>

            </div>
        </div>
    );
};
function ChemicalDeliveryCard({delivery, producedchemicals}) {
    const [chemicals, setChemicals] = useState([{name: '', quantity: ''}]);
    const [chemlist, setChemlist] = useState([]);
    useEffect(() => {
        const fetchOrders1 = async () => {
            try {
                const url = `http://localhost:8085/chemical-reports`;
                const response = await axios.get(url);
                setChemlist(response.data);
                console.log(response)
            } catch (error) {
                console.log('Error fetching provider:', error);
            }
        };

        fetchOrders1();
    }, []);

    const handleChange = (index, event) => {
        const {name, value} = event.target;
        const list = [...chemicals];
        list[index][name] = value;
        setChemicals(list);
    };

    const handleAdd = () => {
        setChemicals([...chemicals, {name: '', quantity: ''}]);
    };

    const [chemlst, setCchemlst] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8085/getcompanyorders')
            .then(response => {
                setChemlist(response.data);
            })
            .catch(error => {
                console.error('Error fetching chemicals', error);
            })
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let emaill = delivery[1];
        let pend = "Delivered";
        let deliverDate = new Date();
        try {
            const updates = chemicals.map(({name, quantity}) => ({
                name: name,
                quantity: parseFloat(quantity)
            }));

            await axios.put('http://localhost:8085/updateChemicalReportQuantities', updates);

            const companyOrderToUpdate = chemlst.find(deliver => deliver.company_email === emaill);
            const updatedDeli = {...companyOrderToUpdate, order_status: pend, delivered_date: deliverDate};
            await axios.put(`http://localhost:8085/updateDelivery/${emaill}`, updatedDeli);

            setChemicals([{name: '', quantity: ''}]);
            window.location.reload();
        } catch (error) {
            console.error('Error updating chemical quantities:', error);
            alert('Error updating chemical quantities. Please try again.');
        }
    };


    return (
        <div className="card flex flex-col justify-between p-6 border-2 w-96 h-max bg-white rounded-lg shadow-md mx-3 my-4">
            <div className="card-body">
                <h5 className="card-title text-2xl my-1">Delivery for {delivery[2]}</h5>
                <hr className={'my-1'}></hr>
                <p className="card-text text-lg">Deliveries to be made are {delivery[9]}</p>
            </div>
            <div>
                <form className={'my-5'} onSubmit={handleSubmit}>
                    <div><h1 className={'text-xl my-1'}>Deliver Chemicals</h1></div>
                    {chemicals.map((chemical, index) => (
                        <div key={index}>
                            <label className={'block'} htmlFor={`chemical-${index}`}>Select Chemical:</label>
                            <select
                                id={`chemical-${index}`}
                                name="name"
                                className={'w-full'}
                                required
                                value={chemical.name}
                                onChange={(event) => handleChange(index, event)}
                            >
                                <option value="">Select chemical</option>
                                {chemlist.map(chem => (
                                    <option key={chem.id}
                                            value={chem.name}>{chem.name} {chem.quantity}{chem.quantity_type}</option>
                                ))}
                            </select>
                            <label className={'block'} htmlFor={`quantity-${index}`}>Quantity:</label>
                            <input
                                id={`quantity-${index}`}
                                type="number"
                                name="quantity"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                                required
                                value={chemical.quantity}
                                onChange={(event) => handleChange(index, event)}
                            />
                        </div>
                    ))}
                    <button
                        className={'p-2 bg-blue-600 mt-4 text-white rounded-lg'}
                        type="button"
                        onClick={handleAdd}
                    >
                        Add more chemicals
                    </button>&nbsp;&nbsp;&nbsp;
                    <button
                        className={'p-2 bg-blue-600 mt-4 text-white rounded-lg'}
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>

    );
}

export {ChemicalDeliveryCard};


const Accordion = ({isOpen, children}) => {
    return (
        <div style={{display: isOpen ? 'block' : 'none'}}>
            {children}
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

const CompanyOrders = () => {
    const [accordionIsOpen, setAccordionIsOpen] = useState(false);
    // let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [chem, setChem] = useState('');
    const [calculatedValue, setCalculatedValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };


    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    function calculateDensity(name) {
        switch (name) {
            case 'Sulfuric Acid':
                return 1.84;
            case 'Chlorine':
                return 3.21;
            case 'Sodium Hydroxide (caustic soda)':
                return 1.53;
            case 'Ammonia':
                return 0.73;
            case 'Hydrogen':
                return 0.0899;
            case 'Ethylene':
                return 0.565;
            case 'Propylene':
                return 0.565;
            case 'Benzene':
                return 0.879;
            case 'Toluene':
                return 0.866;
            case 'Xylene':
                return 0.86;
            case 'Polyethylene':
                return 0.91;
            case 'Polypropylene':
                return 0.895;
            default:
                return 1;
        }
    }

    function handleCalculate() {
        const density = calculateDensity(chem);
        if (density !== null && inputValue !== '') {
            setCalculatedValue(parseFloat(inputValue) / density);
        } else {
            setCalculatedValue(null);
        }
    }

    const [ordersstack, setOrdersstack] = useState([]);
    const [compmail, setCompmail] = useState('');
    const [orderstackcount, setOrdersstackCount] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                let url = `http://localhost:8085/getreport/all`;
                const response = await axios.get(url);
                let url1 = `http://localhost:8085/getreport/count`;
                const response1 = await axios.get(url1);
                setOrdersstack(response.data);
                setOrdersstackCount(response1.data);
                console.log(response1, ' status');
            } catch (error) {
                console.log('Error fetching provider:', error);
            }
        };

        fetchOrders();
    }, []);


    const [orderStack1, setOrderStack1] = useState([]);
    useEffect(() => {
        const fetchOrders1 = async () => {
            try {
                let url = `http://localhost:8085/getcompanyorders`;
                const response = await axios.get(url);
                setOrderStack1(response.data);
                console.log(response)
            } catch (error) {
                console.log('Error fetching provider:', error);
            }
        };

        fetchOrders1();
    }, []);

    const [maill, setMaill] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8085/generatedelivery', {
                company_email: maill
            });
            closeModal();
            window.location.reload();
            console.log(response.data);

        } catch (error) {
            console.error('Error signing up:', error);
        }

    };

    // const [deliveryStack, setDeliveryStack] = useState([]);
    // const [chemicals, setChemicals] = useState([{ name: '', quantity: '' }]);

    const [deliveryStack, setDeliveryStack] = useState([]);
    const [statuss, setStatuss] = useState('');
    useEffect(() => {
        const fetchDelivery = async () => {
            try {
                let url = 'http://localhost:8085/getdeliveryforcards';
                const response = await axios.get(url);
                setDeliveryStack(response.data);
                let url1 = 'http://localhost:8085/getdeliveryforcardsstatus';
                const response1 = await axios.get(url1);
                setStatuss(response1.data);
                console.log(response);
            } catch (error) {
                console.log('Error fetching provider:', error);
            }
        };
        fetchDelivery();
    }, []);


    return (
        ((isLoggedIn || isLoggedIn_session) && (rank === 'Distributor' || rank_session === 'Distributor') || (rank === 'CEO' || rank_session === 'CEO')) ? (
            <div>
                <button onClick={toggleSidebar}
                        className={`absolute z-10 right-0 px-4 ${isSidebarOpen ? 'hidden' : 'block'}`}>
                    <TbInfoHexagon className="text-3xl"/>
                </button>
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}/>
                <h1 className={'text-3xl my-4'}>Orders from companies</h1>
                <div className={'flex justify-evenly bg-white rounded-lg shadow-md mx-3 p-2 my-4'}>
                    <h1 className={'text-2xl my-4'}>Calculator for quantity Converisons</h1>
                    <div>
                        <button className={'bg-blue-600 p-3 my-1 rounded-lg text-white'}
                                onClick={() => setAccordionIsOpen(!accordionIsOpen)}>Calculate Amount
                        </button>
                        <Accordion isOpen={accordionIsOpen}>
                            <div>
                                <h2 className={'text-lg my-4'}>Select chemical name</h2>
                                <select className={'h-12'} value={chem} onChange={(e) => setChem(e.target.value)}
                                        required>
                                    {producedchemicals.map(raw => (
                                        <option key={raw.id} value={raw.name}>{raw.name}</option>
                                    ))}
                                </select>&nbsp;&nbsp;&nbsp;
                                <input
                                    type="number"
                                    placeholder="Enter amount of your wish in Ltrs or Kgs"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="w-96 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                                    required
                                />&nbsp;&nbsp;&nbsp;
                                <button className={'bg-blue-500 p-3 my-1 rounded-lg text-white'}
                                        onClick={handleCalculate}>Calculate
                                </button>
                                {calculatedValue !== null && (
                                    <>
                                        {inputValue === calculatedValue.toFixed(3) || inputValue === calculatedValue.toFixed(0) ? (
                                            <p className="text-lg">Order amount: {calculatedValue.toFixed(2)} Kgs</p>
                                        ) : (
                                            <p className="text-lg">Order amount: {calculatedValue.toFixed(3)} Ltrs</p>
                                        )}
                                    </>
                                )}

                            </div>
                        </Accordion>
                    </div>
                </div>

                <x
                    className="flex absolute left-3 top-20 items-center justify-center bg-blue-500 text-white rounded-full w-12 h-12"
                    onClick={toggleModal}>
                    <CiDeliveryTruck size={32}/>
                    {orderstackcount &&
                        <div
                            className="absolute top-2 right-3 transform translate-x-1/2 -translate-y-1/2 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center">
                            {orderstackcount}
                        </div>}
                </x>

                {isModalOpen && (
                    <div
                        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-[#ededed] p-4 rounded-lg relative">
                            <button className="absolute top-2 right-2 text-gray-600" onClick={toggleModal}>
                                <IoClose className="h-6 w-6"/>
                            </button>
                            <h1 className="text-2xl">Delivery details</h1>
                            {ordersstack.length > 0 ? (
                                <div
                                    className="w-fit justify-center items-center mx-auto my-4 bg-white rounded-lg shadow-md p-3">
                                    <div className={'align-middle'}>
                                        <table className="table-auto mx-auto">
                                            <thead className="bg-gray-200">
                                            <tr>
                                                <th className="px-4 py-2 border border-solid border-black font-bold">Company
                                                    Name
                                                </th>
                                                <th className="px-4 py-2 border border-solid border-black font-bold">Company
                                                    Address
                                                </th>
                                                <th className="px-4 py-2 border border-solid border-black font-bold">Company
                                                    Email
                                                </th>
                                                <th className="px-4 py-2 border border-solid border-black font-bold">Company
                                                    Phone number
                                                </th>
                                                <th className="px-4 py-2 border border-solid border-black font-bold">Company
                                                    Type
                                                </th>
                                                <th className="px-4 py-2 border border-solid border-black font-bold">Order
                                                    List
                                                </th>
                                                <th className="px-4 py-2 border border-solid border-black font-bold">Date
                                                    of order
                                                </th>
                                                <th className="px-4 py-2 border border-solid border-black font-bold">Status
                                                    of order
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {ordersstack.map((order, index) => (
                                                <tr key={index} className="border border-solid border-black">
                                                    <td className="border border-solid border-black px-4 py-2">{order[1]}</td>
                                                    <td className="border border-solid border-black px-4 py-2">{order[4]}</td>
                                                    <td className="border border-solid border-black px-4 py-2">{order[8]}</td>
                                                    <td className="border border-solid border-black px-4 py-2">{order[5]}</td>
                                                    <td className="border border-solid border-black px-4 py-2">{order[2]}</td>
                                                    <td className="border border-solid border-black px-4 py-2">{order[11]}</td>
                                                    <td className="border border-solid border-black px-4 py-2">
                                                        {(() => {
                                                            const orderDateTime = new Date(order[10]);
                                                            const formattedDateTime = `${orderDateTime.getFullYear()}-${(orderDateTime.getMonth() + 1).toString().padStart(2, '0')}-${orderDateTime.getDate().toString().padStart(2, '0')} ${orderDateTime.getHours().toString().padStart(2, '0')}:${orderDateTime.getMinutes().toString().padStart(2, '0')}`;
                                                            return formattedDateTime;
                                                        })()}
                                                    </td>
                                                    <td className="border border-solid border-black px-4 py-2">{order[12]}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-center items-center my-10">
                                    <div className="border px-4 py-2">No matching data available currently!</div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <button
                    className={'fixed right-4 bottom-4 px-5 py-4 rounded-2xl text-lg bg-green-700 shadow-lg text-white border-0 '}>
                    <Link to="/Inventory">
                        <h1 className={'text-lg'}>Inventory</h1>
                    </Link>
                </button>

                <button
                    className={'fixed right-36 bottom-4 px-5 py-4 rounded-2xl text-lg bg-green-700 shadow-lg text-white border-0 '}
                    onClick={openModal}>
                    <h1 className={'text-lg'}>Generate Delivery</h1>
                </button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 className="text-2xl mb-4">A new delivery</h2>
                    <button className={'absolute top-3 right-3 '} onClick={closeModal}><IoClose/></button>
                    {/*<div>I am a modal</div>*/}
                    <h2 className="text-lg mb-4">Select email for delivery</h2>
                    <form className={'my-5'} onSubmit={handleSubmit}>
                        {orderStack1.length > 0 ? (
                            <select className={'w-full'} value={maill} onChange={(e) => setMaill(e.target.value)}>
                                <option value="">Select</option>
                                {maill === "" && (
                                    orderStack1.map(order => (
                                        <option key={order.id}
                                                value={order.company_email}>{order.company_email}</option>
                                    ))
                                )}
                            </select>
                        ) : (
                            <></>
                        )}

                        <button className={'p-2 bg-blue-600 mt-4 text-white rounded-lg'} type="submit">Submit</button>
                    </form>
                </Modal>
                <h1 className={'text-2xl my-4'}>Live orders (yet to deliver)</h1>
                <div className={'flex mb-24 flex-row gap-3 justify-center'}>
                    {deliveryStack.length > 0 && deliveryStack
                        .map((delivery, index) => (
                            delivery[10] === "pending" ? (
                                <ChemicalDeliveryCard
                                    key={index}
                                    delivery={delivery}
                                    producedchemicals={producedchemicals}
                                />
                            ) : (<></>)
                        ))
                    }
                </div>
            </div>
        ) : (<Dashboard/>)
    );
};

export default CompanyOrders;