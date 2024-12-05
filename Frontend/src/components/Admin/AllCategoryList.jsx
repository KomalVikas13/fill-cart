import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/slice/productsSlice';
import { Link } from 'react-router-dom';
import { BiTrash, BiTrashAlt } from 'react-icons/bi';

const AllCategoryList = () => {
    const { products, status } = useSelector(state => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (status == 'loading') {
        return <div>Loading....</div>
    }

    return (
        <div className='flex justify-center flex-col items-center p-10'>
            <h1 className='text-3xl font-bold text-theme'>All Categories</h1>
            <div className="py-10 w-full">
                <div className="text-end mb-8">
                    <Link to='/addCategory' className='bg-theme text-white py-3 px-5'>+ Add Category</Link>
                </div>
                <table className='w-full'>
                    <tr className='bg-theme text-white'>
                        <th className='py-2'>Sr No.</th>
                        <th className='py-2'>Name</th>
                        <th className='py-2'>Action</th>
                    </tr>
                    {products?.length && products.map((item, index) => {
                        return (
                            <tr key={index} className={`text-center ${index % 2 != 0 ? 'bg-red-200' : 'bg-white'} `}>
                                <td className='py-3'>{index + 1}</td>
                                <td className='py-3'>{item.name}</td>
                                <td className='py-3'>
                                    <Link>
                                        <div className="inline-flex justify-center items-center gap-2 bg-theme px-5 py-2 rounded-lg text-white">
                                            <BiTrashAlt />
                                            <p className='text-white m-0 inline'>Delete</p>
                                        </div>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}

export default AllCategoryList