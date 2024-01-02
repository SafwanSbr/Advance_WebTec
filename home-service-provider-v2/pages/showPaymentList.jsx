import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import NavBar from './Layout/navbar';
import Layout from './Layout/layout';
import Link from 'next/link';
import { render } from 'react-dom';
import UpdateAdmin from './updateAdmin';
import { useNavigate } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const ShowPaymentList = () => {
    const [adminList, setAdminList] = useState([]);
    // const navigate = useNavigate();
    const [editable, setEditable] = useState(false);
    const route = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/payment/get', {
                    withCredentials: true,
                });
                console.log(response);
                setAdminList(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (id) => {
        // <Redirect to={{
        //     pathname: '/updateAdmin',
        //     state: { id: id }
        // }}
        // />
        // route.push(`/updateAdmin/${id}`);
        // setEditable(true);
        // render(<UpdateAdmin id={id} />);
        // <Link href={{
        //     pathname: '/updateAdmin',
        //     query: { id: id }
        // }}></Link>
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/payment/delete/${id}`, {
                withCredentials: true,
            });
            console.log(response);
            setAdminList(adminList.filter((admin) => admin.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handlePayment = async (id) => {
        try {
            const getRandomInt = (min, max) => {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            const response = await axios.post("http://localhost:3000/payment/insert", { id: getRandomInt(1, 1000), paymentType: "cash", paymentInfo: new Date() }, {
                withCredentials: true,
            });
            console.log(response);
            // setAdminList(adminList.filter((admin) => admin.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout status="user">
            <div className="flex flex-wrap justify-around">
                {adminList.map((admin) => (
                    <div key={admin.username} className="card bg-white shadow-md m-4 p-4 rounded-lg w-64">
                        <h2 className="text-xl text-gray-700 font-bold mb-2">{admin.name}</h2>
                        {/* <p className="text-black">Phone: {admin.phone}</p> */}
                        <p className="text-black">ID: {admin.id}</p>
                        <p className="text-black">Payment Type: {admin.paymentType}</p>
                        <p className="text-black">Payment Info: {admin.paymentInfo}</p>
                        {/* <p className="text-black">Type: {admin.type}</p>
                        <p className="text-black">Price: {admin.price}</p>
                        <p className="text-black">Available: {admin.isAvaliable}</p> */}
                        {/* <p className="text-gray-700">Password: {admin.password}</p> */}
                        <div className="flex justify-between mt-4">
                            {/* <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href={{
                                pathname: '/booking',
                                query: { id: admin.id } */}
                            {/* }}>Edit</Link> */}
                            {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEdit(admin.id)}>Edit</button> */}
                            {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => { navigate('updateAdmin', { replace: true, state: { id: admin.id } }) }}>Edit</button> */}
                            {/* <button className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handlePayment(admin.id)}>Payment</button> */}
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(admin.id)}>Cancel</button>
                            {/* {editable && <UpdateAdmin id={admin.id} />} */}
                            {/* <Link href={`/updateAdmin/${admin.id}`}> */}
                            {/* <a Link={`/updateAdmin/${admin.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</a> */}
                            {/* </Link> */}
                            {/* <button onClick={() => deleteAdmin(admin.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button> */}
                        </div>
                    </div>
                ))}
            </div>
        </Layout >
    );
};

export default ShowPaymentList;
