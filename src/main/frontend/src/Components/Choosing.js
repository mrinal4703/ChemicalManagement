import React from 'react';
import {Link} from "react-router-dom";
import {chemord, rawmat} from "../Assets/images";

const Choosing = () => {
    return (
        <div className={'my-4'}>
            <h2 className="text-2xl mb-4">Choose your Sign Up type</h2>
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-2 gap-10 my-3">
                    <Link to="/RawMaterialProvider">
                        <button>
                            <div className="h-96 w-96 bg-white rounded-lg shadow-lg drop-shadow-lg flex flex-col justify-center items-center">
                                <img src={rawmat} className={'p-2 h-max self-center'} alt="Raw Material Provider"/>
                                <h2 className="text-lg">Sign up as Raw Material Provider</h2>
                            </div>
                        </button>
                    </Link>
                    <Link to="/CompanySignup">
                        <button>
                            <div className="h-96 w-96 bg-white rounded-lg shadow-lg drop-shadow-lg flex flex-col justify-center items-center">
                                <img src={chemord} className={'px-2 pb-2 h-max self-center rounded'}  alt="Company Order"/>
                                <h2 className="absolute bottom-2 align-middle text-lg flex justify-center w-full">Sign
                                    up as
                                    a copmany, to order chemicals</h2>
                            </div>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
);
};

export default Choosing;
