import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BiTrashAlt } from 'react-icons/bi';
import { fetchAllUsers } from '../../redux/slice/userSlice';

const AllUsers = () => {
    const { profile, status, users } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    useEffect(() => {
        dispatch(fetchAllUsers(profile.token));
    }, [dispatch]);

    if (status == 'loading') {
        return <div>Loading....</div>
    }

    return (
        <div className='flex justify-center flex-col items-center p-10'>
            <h1 className='text-3xl font-bold text-theme'>All Users</h1>
            <div className="py-10 w-full">
                <table className='w-full'>
                    <tr className='bg-theme text-white'>
                        <th className='py-2'>Sr No.</th>
                        <th className='py-2'>Name</th>
                        <th className='py-2'>Phone No.</th>
                        <th className='py-2'>Email</th>
                        <th className='py-2'>Address</th>
                        <th className='py-2'>Action</th>
                    </tr>
                    {users?.length && users.map((item, index) => {
                        return (
                            <tr key={index} className={`text-center ${index % 2 != 0 ? 'bg-red-200' : 'bg-white'} `}>
                                <td className='py-3'>{index + 1}</td>
                                <td className='py-3'>{item.userId}</td>
                                <td className='py-3'>{item.fullName}</td>
                                <td className='py-3'>{item.phoneNumber}</td>
                                <td className='py-3'>{item.email}</td>
                                <td className='py-3'>{item.address}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}

export default AllUsers