import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../config/Backendapi';

const AvailablePolicy = () => {
const [policies, setPolicies] = useState([]);
const [showForm, setShowForm] = useState(false);
const [selectedPolicyId, setSelectedPolicyId] = useState(null);
const [formData, setFormData] = useState({
    name: '',
    phoneNumber: ''
});

const loggedInEmail = localStorage.getItem('loggedInEmail');

useEffect(() => {
    axios.get(`${BASE_URL}/api/policies`)
    .then(response => setPolicies(response.data))
    .catch(error => console.error('Error fetching policies:', error));
    }, []);

    const handleApplyClick = (policyId) => {
    setSelectedPolicyId(policyId);
    setShowForm(true);
    };

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const customerData = {
    name: formData.name,
    email: loggedInEmail,
    phoneNumber: formData.phoneNumber,
    policyNumber: selectedPolicyId
    };

    try {
    await axios.post(`${BASE_URL}/api/customers`, customerData);
    alert("Customer applied for policy successfully!");
    setShowForm(false);
    setFormData({ name: '', phoneNumber: '' });
    } catch (error) {
    console.error('Error submitting form:', error);
    alert('Failed to apply for the policy.');
    }
    };

    return (
    <div style={{ padding: '20px' }}>
    <h2>Logged In Email: <span style={{ color: 'green' }}>{loggedInEmail}</span></h2>

    <h3>Available Policies</h3>
    <ul style={{ listStyle: 'none', padding: 0 }}>
    {policies.map(policy => (
    <li key={policy.policyId} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
    <strong>{policy.policyName}</strong><br />
    {policy.description}<br />
    Coverage: ₹{policy.coverageAmount} | Premium: ₹{policy.premium}<br />
    <button onClick={() => handleApplyClick(policy.policyId)}>Apply This Policy</button>
    </li>
    ))}
    </ul>

    {showForm && (
    <form onSubmit={handleSubmit} style={{ marginTop: '30px', border: '1px solid black', padding: '20px', width: '400px' }}>
    <h3>Apply for Policy ID: {selectedPolicyId}</h3>
    <div>
    <label>Customer Name:</label><br />
    <input
    type="text"
    name="name"
    value={formData.name}
    onChange={handleChange}
    required/>
    </div>
    <div>
        <label>Email (auto-filled):</label><br />
        <input
        type="email"
        name="email"
        value={loggedInEmail}
        readOnly
        style={{ backgroundColor: '#eee' }}/>
        </div>
        <div>
        <label>Phone Number:</label><br />
        <input
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
        pattern="\d{10}"
        title="Enter 10-digit phone number"/>
        </div>
        <div>
            <label>Policy Number:</label><br />
            <input
            type="text"
            value={selectedPolicyId}
            readOnly
            style={{ backgroundColor: '#eee' }}/>
            </div>
            <button type="submit">Submit Application</button>
            </form>
            )}
            </div>
            );
            };

            export default AvailablePolicy;
            