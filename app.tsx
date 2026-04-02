import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Sample Data
const sampleCustomers = [
    { id: 1, name: 'Customer A', email: 'customerA@example.com' },
    { id: 2, name: 'Customer B', email: 'customerB@example.com' }
];

const sampleVendors = [
    { id: 1, name: 'Vendor A', email: 'vendorA@example.com' },
    { id: 2, name: 'Vendor B', email: 'vendorB@example.com' }
];

// Function to calculate GST
const calculateGST = (amount, state) => {
    const cgst = state === 'Haryana' ? amount * 0.09 : 0; // 9% CGST for Haryana
    const sgst = state === 'Haryana' ? amount * 0.09 : 0; // 9% SGST for Haryana
    const igst = state !== 'Haryana' ? amount * 0.18 : 0; // 18% IGST for others
    return { cgst, sgst, igst };
};

// Function to get current financial year
const getCurrentFinancialYear = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth(); // January is 0
    return month > 3 ? year : year - 1; // Financial year starts from April
};

const App = () => {
    const [customers, setCustomers] = useState(() => {
        return JSON.parse(localStorage.getItem('customers')) || sampleCustomers;
    });

    const [vendors, setVendors] = useState(() => {
        return JSON.parse(localStorage.getItem('vendors')) || sampleVendors;
    });

    useEffect(() => {
        localStorage.setItem('customers', JSON.stringify(customers));
        localStorage.setItem('vendors', JSON.stringify(vendors));
    }, [customers, vendors]);

    return (
        <Router>
            <div className="container mx-auto p-5">
                <h1 className="text-2xl font-bold">ERP System</h1>
                <Switch>
                    {/* Define routes for different modules here */}
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/customers" component={CustomerManagement} />
                    <Route path="/vendors" component={VendorManagement} />
                    {/* Add other routes as needed */}
                </Switch>
            </div>
        </Router>
    );
};

const Dashboard = () => (<div>Dashboard Component</div>);
const CustomerManagement = () => (<div>Customer Management Component</div>);
const VendorManagement = () => (<div>Vendor Management Component</div>);

export default App;