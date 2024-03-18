import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import jsPDF from 'jspdf';
import axios from 'axios';

const Report = () => {
    const {id} = useParams();
    const [chemicalReport1, setChemicalReport1] = useState([]);

    useEffect(() => {
        const fetchChemicalReport = async () => {
            try {
                const response = await axios.get(`http://localhost:8085/getreport/${id}`);
                console.log('API Response:', response.data); // Log API response
                setChemicalReport1(response.data);
                const pdf = new jsPDF();
            } catch (error) {
                console.error('Error fetching chemical report', error);
            }
        };

        fetchChemicalReport();
    }, []);

    return (
        <div>
            <h1 className="text-3xl my-2">Assessment of Production</h1>
            <hr className="align-middle my-4 mx-auto w-5/6"></hr>
            <p>Report ID: {id}</p>
            {chemicalReport1.map(report => (
                    <div>
                        <p>Name: {report.name}</p>
                        <p>Expiry: {report.expiry_date}</p>
                        <p>Hazarduous: {report.hazarduous}</p>
                        <p>Nature: {report.nature}</p>
                        <p>pH: {report.ph}</p>
                        <p>Production Date: {report.production_date}</p>
                        <p>Quantity: {report.quantity} {report.quantity_type}</p>
                        <p>Quantity Type: {report.quantity_type}</p>
                        <p>Volatility: {report.volatility}</p>
                        <p>Persistence: {report.persistence}</p>
                        <p>Toxicity: {report.toxicity}</p>
                    </div>
                )
            )}
        </div>
    );
};

export default Report;
