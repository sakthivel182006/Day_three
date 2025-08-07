import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../config/Backendapi';

const AvailableClaims = () => {
    const [userDetails, setUserDetails] = useState({});
    const [policies, setPolicies] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [claimForm, setClaimForm] = useState({
        customerId: '',
        policyNumber: '',
        claimType: '',
        claimAmount: '',
        incidentDate: '',
        description: '',
        status: 'Submitted',
        submissionDate: new Date().toISOString().split('T')[0],
        });

        useEffect(() => {
            const storedUser = localStorage.getItem('loggedInUserDetails');
            const useremail = localStorage.getItem('loggedInEmail');
            const loggedinuserid = localStorage.getItem('userId');
            if (storedUser && useremail) {
                const parsedUser = JSON.parse(storedUser);
                setUserDetails(parsedUser);
                fetchCustomerPolicies(useremail);
                }
                }, []);

                const fetchCustomerPolicies = async (loggedInEmail) => {
                    try {
                    const response = await axios.get(`${BASE_URL}/api/customers/email/${loggedInEmail}`);
                    if (Array.isArray(response.data)) {
                    setPolicies(response.data);
                    } else {
                    setPolicies([]);
                    }
                    } catch (error) {
                    console.error('Error fetching customer data:', error);
                    }
                    };
                    
                    const handleClaimClick = (policy) => {
                    setSelectedPolicy(policy);
                    setClaimForm({
                    ...claimForm,
                    customerId: userDetails.userId,
                    policyNumber: policy.policyNumber,
                    status: 'Submitted',
                    submissionDate: new Date().toISOString().split('T')[0],
                    });
                    };

                    const handleFormChange = (e) => {
                    setClaimForm({ ...claimForm, [e.target.name]: e.target.value });
                    };

                    const handleClaimSubmit = async (e) => {
                    e.preventDefault();
                    try {
                    const response = await axios.post(`${BASE_URL}/api/claims`, claimForm);
                    setMessage(`✅ Claim submitted successfully for policy ${claimForm.policyNumber}`);
                    setSelectedPolicy(null); // close form
                    } catch (error) {
                    setMessage(`❌ Failed to submit claim: ${error.response?.data?.message || error.message}`);
                    }
                    };

                    return (
                    <div className="container">
                    <h2>Available Policies for Claim</h2>
                    {message && <p style={{ color: 'green' }}>{message}</p>}

                    {policies.length > 0 ? (
                    <table border="1" cellPadding="10">
                    <thead>
                    <tr>
                    <th>Policy Number</th>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Claim Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {policies.map((policy, index) => (
                    <tr key={index}>
                    <td>{policy.policyNumber}</td>
                    <td>{policy.customerId}</td>
                    <td>{policy.name}</td>
                    <td>{policy.email}</td>
                    <td>{policy.phoneNumber}</td>
                    <td>
                    <button onClick={() => handleClaimClick(policy)}>
                    Apply Claim
                    </button>
                    </td>
                    </tr>
                    ))}
                    </tbody>
                    </table>
                    ) : (
                    <p>No policies available.</p>
                    )}

                    {selectedPolicy && (
                    <div style={{ marginTop: '30px' }}>
                    <h3>Claim Form for Policy: {selectedPolicy.policyNumber}</h3>
                    <form onSubmit={handleClaimSubmit}>
                    <input type="hidden" name="policyNumber" value={claimForm.policyNumber} />
                    <input type="hidden" name="customerId" value={claimForm.customerId} />
                    <input type="hidden" name="status" value="Submitted" />
                    <input type="hidden" name="submissionDate" value={claimForm.submissionDate} />

                    <div>
                    <label>Claim Type:</label>
                    <input
                    type="text"
                    name="claimType"
                    value={claimForm.claimType}
                    onChange={handleFormChange}
                    required/>
                    </div>

                    <div>
                        <label>Claim Amount:</label>
                        <input
                        type="number"
                        name="claimAmount"
                        value={claimForm.claimAmount}
                        onChange={handleFormChange}
                        required/>
                        </div>

                        <div>
                        <label>Incident Date:</label>
                        <input
                        type="date"
                        name="incidentDate"
                        value={claimForm.incidentDate}
                        onChange={handleFormChange}
                        required/>
                        </div>

                        <div>
                        <label>Description:</label>
                        <textarea
                        name="description"
                        value={claimForm.description}
                        onChange={handleFormChange}
                        required/>
                        </div>

                        <button type="submit">Submit Claim</button>
                        </form>
                        </div>
                        )}
                        </div>
                        );
                        };

                        export default AvailableClaims;
                        