import React, { useState } from 'react';
import axios from 'axios'; // Import Axios library
import { useNavigate } from 'react-router-dom';
import {producedchemicals} from "../data";

const Login = ({ onToggleSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);

        try {
            const response = await axios.post('http://localhost:8085/login', {
                email: email,
                password: password
            });
            console.log(response.data); // Log the response from the backend

            setEmail('');
            setPassword('');
            localStorage.setItem('isLoggedIn', true);
            sessionStorage.setItem('isLoggedIn', true);
            localStorage.setItem('loggedinuseremail', email);
            sessionStorage.setItem('loggedinuseremail', email);
            localStorage.setItem('loggedinuserrank', response.data.rankk);
            sessionStorage.setItem('loggedinuserrank', response.data.rankk);
            navigate('/ProviderDashboard');
            window.location.reload();
        } catch (error) {
            console.error('Error logging in:', error);
            if (error.response && error.response.status === 401) {
                if (window.confirm('Wrong email or password. Please try again.')) {
                    setEmail('');
                    setPassword('');
                }
            } else {
                alert('An unexpected error occurred. Please try again later.');
                setEmail('');
                setPassword('');
            }
        }
    };

    return (
        <div>
            <div className="max-w-md mx-auto bg-white my-4 p-4 border rounded-lg shadow-lg">
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
            {/*<h2>Login</h2>*/}
            {/*<form onSubmit={handleLogin}>*/}
            {/*    <div>*/}
            {/*        <label>Email:</label>*/}
            {/*        <input*/}
            {/*            type="email"*/}
            {/*            value={email}*/}
            {/*            onChange={(e) => setEmail(e.target.value)}*/}
            {/*            required*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <label>Password:</label>*/}
            {/*        <input*/}
            {/*            type="password"*/}
            {/*            value={password}*/}
            {/*            onChange={(e) => setPassword(e.target.value)}*/}
            {/*            required*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <button type="submit">Login</button>*/}
            {/*</form>*/}
            {/*<p>New here? <button onClick={onToggleSignUp}>Sign up here</button></p>*/}
        </div>
    );
};

const SignUp = ({onToggleLoginPage}) => {
    const [compname, setCompname] = useState('');
    let [rankk, setRankk] = useState('');
    const [email, setEmail] = useState('');
    const [selectedChemicals, setSelectedChemicals] = useState([]);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    // const navigate = useNavigate();

    const handleCheckboxChange = (e, chemicalName) => {
        if (e.target.checked) {
            setSelectedChemicals([...selectedChemicals, chemicalName]);
        } else {
            setSelectedChemicals(selectedChemicals.filter(name => name !== chemicalName));
        }
    };


    const handleSignUp = async (event) => {
        event.preventDefault();
        // Your sign-up logic here
        console.log("Email:", email);
        console.log("Name:", name);
        console.log("Password:", password);
        rankk = 'Raw materials provider'
        const selectedChemicalsString = selectedChemicals.join(', ');
        try {
            const response = await axios.post('http://localhost:8085/newprovidersignup', { // Make a POST request to the sign-up endpoint
                provideremail: email,
                providername:  name,
                providerComp: compname,
                rankk: rankk,
                rawmaterialsname: selectedChemicalsString,
                password: password
            });
            console.log(response.data);
            const response1 = await axios.post('http://localhost:8085/newuser',{
                email: email,
                name: name,
                rankk: rankk,
                password: password
            });
            console.log(response1.data);

            setEmail('');
            setName('');
            setRankk('')
            setCompname('');
            setPassword('');
            onToggleLoginPage();
        } catch (error) {
            console.error('Error signing up:', error);
        }

        const handleSelectChange = (event) => {
            // setSelectedRank(event.target.value);
        }
        console.log(handleSelectChange);

    };

    return (
        <div>
            <div className="max-w-6xl mx-auto p-4 bg-white my-4 mb-4 border rounded-lg shadow-lg">
                <h2 className="text-2xl mb-4">Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <div>
                        <label className="block">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 mb-2 border rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 mb-2 border rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block">Company's Name:</label>
                        <input
                            type="text"
                            value={compname}
                            onChange={(e) => setCompname(e.target.value)}
                            required
                            className="w-full px-4 py-2 mb-2 border rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <label className="block my-2">Select Chemicals type you provide with:</label>
                    <div className="checkbox-columns grid grid-cols-4 gap-4">
                        {producedchemicals.slice(1).map(chem => (
                            <label key={chem.id} className="flex flex-col items-center">
                                <input
                                    type="checkbox"
                                    required
                                    value={chem.name}
                                    onChange={(e) => handleCheckboxChange(e, chem.name)}
                                    checked={selectedChemicals.includes(chem.name)}
                                    className="mr-2 transform scale-150"
                                />
                                <div className="">{chem.name}</div>
                            </label>
                        ))}
                    </div>

                    <div>
                        <label className="block">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mb-2 border rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button type="submit"
                            className="w-72 bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-blue-700">
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center">Already have an account? <button onClick={onToggleLoginPage}
                                                                                 className="text-blue-500 focus:outline-none">Login
                    here</button></p>
            </div>
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
                <Login onToggleSignUp={handleToggleSignUp} />
            ) : (
                <SignUp onToggleLoginPage={handleToggleLoginPage} />
            )}
        </div>
    );
};

export default Authentication;
