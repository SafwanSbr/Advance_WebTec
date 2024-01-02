
import { useState } from 'react';
import Layout from "./Layout/layout";
import Title from "./Layout/title";
import axios from 'axios';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDOB] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const handleChangeFullName = (e) => {
        setName(e.target.value);
    };

    const handleChangeDOB = (e) => {
        setDOB(e.target.value);
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleChangePhone = (e) => {
        setPhone(e.target.value);
    };


    const handleChangeFile = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form validation
        if (!name || !email || !password || !dob || !username || !phone || !file) {
            console.log(name, email, password, username, dob, phone, file);
            setError('All fields are required');
        } else {

            try {
                postData()
                setError("user created successfully");
            } catch (e) {
                setError(e);
            }
            setName('');
            setDOB('');
            setEmail('');
            setPassword('');
            setUsername('');
            setPhone('');
            setFile(null);
            setError('');
        }
    };

    async function postData() {
        try {

            // const head = {
            //   headers: { 'content-type': 'application/x-www-form-urlencoded' },
            //   withCredentials: true,
            // };
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('phone', phone);
            formData.append('DOB', dob);
            formData.append('image', document.querySelector('#myfile').files[0]);
            console.log(formData);
            const response = await axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT + '/admin/signup/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                // withCredentials: true
            });

            const data = response.data;
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Title page="Registration"> </Title>
            <Layout>
                <h1>Registration Form</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Full Name</label>
                        <input type="text" name="fullName" value={name} onChange={handleChangeFullName} />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" name="email" value={email} onChange={handleChangeEmail} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" value={password} onChange={handleChangePassword} />
                    </div>
                    <div>
                        <label>Username</label>
                        <input type="text" name="username" value={username} onChange={handleChangeUsername} />
                    </div>
                    <div>
                        <label>DOB</label>
                        <input type="text" name="DOB" value={dob} onChange={handleChangeDOB} />
                    </div>
                    <div>
                        <label>Phone</label>
                        <input type="number" name="phone" value={phone} onChange={handleChangePhone} />

                    </div>

                    <div>
                        <label>Upload File</label>
                        <input type="file" name="myfile" id="myfile" onChange={handleChangeFile} />
                    </div>
                    {error && <p>{error}</p>}
                    <button type="submit">Register</button>
                </form>
            </Layout>
        </>
    );
};


