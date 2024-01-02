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

const ShowUserList = () => {
    const [userList, setuserList] = useState([]);
    // const navigate = useNavigate();
    const [editable, setEditable] = useState(false);
    const route = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT + '/user/get', {
                    withCredentials: true,
                });
                console.log(response);
                setuserList(response.data);
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
            const response = await axios.delete(process.env.NEXT_PUBLIC_API_ENDPOINT + `/user/delete/${id}`, {
                withCredentials: true,
            });
            console.log(response);
            setuserList(userList.filter((admin) => admin.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout status="admin">
            <div className="flex flex-wrap justify-around">
                {userList.map((admin) => (
                    <div key={admin.username} className="card bg-white shadow-md m-4 p-4 rounded-lg w-64">
                        <h2 className="text-xl text-gray-700 font-bold mb-2">{admin.name}</h2>
                        <p className="text-gray-700">Phone: {admin.phone}</p>
                        <p className="text-gray-700">ID: {admin.id}</p>
                        <p className="text-gray-700">Email: {admin.email}</p>
                        <p className="text-gray-700">Date of Birth: {admin.DOB}</p>
                        <p className="text-gray-700">Username: {admin.username}</p>
                        {/* <p className="text-gray-700">Password: {admin.password}</p> */}
                        <div className="flex justify-between mt-4">
                            <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href={{
                                pathname: '/updateUser',
                                query: { id: admin.id }
                            }}>Edit</Link>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(admin.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default ShowUserList;
