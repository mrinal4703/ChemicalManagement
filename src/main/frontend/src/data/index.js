import React from 'react';
export const ranks = [
    {
        id:1,
        ranktype: 'Select'
    },
    {
        id:2,
        ranktype: 'CEO'
    },
    {
        id:3,
        ranktype: 'Assesser'
    },
    {
        id:4,
        ranktype: 'Distributor'
    },
    {
        id:5,
        ranktype: 'Inventory Manager'
    },
    {
        id:6,
        ranktype: 'Company'
    }
]

export const comptype = [
    {
        id:1,
        type:'Select your company type'
    },
    {
        id:2,
        type:'Agrochemical Companies'
    },
    {
        id:3,
        type:'Pharmaceutical Manufacturers'
    },
    {
        id:4,
        type:'Water Treatment Company'
    },
    {
        id:5,
        type:'Laboratory Chemical Dealers'
    },
    {
        id:6,
        type:'Educational Institute'
    },
    {
        id:7,
        type:'Cleaning and Hygiene Dwellers'
    },
    {
        id:8,
        type:'Construction Related'
    },
    {
        id:9,
        type:'Agriculture'
    }
]

export const quanttype =[
    {
        id:1,
        type:'kg'
    },
    {
        id:2,
        type:'ltrs'
    }

]

export const hazard = [
    {
        id:1,
        type:'Physical'
    },
    {
        id:2,
        type:'Environmental'
    },
    {
        id:3,
        type:'Health'
    },
    {
        id:4,
        type:'Least to none'
    }
]

export const producedchemicals = [
    {
        id:1,
        name:'Select chemicals'
    },
    {
        id:2,
        name:'Sulfuric Acid'
    },
    {
        id:3,
        name:'Chlorine'
    },
    {
        id:4,
        name:'Sodium Hydroxide (caustic soda)'
    },
    {
        id:5,
        name:'Ammonia'
    },
    {
        id:6,
        name:'Hydrogen'
    },
    {
        id:7,
        name:'Ethylene'
    },
    {
        id:8,
        name:'Propylene'
    },
    {
        id:9,
        name:'Benzene'
    },
    {
        id:10,
        name:'Toluene'
    },
    {
        id:11,
        name:'Xylene'
    },
    {
        id:12,
        name:'Polyethylene'
    },
    {
        id:13,
        name:'Polypropylene'
    },
    {
        id:14,
        name:'Polyvinyl Chloride (PVC)'
    },
    {
        id:15,
        name:'Polystyrene'
    },
    {
        id:16,
        name:'Styrene-Butadiene rubber'
    },
    {
        id:17,
        name:'Polyisoprene Rubber (IR)'
    },
    {
        id:18,
        name:'Nitrogen-based fertilizers (urea, ammonium nitrate)'
    },
    {
        id:19,
        name:'Phosphate fertilizers'
    },
    {
        id:20,
        name:'Potash'
    },
    {
        id:21,
        name:'Active Pharmaceutical Ingredients (APIs)'
    },
    {
        id:22,
        name:'Drug Intermediates (Pharmaceuticals)'
    },
    {
        id:23,
        name:'Fine Chemicals (Specialty Chemicals)'
    },
    {
        id:24,
        name:'Performance Chemicals (Specialty Chemicals)'
    },
    {
        id:25,
        name:'Aromatics (Petrochemicals)'
    },
    {
        id:26,
        name:'Olefins (Petrochemicals)'
    },
    {
        id:27,
        name:'Industrial Gases'
    }
]

export const biodata ='Discover our extensive selection of chemicals, delivered with precision and accompanied by thorough documentation, ensuring a seamless experience from order to delivery.';

export const rawbio = 'We greatly appreciate your partnership with our company. We would like to inform you that we will be providing you with a comprehensive list of orders for raw materials. Your continuous support is invaluable to us, and we look forward to furthering our collaboration for mutual success.';
export const rawbio1 = 'Here runs the list of orders.';
export const PhExplanation = () => {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">pH Explanation:</h3>
            <p className="mb-4">
                <ul>
                    <li>The pH scale measures acidity or alkalinity, ranging from 0 to 14.</li>
                    <li>A pH value below 7 indicates acidity, while above 7 indicates alkalinity.</li>
                    <li>Highly Acidic: pH below 3.5</li>
                    <li>Acidic: pH between 3.5 and 7</li>
                    <li>Basic: pH below 10.5</li>
                    <li>Highly Basic: pH above 10.5</li>
                </ul>
                <p>By examining the pH value, we can categorize substances into highly acidic, acidic, basic, or highly basic, providing insights into their chemical properties and potential applications.</p>
            </p>
        </div>
    );
};

export const concl = 'Hence, if the Volatility is high, its Physically hazardous, else, the Toxicity level is checked. If its Toxicity level is higher, then its Health hazardous, else, its highly persistent, which means its Environmentally hazardous. If neither of these parameters attains a value, its Least to none hazardous';

export const Volatility = () => {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">Volatility:</h3>
            <p className="mb-4">
                High volatility may indicate physical hazards such as flammability or explosiveness.
                Low volatility may indicate lower physical hazards but may still pose health or environmental risks if the chemical is toxic or persistent.
            </p>
        </div>
    );
};
export const Toxicity = () => {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">Toxicity:</h3>
            <p className="mb-4">
                High toxicity levels may indicate health hazards, including acute or chronic toxicity, carcinogenicity, mutagenicity, or reproductive toxicity.
                Low toxicity levels may suggest lower health hazards but may still pose risks depending on exposure levels and duration.
            </p>
        </div>
    );
};

export const Persistence = () => {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">Persistence:</h3>
            <p className="mb-4">
                Persistent chemicals that resist degradation may pose environmental hazards, such as bioaccumulation or long-term impacts on ecosystems.
                Non-persistent chemicals may pose fewer environmental hazards but could still cause short-term impacts if released in large quantities.
            </p>
        </div>
    );
};