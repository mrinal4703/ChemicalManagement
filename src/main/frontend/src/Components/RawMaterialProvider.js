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
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>New here? <button onClick={onToggleSignUp}>Sign up here</button></p>
        </div>
    );
};

const SignUp = ({ onToggleLoginPage }) => {
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
            const response = await axios.post('http://localhost:8085/newcompanysignup', { // Make a POST request to the sign-up endpoint
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
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Company's Name:</label>
                    <input
                        type="text"
                        value={compname}
                        onChange={(e) => setCompname(e.target.value)}
                        required
                    />
                </div>
                <label>Select Chemicals type you provide with:</label>
                <div className="checkbox-columns">
                    {producedchemicals.map(chem => (
                        <label key={chem.id} className="checkbox-label">
                            <input
                                type="checkbox"
                                value={chem.name}
                                onChange={(e) => handleCheckboxChange(e, chem.name)}
                                checked={selectedChemicals.includes(chem.name)}
                            />
                            {chem.name}
                        </label>
                    ))}
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <button onClick={onToggleLoginPage}>Login here</button></p>
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
