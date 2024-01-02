import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from './Layout/layout';

const UpdateAdmin = ({ searchParams }) => {
    console.log('searchParams', searchParams);
    const router = useRouter();
    const { id } = router.query;
    console.log('id', id);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        DOB: '',
        username: '',
        password: '',
        filename: '',
    });

    useEffect(() => {
        // Fetch initial data using Axios
        axios.get(`http://localhost:3000/admin/get/${id}`, {
            withCredentials: true
        })
            .then(response => {
                const { name, phone, email, DOB, username, password, filename } = response.data;
                setFormData({ name, phone, email, DOB, username, password, filename });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [searchParams]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Update data using Axios
        axios.patch(`http://localhost:3000/admin/update/${id}`, formData, {
            withCredentials: true
        })
            .then(response => {
                console.log('Data updated successfully:', response.data);
                router.push('/showAdminList');
            })
            .catch(error => {
                console.error('Error updating data:', error);
            });
    };

    return (
        <Layout status="admin">
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" className='text-black' name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label>
                    Phone:
                    <input type="text" className='text-black' name="phone" value={formData.phone} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" className='text-black' name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label>
                    Date of Birth:
                    <input type="text" className='text-black' name="DOB" value={formData.DOB} onChange={handleChange} />
                </label>
                <label>
                    Username:
                    <input type="text" className='text-black' name="username" value={formData.username} onChange={handleChange} />
                </label>
                <label>
                    Password:
                    <input type="password" className='text-black' name="password" value={formData.password} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </Layout>
    );
};

export default UpdateAdmin;
