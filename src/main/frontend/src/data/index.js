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

export const assessnfo = [
    {
        id:1,
        intro: 'This interface displays a breakdown of chemicals yet to be assessed alongside those that have already undergone assessment. It provides a comprehensive overview including the name of each chemical, its production quantity from raw materials, and its current assessment status. A button is available for automatic assessment, which will update the status to "Assessed" once completed by the machines.',
        how: 'The "how" section provides details on the parameters used for assessment and the criteria for categorizing chemicals during the assessment process.'
    }
]

export const inventorynfo =[
    {
        id: 1,
        intro: 'This interface features different buttons tailored to various categories of hazardous chemicals kept separately. By default, all chemicals are displayed together. However, depending on their storage silos, physically hazardous chemicals can be viewed separately by clicking the "Physical Hazardous" button. Similarly, environmentally hazardous chemicals are accessible by clicking the "Environmental Hazardous" button, and health-related hazardous chemicals by selecting the "Health Hazardous" button. Lastly, chemicals with the least to no hazardous properties can be viewed by clicking the "Least to Non-Hazardous" button. Clicking on the "All" button restores the default display, showing all chemicals in the inventory together.',
        report: 'The table shows you the complete data about each chemical like when was it made, when will it expire, pH level, Nature hazard type and quanitity produced. It provides two types of reports as well, firstly, is a copy for Seemsan\'s use, and second for to be delivered to the company that gave order for chemicals, along with the order stock for them. '
    }
]

export const dashfo = [
    {
        id: 1,
        intro: 'This interface encompasses all functionalities required within the company, ranging from managing inventory to tracking and ordering raw materials, scheduling production, assessing production, and managing delivery. Depending on an individual\'s rank within the company, they will be provided with specific functionalities to work on. However, all functionalities will be monitored by the CEO to ensure smooth operation.',
        body: 'Each cards depicts and redirects to different pages for these functionalities each. Depending upon ranks, the functionalities provided are:',
        asses: 'The Assessor will have the authority to both schedule production activities and assess the production process.',
        distr: 'The Distributor will have the capability to check, manage, and oversee the distribution and delivery of chemicals to registered companies.',
        inveman: 'The Inventory Manager will have the ability to both manage inventory and track and order raw materials as needed, according to the requirements of the company.'
    }
]

export const trackfo = [
    {
        id: 1,
        intro: 'This interface consists of two tables. The first table lists all the registered raw material providers with Seemsan, along with the range of raw materials they offer for chemical production. If there is a need to order raw materials, simply place an order using the order portal located in the bottom right corner. Specify the raw materials needed for each chemical and their quantities. You can select the provider from the above table and place your order. Your order will remain pending until it is delivered from the provider\'s side.',
        next: 'The second table displays all the orders placed along with their respective status. Once the status of an order changes to "Ready", the particular raw material can be sent for producing the desired chemical.'
    }
]

export const schedfo = [
    {
        id: 1,
        intro: 'This interface primarily focuses on scheduling the production of chemicals. It consists of two tables. The first table, which can be hidden or viewed as needed, lists the chemicals that need to be produced. Production for a particular chemical can be initiated by using the "Start Production" portal located at the bottom right corner, where the chemical name is selected. Once initiated, the production entry will be displayed in the second table. The status will show as "Pending" as it represents the assessment status.',
        prod: 'The second table lists the chemical name, quantity produced for raw materials, production date, and status for the chemicals whose production has started and is ready to be assessed.'
    }
]

export const ordfo = [
    {
        id: 1,
        intro: 'This interface is equipped with a calculator that calculates the required amount based on density for producing orders or deliveries of chemicals. Since delivery is conducted on a kilogram basis, this calculator is extremely beneficial as it stores the density for all the chemicals listed. Two portals are available in the bottom right corner: "Inventory" and "Generate Delivery."',
        inv: 'Inventory. This portal redirects to a new page for a quick check to see if enough quantity of the particular chemical is present for delivery.',
        gen: 'Generate Delivery. This portal enables you to generate a delivery according to your preferences and start the order delivery process. You can select the desired chemical, enter the calculated quantity in kilograms, and submit the order to deliver the chemicals to the designated delivery location.',
        trck: 'For order requests, you can check from the icon above the calculator, indicated by the truck symbol, to view which orders are pending or have been delivered.'
    }
]

export const biodata ='Discover our extensive selection of chemicals, delivered with precision and accompanied by thorough documentation, ensuring a seamless experience from order to delivery.';

export const rawbio = 'We greatly appreciate your partnership with our company. We would like to inform you that we will be providing you with a comprehensive list of orders for raw materials. Your continuous support is invaluable to us, and we look forward to furthering our collaboration for mutual success.';
export const rawbio1 = 'Here runs the list of orders.   ';
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