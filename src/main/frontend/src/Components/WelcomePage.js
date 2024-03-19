import React, {useState} from 'react';
import {Link} from "react-router-dom";

const WelcomePage = () => {
    const[toggle , setToggle] = useState(false);
    const handleItemClick = () => {
        setToggle(true);
    };
    return (
        <div>
            <div>
                <Link to={'/RawMaterialProvider'} onClick={handleItemClick}>
                <h1 className={'text-sm'}> register as a raw material provider</h1>
            </Link>
            </div>
        </div>
    );
};

export default WelcomePage;