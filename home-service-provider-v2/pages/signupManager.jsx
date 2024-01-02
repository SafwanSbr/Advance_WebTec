import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Signup = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        DOB: '',
        password: '',
        username: '',
        address: '',
        myfile: null,
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        setFormData({ ...formData, myfile: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // // Perform validation here
        // if (!formData.name || !formData.email || !formData.phone || !formData.dob || !formData.password || !formData.username || !formData.image) {
        //     setError('Please fill in all fields');
        //     return;
        // }


        try {
            console.log('formData', formData);
            const response = await axios.post('http://localhost:3000/manager/signup', formData,
                {
                    headers: { 'content-type': 'multipart/form-data' }
                    // withCredentials: true,
                });
            console.log(response.data);

            if (response.status === 201) {
                // Redirect to login page
                router.push('/signin');
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error:', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error:', error.message);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error:', error.message);
            }
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     // Perform validation here
    //     if (!formData.name || !formData.email || !formData.phone || !formData.dob || !formData.password || !formData.username || !formData.image) {
    //         setError('Please fill in all fields');
    //         return;
    //     }

    //     // Create form data object
    //     const data = new FormData();
    //     data.append('name', formData.name);
    //     data.append('email', formData.email);
    //     data.append('phone', formData.phone);
    //     data.append('dob', formData.dob);
    //     data.append('password', formData.password);
    //     data.append('username', formData.username);
    //     data.append('image', formData.image);

    //     try {
    //         // Send data to signup API
    //         const response = await axios.post('http://localhost:3000/admin/signup', data,
    //             {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data'
    //                 }
    //                 // withCredentials: true
    //             });
    //         if (response.status === 200) {
    //             // Redirect to login page
    //             router.push('/login');
    //         } else {
    //             setError('Signup error');
    //         }
    //     } catch (error) {
    //         setError('Signup error');
    //     }
    // };

    return (
        <div>
            <h1>Signup Manager</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="text" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Phone:
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Date of Birth:
                    <input type="text" name="DOB" value={formData.dob} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Username:
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </label>
                <br />
                <br />
                <label>
                    Address:
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Image:
                    <input type="file" name="myfile" onChange={handleImageUpload} />
                </label>
                <br />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
