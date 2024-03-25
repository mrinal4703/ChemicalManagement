import React, { useState } from 'react';
import axios from 'axios'; // Import Axios library
import { useNavigate } from 'react-router-dom';
import {comptype, ranks} from "../data";

const Login = ({ onToggleSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => { // Define handleLogin as asynchronous
        event.preventDefault();
        // Your login logic here
        console.log("Email:", email);
        console.log("Password:", password);

        try {
            const response = await axios.post('http://localhost:8085/login', {
                email: email,
                password: password
            });
            console.log(response.data); // Log the response from the backend

            // After login logic is done, you might want to clear the form fields
            setEmail('');
            setPassword('');
            localStorage.setItem('isLoggedIn', true);
            sessionStorage.setItem('isLoggedIn', true);
            localStorage.setItem('loggedinuseremail', email);
            sessionStorage.setItem('loggedinuseremail', email);
            localStorage.setItem('loggedinuserrank', response.data.rankk);
            sessionStorage.setItem('loggedinuserrank', response.data.rankk);
            console.log(response.data.rankk);
            navigate('/CompanyDashboard');
            window.location.reload();
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        // <div>
        //     <h2>Login</h2>
        //     <form onSubmit={handleLogin}>
        //         <div>
        //             <label>Email:</label>
        //             <input
        //                 type="email"
        //                 value={email}
        //                 onChange={(e) => setEmail(e.target.value)}
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label>Password:</label>
        //             <input
        //                 type="password"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 required
        //             />
        //         </div>
        //         <button type="submit">Login</button>
        //     </form>
        //     <p>New here? <button onClick={onToggleSignUp}>Sign up here</button></p>
        // </div>
        <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-blue-700">
                    Login
                </button>
            </form>
            <p className="mt-4 text-center">New here? <button onClick={onToggleSignUp}
                                                              className="text-blue-500 focus:outline-none">Sign up
                here</button></p>
        </div>

    );
};

const SignUp = ({onToggleLoginPage}) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    let [rankk, setRankk] = useState('');
    const [password, setPassword] = useState('');
    const [compname, setCompName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState();
    const [compType, setCompType] = useState('');
    // const navigate = useNavigate();


    const handleSignUp = async (event) => { // Define handleSignUp as asynchronous
        event.preventDefault();
        // Your sign-up logic here
        console.log("Email:", email);
        console.log("Name:", name);
        console.log("Password:", password);
        rankk = 'Company';
        let orders=0;
        try {
            const response = await axios.post('http://localhost:8085/newuser', { // Make a POST request to the sign-up endpoint
                email: email,
                name: name,
                rankk: rankk,
                password: password
            });
            const response1 = await axios.post('http://localhost:8085/newcompanysignup', { // Make a POST request to the sign-up endpoint
                company_email: email,
                company_name:  compname,
                manage_name: name,
                rankk: rankk,
                company_address: address,
                company_type: compType,
                company_phoneno: phone,
                order_nos: orders,
                password: password
            });
            console.log(response1.data); // Log the response from the backend
            console.log(response.data); // Log the response from the backend

            // After sign-up logic is done, you might want to clear the form fields
            setEmail('');
            setName('');
            setPassword('');
            onToggleLoginPage();
        } catch (error) {
            console.error('Error signing up:', error);
        }

    };

    return (
        // <div>
        //     <h2>Sign Up</h2>
        //     <form onSubmit={handleSignUp}>
        //         <div>
        //             <label>Name:</label>
        //             <input
        //                 type="text"
        //                 value={name}
        //                 onChange={(e) => setName(e.target.value)}
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label>Email:</label>
        //             <input
        //                 type="email"
        //                 value={email}
        //                 onChange={(e) => setEmail(e.target.value)}
        //                 required
        //             />
        //         </div>
        //         <label>Select Rank:</label>
        //         <select value={selectedRank} onChange={(e) => setSelectedRank(e.target.value)}>
        //             {ranks.map(rank => (
        //                 <option key={rank.id} value={rank.ranktype}>{rank.ranktype}</option>
        //             ))}
        //         </select>
        //         <div>
        //             <label>Password:</label>
        //             <input
        //                 type="password"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 required
        //             />
        //         </div>
        //         <button type="submit">Sign Up</button>
        //     </form>
        //     <p>Already have an account? <button onClick={onToggleLoginPage}>Login here</button></p>
        // </div>
        <div className="max-w-md mx-auto p-4 mb-4 border rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Sign Up</h2>
            <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                    <label className="block">Manager's Name:</label>
                    <input
                        type="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block">Company's Name:</label>
                    <input
                        type="text"
                        value={compname}
                        onChange={(e) => setCompName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block">Select Type:</label>
                    <select
                        value={compType}
                        onChange={(e) => setCompType(e.target.value)}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                    >
                        {comptype.map(type => (
                            <option key={type.id} value={type.type}>{type.type}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block">Address:</label>
                    <textarea
                        typeof="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block">Phone Number:</label>
                    <input
                        type="text"
                        pattern="[0-9]*"
                        maxLength="10"
                        value={phone}
                        onChange={(e) => {
                            const enteredValue = e.target.value;
                            const onlyNumbers = enteredValue.replace(/\D/g, ''); // Replace any non-digit character with empty string
                            setPhone(onlyNumbers); // Update the state with only numeric value
                        }}
                        required
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                    />

                </div>
                <div>
                    <label className="block">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-blue-700">
                    Sign Up
                </button>
            </form>
            <p className="mt-4 text-center">Already have an account? <button onClick={onToggleLoginPage}
                                                                             className="text-blue-500 focus:outline-none">Login
                here</button></p>
        </div>

    );
};

const Authentication = () => {
    const [isLoginPage, setIsLoginPage] = useState(true);

    const handleToggleSignUp = () => {
        setIsLoginPage(false);
    };

    const handleToggleLoginPage = () => {
        setIsLoginPage(true);
    };

    return (
        <div>
            {isLoginPage ? (
                <Login onToggleSignUp={handleToggleSignUp}/>
            ) : (
                <SignUp onToggleLoginPage={handleToggleLoginPage}/>
            )}
        </div>
    );
};

export default Authentication;
