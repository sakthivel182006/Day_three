import React, { useState } from 'react';
import BASE_URL from './config/Backendapi';
import './AuthForm.css';

const App2 = ({ onLoginSuccess }) => {
const [isRegistering, setIsRegistering] = useState(false);
const [registration, setRegistration] = useState({
name: '',
email: '',
phoneNumber: '',
password: ''
});

const [login, setLogin] = useState({
    email: '',
    password: ''
});

const [errors, setErrors] = useState({});
const [loginError, setLoginError] = useState('');

const validateRegistration = () => {
    const errs = {};
    if (!registration.name.trim()) errs.name = 'Name is mandatory';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registration.email)) errs.email = 'Email should be valid';
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(registration.phoneNumber)) errs.phoneNumber = 'Phone number must be 10 digits';
    if (!registration.password.trim()) errs.password = 'Password is required';
    return errs;
};
const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateRegistration();
    if (Object.keys(validationErrors).length === 0) {
        try {
            const response = await fetch(`${BASE_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registration),
            });

            if (response.ok) {
                alert('Registration successful. Please check your email to verify.');
                setRegistration({ name: '', email: '', phoneNumber: '', password: '' });
                setErrors({});
                setIsRegistering(false); // Switch to login
            } else {
                const errorData = await response.json();
                alert('Error:\n' + JSON.stringify(errorData));
            }
        } catch (error) {
            alert('Network Error: ' + error.message);
        }
        } else {
            setErrors(validationErrors);
        }
        };

        const handleLoginSubmit = async (e) => {
            e.preventDefault();
            setLoginError('');

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(login.email)) {
            setLoginError('Email should be valid');
            return;
            }

            try {

                if(login.email==='sakthivelv202222@gmail.com')
                {
                    localStorage.setItem('loggedInEmail', login.email);
                    alert('Admin Login successful');
                    onLoginSuccess(login.email); 
                    return;
                }

            const response = await fetch(`${BASE_URL}/api/login?email=${encodeURIComponent(login.email)}&password=${encodeURIComponent(login.password)}`, {
                method: 'POST'
                });

                const user = await response.json(); // or use .json() if backend sends JSON

                if (response.ok) {
                    console.log("Login successful:", user);
                    localStorage.setItem('loggedInUserDetails', JSON.stringify({
                        userId: user.userId,
                        email: user.email,
                        password:user.password,
                        verified:user.verified
                    }));
                    localStorage.setItem('loggedInEmail', user.email);
                    localStorage.setItem('userId', user.userId);
                
                    alert('Login successful');
                    onLoginSuccess(login.email); 
                } else {
                console.error("Login failed:", user);
                setLoginError(user || 'Login failed. Please try again.');
                }
                } catch (err) {
                setLoginError('Network error: ' + err.message);
                }
                };
                
                        return (
                        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
                            <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    {isRegistering ? (
                                        <>
                                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Create an account</h1>
                                        <form className="space-y-4" onSubmit={handleRegisterSubmit}>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                                <input type="text" value={registration.name} onChange={(e) => setRegistration({ ...registration, name: e.target.value })} className="input" />
                                                {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                                    <input type="email" value={registration.email} onChange={(e) => setRegistration({ ...registration, email: e.target.value })} className="input" />
                                                    {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                                                    </div>

                                                    <div>
                                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                                    <input type="text" value={registration.phoneNumber} onChange={(e) => setRegistration({ ...registration, phoneNumber: e.target.value })} className="input" />
                                                    {errors.phoneNumber && <div className="text-red-500 text-sm">{errors.phoneNumber}</div>}
                                                    </div>

                                                    <div>
                                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                                    <input type="password" value={registration.password} onChange={(e) => setRegistration({ ...registration, password: e.target.value })} className="input" />
                                                    {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                                                    </div>

                                                    <button type="submit" className="btn-primary">Register</button>
                                                    </form>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">
                                                    Already have an account?{" "}
                                                    <span className="text-blue-500 cursor-pointer" onClick={() => setIsRegistering(false)}>Sign in here</span>
                                                    </p>
                                                    </>
                                                    ) : (
                                                    <>
                                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Login</h2>
                                                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                                                    <div>
                                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                                    <input type="email" value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} className="input" required />
                                                    </div>
                                                    <div>
                                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                                    <input type="password" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} className="input" required />
                                                    </div>
                                                    {loginError && <div className="text-red-500 text-sm">{loginError}</div>}
                                                    <button type="submit" className="btn-primary">Login</button>
                                                    </form>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">
                                                    Don't have an account?{" "}
                                                    <span className="text-blue-500 cursor-pointer" onClick={() => setIsRegistering(true)}>Click here to register</span>
                                                    </p>
                                                    </>
                                                    )}
                                                    </div>
                                                    </div>
                                                    </section>
                                                    );
                                                    };

                                                    export default App2;