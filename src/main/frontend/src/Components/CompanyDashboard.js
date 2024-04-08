import React, {useEffect, useState} from 'react';
import Modal from "react-modal";
import {IoClose} from "react-icons/io5";
import {biodata, compfo, producedchemicals} from "../data";
import axios from "axios";
import {email, email_session} from "../data/constants";
import {TbInfoHexagon, TbPointFilled} from "react-icons/tb";

const Sidebar = ({ isOpen, onClose }) => {
    return (
        <div className={`fixed inset-y-0 right-0 w-96 z-40 bg-[#ededed] border-2 border-black text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition duration-300 ease-in-out`}>
            <div className="flex justify-between items-center my-4">
                <div className={'text-black w-full'}>
                    <h1 className="text-xl">Information on</h1><h1 className="text-xl font-bold">Dashboard</h1>
                </div>
                <button className={'absolute text-black text-2xl top-3 right-3 '} onClick={onClose}><IoClose/></button>
            </div>
            <div className={'bg-white rounded-lg shadow-md mx-3 p-2 my-4'}>
                {compfo.map(comp => (
                    <div key={comp.id} className={'text-black text-start'}>
                        <p><TbPointFilled className="text-black mr-2 inline-block"/> {comp.intro}</p><br/>
                        <p><TbPointFilled className="text-black mr-2 inline-block"/> {comp.calc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
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

const CompanyDashboard = () => {
    // let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [accordionIsOpen, setAccordionIsOpen] = useState(false);
    const [chemicals, setChemicals] = useState([{name: '', quantity: ''}]);

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
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
        window.location.reload();
    }

    const [chem, setChem] = useState('');
    const [calculatedValue, setCalculatedValue] = useState(null);
    const [inputValue, setInputValue] = useState('');

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
            setCalculatedValue(density * parseFloat(inputValue));
        } else {
            setCalculatedValue(null);
        }
    }

    const handleChange = (index, event) => {
        const {name, value} = event.target;
        const list = [...chemicals];
        list[index][name] = value;
        setChemicals(list);
    };

    const handleAdd = () => {
        setChemicals([...chemicals, {name: '', quantity: ''}]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let email1 = "";
        if (email && email_session && email.match(email_session)) {
            email1 = email_session;
        }
        const pend = "pending";
        const ordertime = new Date();
        const orderList = chemicals.map(({name, quantity}) => `${name} (${quantity})`).join(' Kg, ') + ' Kg';
        try {
            const response = await axios.post('http://localhost:8085/orderchemicals', {
                company_email: email1,
                order_date: ordertime,
                order_list: orderList,
                order_status: pend
            });
            setChemicals([{name: '', quantity: ''}]);
            closeModal();
            window.location.reload();
            console.log(response.data);
        } catch (error) {
            console.error('Error ordering raw material:', error);
            alert('Error placing order. Please try again.');
        }
    };

    const [ordersstack, setOrdersstack] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                let url = 'http://localhost:8085/getcompanyorders';
                const response = await axios.get(url);
                setOrdersstack(response.data);
            } catch (error) {
                console.log('Error fetching provider:', error);
            }
        };

        fetchOrders();
    }, []);

    console.log(email);
    console.log(email_session, ' Hi')

    return (
        <div>
            <button onClick={toggleSidebar}
                    className={`absolute z-10 right-0 px-4 ${isSidebarOpen ? 'hidden' : 'block'}`}>
                <TbInfoHexagon className="text-3xl"/>
            </button>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}/>
            <h1 className={'text-3xl my-2 '}>Order for Raw materials</h1>
            <div className={'bg-white mx-3 my-4 p-2 rounded-lg shadow-md'}>
                <h1 className={'text-3xl my-4'}>Seemsan Company Welcomes you!</h1>
                <h1 className={'text-lg'}>{biodata}</h1>
                <h2 className={'text-lg'}>These are the following chemicals that are provided by our company:</h2>
                <div className="flex flex-wrap my-3">
                    {producedchemicals && producedchemicals.map(raw => (
                        raw.id !== 1 && (
                            <div key={raw.id} className="w-1/4 flex items-center mb-2">
                                <TbPointFilled className="text-black mr-2"/>
                                <span>{raw.name}</span>
                            </div>
                        )
                    ))}
                </div>
                <p>The delivery would be done as kg basis, so it would even deliver liquid or gas in kgs as well.</p>
                <p>Dont worry, we have provided a calculator for you, that provide an estimate kg, for your preferred
                    litres of particular chemicals</p>
            </div>
            <div className={'bg-white mx-3 my-4 p-2 rounded-lg shadow-md mb-20'}>
                <h1 className={'text-2xl my-4'}>Your orders</h1>
                {ordersstack.length > 0 && (
                    <div className="flex justify-center items-center my-4">
                        <div className={'align-middle'}>
                            <table className="table-auto mx-auto">
                                <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-4 py-2 border border-solid border-black font-bold">Order List</th>
                                    <th className="px-4 py-2 border border-solid border-black font-bold">Date of order
                                    </th>
                                    <th className="px-4 py-2 border border-solid border-black font-bold">Status of
                                        order
                                    </th>
                                    <th className="px-4 py-2 border border-solid border-black font-bold">Date Delivered
                                        on
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {ordersstack.map(order => (
                                    <tr key={order.id} className="border border-solid border-black">
                                        {(email.match(order.company_email) || email_session.match(order.company_email)) && (
                                            <>
                                                <td className="border border-solid border-black px-4 py-2">{order.order_list}</td>
                                                <td className="border border-solid border-black px-4 py-2">
                                                    {(() => {
                                                        let time = new Date(order.order_date);
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
                                                <td className="border border-solid border-black px-4 py-2">{order.order_status}</td>
                                                <td className="border border-solid border-black px-4 py-2">
                                                    {order.delivered_date !== null ? (
                                                        <>
                                                            {(() => {
                                                                let time = new Date(order.delivered_date);
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
                                                        </>
                                                    ) : (
                                                        <p>Soon!</p>
                                                    )}

                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {ordersstack.length === 0 && (
                    <div className="flex justify-center items-center my-10">
                        <div className="border px-4 py-2">No matching data available currently!</div>
                    </div>
                )}
            </div>


            <button
                className={'fixed right-4 bottom-4 px-5 py-4 rounded-2xl text-lg bg-green-700 shadow-lg text-white border-0 '}
                onClick={openModal}>Place Order
            </button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 className="text-2xl mb-4">Place order for chemicals</h2>
                {/*<h2 ref={(_subtitle) => (subtitle = _subtitle)}>Order</h2>*/}
                <button className={'absolute top-3 right-3 '} onClick={closeModal}><IoClose/>
                </button>
                <form className={'my-5'} onSubmit={handleSubmit}>
                    {/*<div><h1>Place order for chemicals</h1></div>*/}
                    {chemicals.map((chemical, index) => (
                        <div className={'flex'} key={index}>
                            {/*<label className={'block'} htmlFor={`chemical-${index}`}>Select Chemical:</label>*/}
                            <select
                                id={`chemical-${index}`}
                                name="name"
                                required
                                className={'h-12'}
                                value={chemical.name}
                                onChange={(event) => handleChange(index, event)}
                            >
                                <option value="">Select chemical</option>
                                {producedchemicals.map(chem => (
                                    chem.id !== 1 && (
                                        <option key={chem.id} value={chem.name}>{chem.name}</option>)
                                ))}
                            </select>&nbsp;&nbsp;&nbsp;
                            {/*<label className={'block'} htmlFor={`quantity-${index}`}>Quantity:</label>*/}
                            <input
                                id={`quantity-${index}`}
                                type="number"
                                name="quantity"
                                className="w-96 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
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
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                        className={'p-2 bg-blue-600 mt-4 text-white rounded-lg'}
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
                <h1 className={'text-lg my-4'}>Calculator for quantity Converisons</h1>
                <div>
                    <button className={'bg-blue-600 p-2 my-1 rounded-lg text-white'}
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
            </Modal>
        </div>
    );
};

export default CompanyDashboard;
