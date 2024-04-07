import React, {useState} from 'react';
import axios from "axios";
import {ranks} from "../data";
import {useNavigate} from "react-router-dom";

const SeemsanSignup = () => {
    const [email, setEmail] = useState('');
    const [selectedRank, setSelectedRank] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSignUp = async (event) => { // Define handleSignUp as asynchronous
        event.preventDefault();
        // Your sign-up logic here
        console.log("Email:", email);
        console.log("Name:", name);
        console.log("Password:", password);

        try {
            const response = await axios.post('http://localhost:8085/newuser', { // Make a POST request to the sign-up endpoint
                email: email,
                name: name,
                rankk: selectedRank,
                password: password
            });
            console.log(response.data); // Log the response from the backend

            // After sign-up logic is done, you might want to clear the form fields
            setEmail('');
            setName('');
            setSelectedRank('')
            setPassword('');
            navigate('/Signin');
        } catch (error) {
            console.error('Error signing up:', error);
        }

        const handleSelectChange = (event) => {
            setSelectedRank(event.target.value);
        }
        console.log(handleSelectChange);

    };

    return (
        <div className="max-w-md mx-auto my-10 p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl mb-4">Sign Up</h2>
            <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                    <label className="block">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                    <label className="block">Select Rank:</label>
                    <select
                        value={selectedRank}
                        onChange={(e) => setSelectedRank(e.target.value)}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                    >
                        {ranks.map(rank => (
                            <option key={rank.id} value={rank.ranktype}>{rank.ranktype}</option>
                        ))}
                    </select>
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
            <p className="mt-4 text-center">Already have an account?
                <button onClick={() => navigate('/SignIn')} className="text-blue-500 focus:outline-none">
                    &nbsp;Login
                </button>
            </p>
            {/*<p className="mt-4 text-center">Already have an account? <button onClick={onToggleLoginPage}*/}
            {/*                                                                 className="text-blue-500 focus:outline-none">Login*/}
            {/*    here</button></p>*/}
        </div>

    );
};

export default SeemsanSignup;