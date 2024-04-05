import React, { useState } from 'react';
import { GiChemicalDrop } from "react-icons/gi";
import Hexagon from 'react-hexagon';
import { Link } from 'react-router-dom';
import {ship, supply} from "../Assets/images";

const WelcomePage = () => {
    const [toggle, setToggle] = useState(false);
    const handleItemClick = () => {
        setToggle(true);
    };

    return (
        <div>
            <div className='w-screen h-[calc(100vh-5rem)]'>
                <div className="bg-cover bg-center bg-no-repeat opacity-70 bg-opacity-40 h-full w-full bg-[url('/src/Assets/images/bubbles.png')]">
                    {/*style={{backgroundImage: 'url(https://media.istockphoto.com/id/1500368452/photo/molecular-structure-lights-concept.webp?b=1&s=170667a&w=0&k=20&c=6nQ-GdsmMcpyAYzK6GdpUZWCNnbNf1s4lTae9rL9AlI=)'}}*/}
                    <div className="container mx-auto flex flex-col my-auto align-middle h-full">
                        <div className='my-auto mx-auto lg:mx-0 w-10/12 lg:w-2/5'>
                            <h1 className="text-7xl mb-4 text-black">Global Chemical Supplier & Distributor</h1>
                            <p className="text-2xl mb-8">Top-ranked international supplier & distributor of chemicals,
                                solvents & intermediates worldwide</p>
                            <div className='flex items-center px-40'>
                                <Link to="/Signup" onClick={handleItemClick}>
                                    <button
                                        className='rounded px-10 py-3 text-white bg-blue-500 hover:bg-blue-600'>Sign up
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto text-center my-8">
                <h2 className="text-4xl font-bold pb-10 text-[#072b52]" >Chemical Solutions at Your Fingertips</h2>
            </div>
            <div className="flex items-center justify-center my-8">
                <img src={supply}
                     alt="Your Image" className="mr-4 w-[400px] h-[200px]" style={{width: '400px', height: '200px'}}/>
                <div>
                    <h2 className="text-4xl font-bold mb-4 text-[#406fa1]">Strengthen Your Supply Chain</h2>
                    <p className="text-1xl">The largest international supplier & distributor of chemicals, composites, and plastics.</p>
                </div>
            </div>

            <div className="container mx-auto my-8 flex items-center">
                <img className="w-1/2"
                     src={ship}
                     alt="Image 1"/>
                <img className="w-1/2"
                     src="https://thechemco.com/wp-content/uploads/2023/07/AdobeStock_312877949_scaled-1-1024x682-1.png"
                     alt="Image 2"/>
            </div>
            <div className="container mx-auto my-8 text-center">
                <h2 className="text-4xl font-bold mb-4">Our Products</h2>
                <p className="text-lg mb-8">We partner with manufacturers both domestically and internationally to
                    provide cost-effective alternatives focusing on the needs of businesses of all sizes.</p>

                <div className="flex justify-center flex-wrap">
                    <div className="hexagon-container relative w-[200px] h-[200px] p-[20px]"
                         // style={{width: '200px', height: '200px', padding: '20px', position: 'relative'}}
                    >
                        <GiChemicalDrop
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white"/>
                        <Hexagon className={'w-max h-max'} style={{fill: '#4e80b5'}}/>
                        <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-800">Chemical Name
                            1</p>
                    </div>
                    <div className="hexagon-container relative w-[200px] h-[200px] p-[20px]"
                         // style={{width: '200px', height: '200px', padding: '20px', position: 'relative'}}
                    >
                        <GiChemicalDrop
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white"/>
                        <Hexagon className={'w-max h-max'} style={{fill: '#4e80b5'}}/>
                        <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-800">Chemical Name
                            2</p>
                    </div>
                    <div className="hexagon-container relative w-[200px] h-[200px] p-[20px]"
                         // style={{width: '200px', height: '200px', padding: '20px', position: 'relative'}}
                    >
                        <GiChemicalDrop
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white"/>
                        <Hexagon className={'w-max h-max'} style={{fill: '#4e80b5'}}/>
                        <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-800">Chemical Name
                            3</p>
                    </div>
                    <div className="hexagon-container relative w-[200px] h-[200px] p-[20px]"
                         // style={{width: '200px', height: '200px', padding: '20px', position: 'relative'}}
                    >
                        <GiChemicalDrop
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white"/>
                        <Hexagon className={'w-max h-max'} style={{fill: '#4e80b5'}}/>
                        <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-800">Chemical Name
                            4</p>
                    </div>
                </div>
                <div className="flex justify-center flex-wrap">
                    <div className="hexagon-container relative w-[200px] h-[200px] p-[20px]"
                         // style={{width: '200px', height: '200px', padding: '20px', position: 'relative'}}
                    >
                        <GiChemicalDrop
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white"/>
                        <Hexagon className={'w-max h-max'} style={{fill: '#4e80b5'}}/>
                        <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-800">Chemical Name
                            5</p>
                    </div>
                    <div className="hexagon-container relative w-[200px] h-[200px] p-[20px]"
                         style={{width: '200px', height: '200px', padding: '20px', position: 'relative'}}>
                        <GiChemicalDrop
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white"/>
                        <Hexagon className={'w-max h-max'} style={{fill: '#4e80b5'}}/>
                        <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-800">Chemical Name
                            6</p>
                    </div>
                    <div className="hexagon-container relative w-[200px] h-[200px] p-[20px]"
                         style={{width: '200px', height: '200px', padding: '20px', position: 'relative'}}>
                        <GiChemicalDrop
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white"/>
                        <Hexagon className={'w-max h-max'} style={{fill: '#4e80b5'}}/>
                        <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-800">Chemical Name
                            7</p>
                    </div>
                    <div className="hexagon-container"
                         style={{width: '200px', height: '200px', padding: '20px', position: 'relative'}}>
                        <GiChemicalDrop
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white"/>
                        <Hexagon style={{width: '100%', height: '100%', fill: '#4e80b5'}}/>
                        <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-800">Chemical Name
                            8</p>
                    </div>
                </div>
            </div>


            <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex">
                        <ul className="grid grid-rows-4 items-start mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                            <li>
                                <a href="" className="hover:underline me-4 md:me-6">About</a>
                            </li>
                            <li>
                                <a href="" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="" className="hover:underline me-4 md:me-6">Licensing</a>
                            </li>
                            <li>
                                <a href="" className="hover:underline me-4 md:me-6">Contact</a>
                            </li>
                        </ul>
                        <ul className="grid grid-rows-4 items-start mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                            <li>
                                <Link to="/RawMaterialProvider" onClick={handleItemClick}>
                                    <button
                                        className="hover:underline me-4 md:me-6">Signup as Raw Material Provider
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/CompanySignup" onClick={handleItemClick}>
                                    <button
                                        className="hover:underline me-4 md:me-6">Signup as Company to order Chemicals
                                    </button>
                                </Link>
                            </li>
                            {/*<li>*/}
                            {/*    <a href="" className="hover:underline me-4 md:me-6">Licensing</a>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*    <a href="" className="hover:underline me-4 md:me-6">Contact</a>*/}
                            {/*</li>*/}
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="/"
                                                                                                              className="hover:underline">Seemsan™</a>. All Rights Reserved.</span>
                </div>
            </footer>
        </div>


    );
};

export default WelcomePage;
