import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios library

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [activeApi, setActiveApi] = useState('userseemsan');

    useEffect(() => {
        fetchData(activeApi);
    }, [activeApi]);

    const fetchData = async (api) => {
        try {
            const response = await axios.get(`http://localhost:8085/${api}`); // Use Axios's get method
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCategoryClick = (api) => {
        setActiveApi(api);
    };

    const renderTableHeaders = () => {
        const customHeaderClass = "px-4 py-2 border border-solid border-black font-bold";
        switch (activeApi) {
            case 'userseemsan':
                return (
                    <tr>
                        <th className={customHeaderClass}>Email</th>
                        <th className={customHeaderClass}>Name</th>
                        <th className={customHeaderClass}>Rank</th>
                    </tr>
                );
            case 'userswithcompanyorders':
                return (
                    <tr>
                        <th className={customHeaderClass}>Email</th>
                        <th className={customHeaderClass}>Rank</th>
                        <th className={customHeaderClass}>Company Name</th>
                        <th className={customHeaderClass}>Company Address</th>
                        <th className={customHeaderClass}>Company Phone Number</th>
                        <th className={customHeaderClass}>Company Type</th>
                        <th className={customHeaderClass}>Managed By</th>
                    </tr>
                );
            case 'userswithrawmaterialsprovider':
                return (
                    <tr>
                        <th className={customHeaderClass}>Email</th>
                        <th className={customHeaderClass}>Rank</th>
                        <th className={customHeaderClass}>Provider Company</th>
                        <th className={customHeaderClass}>Provider Name</th>
                        <th className={customHeaderClass}>Raw Materials Name</th>
                    </tr>
                );
            default:
                return null;
        }
    };

    const renderTableData = () => {
        if (!Array.isArray(users)) {
            return null;
        }
        const customTdClass = "border border-solid border-black px-4 py-2";
        switch (activeApi) {
            case 'userseemsan':
                return users.map(user => (
                    <tr key={user.id} className="border border-solid border-black">
                        <td className={customTdClass}>{user.email}</td>
                        <td className={customTdClass}>{user.name}</td>
                        <td className={customTdClass}>{user.rankk}</td>
                    </tr>
                ));
            case 'userswithcompanyorders':
                return users.map((order, index) => (
                    <tr key={index} className="border border-solid border-black">
                        <td className={customTdClass}>{order[1]}</td>
                        <td className={customTdClass}>{order[4]}</td>
                        <td className={customTdClass}>{order[8]}</td>
                        <td className={customTdClass}>{order[6]}</td>
                        <td className={customTdClass}>{order[9]}</td>
                        <td className={customTdClass}>{order[10]}</td>
                        <td className={customTdClass}>{order[11]}</td>
                    </tr>
                ));
            case 'userswithrawmaterialsprovider':
                return users.map((provider, index) => (
                    <tr key={index} className="border border-solid border-black">
                        <td className={customTdClass}>{provider[1]}</td>
                        <td className={customTdClass}>{provider[2]}</td>
                        <td className={customTdClass}>{provider[4]}</td>
                        <td className={customTdClass}>{provider[6]}</td>
                        <td className={customTdClass}>{provider[9]}</td>
                    </tr>
                ));
            default:
                return null;
        }
    };


    return (
        <div>
            <div>
                <div className={'flex flex-row gap-10 justify-evenly mt-10'}>
                    <button
                        className={`px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 ${activeApi === 'userseemsan' ? 'bg-green-600' : ''}`}
                        onClick={() => handleCategoryClick('userseemsan')}>
                        <h1 className="text-lg font-bold">Seemsan Users</h1>
                    </button>
                    <button
                        className={`px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 ${activeApi === 'userswithcompanyorders' ? 'bg-red-600' : ''}`}
                        onClick={() => handleCategoryClick('userswithcompanyorders')}>
                        <h1 className="text-lg font-bold">Companies</h1>
                    </button>
                    <button
                        className={`px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 ${activeApi === 'userswithrawmaterialsprovider' ? 'bg-yellow-600' : ''}`}
                        onClick={() => handleCategoryClick('userswithrawmaterialsprovider')}>
                        <h1 className="text-lg font-bold">Raw Materials Providers</h1>
                    </button>
                </div>
            </div>
            <div className={'mx-3'}>
                <div className="w-fit justify-center items-center mx-auto my-10 bg-white rounded-lg shadow-md p-3">
                    <div className={'align-middle p-2'}>
                        <table className="table-auto mx-auto">
                            <thead className="bg-gray-200">
                            {renderTableHeaders()}
                            </thead>
                            <tbody>
                            {renderTableData()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default UserList;
