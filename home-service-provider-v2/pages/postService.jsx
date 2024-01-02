import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from './Layout/layout';

const PostService = () => {
    const router = useRouter();
    const [id, setId] = useState(1);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [isAvailable, setIsAvailable] = useState(true);
    const [price, setPrice] = useState(0);
    const [formData, setFormData] = useState({
        id: 1,
        name: '',
        description: '',
        type: '',
        isAvailable: true,
        price: 0
    });
    const [error, setError] = useState('');

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    const handleChange = (e) => {
        let value = e.target.value;

        if (e.target.name === 'id' || e.target.name === 'price') {
            value = parseInt(value, 10);
        } else if (e.target.name === 'isAvailable') {
            value = value === 'true';
        }

        setFormData({ ...formData, [e.target.name]: value });
        setFormData({ ...formData, id: parseInt(10), isAvailable: true, price: 0 });
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };
    const handleTypeChange = (e) => {
        setType(e.target.value);
    };
    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    // const handleImageUpload = (e) => {
    //     setFormData({ ...formData, myfile: e.target.files[0] });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // // Perform validation here
        // if (!formData.name || !formData.email || !formData.phone || !formData.dob || !formData.password || !formData.username || !formData.image) {
        //     setError('Please fill in all fields');
        //     return;
        // }


        try {
            setFormData({ ...formData, id: parseInt(10), isAvailable: true, price: 0 });

            const response = await axios.post('http://localhost:3000/service/insert', { id: 5, name: name, description: description, type: type, isAvailable: true, price: price },
                {
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },

                    // headers: { 'content-type': 'multipart/form-data' },
                    withCredentials: true,
                });
            console.log(response.data);

            if (response.status === 201) {
                // Redirect to login page
                router.push('/showManagerList?status=manager');
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
        <Layout status="manager">
            <div>
                <h1>Create service</h1>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" className='text-black' name="name" value={name} onChange={handleNameChange} />
                    </label>
                    <br />
                    <label>
                        Description:
                        <input type="text" className='text-black' name="description" value={description} onChange={handleDescriptionChange} />
                    </label>
                    <br />
                    <label>
                        Type:
                        <input type="text" className='text-black' name="type" value={type} onChange={handleTypeChange} />
                    </label>
                    <br />
                    <label>
                        Price:
                        <input type="number" className='text-black' name="price" value={price} onChange={handlePriceChange} />
                    </label>
                    <br />

                    <button type="submit">Create</button>
                </form>
            </div>
        </Layout>
    );
};

export default PostService;
