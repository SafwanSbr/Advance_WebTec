import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const route = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const head = {
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                withCredentials: true,
            };
            const response = await axios.post('http://localhost:3000/admin/signin', { email, password }, head);
            console.log(response.data);
            route.push('showManagerList?status=manager');
        } catch (error) {
            console.error('Error signing in', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" className='text-black' value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <label>
                Password:
                <input type="password" className='text-black' value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Sign In</button>
        </form>
    );
};

export default LoginForm;