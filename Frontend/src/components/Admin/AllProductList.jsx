import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/slice/productsSlice';
import { Link, useNavigate } from 'react-router-dom';

const AllProductList = () => {
    const { products, status } = useSelector(state => state.products);
    const dispatch = useDispatch();
    const navigator = useNavigate()

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (status == 'loading') {
        return <div>Loading....</div>
    }

    return (
        <div className='flex justify-center flex-col items-center p-10'>
            <h1 className='text-3xl font-bold text-theme'>All Products</h1>
            <div className="py-10 w-full">
                <div className="text-end mb-8" onClick={()=>navigator("/addProduct")}>
                    <Link to='/addProduct' className='bg-theme text-white py-3 px-5'>+ Add Product</Link>
                </div>
                <table className='w-full'>
                    <tr className='bg-theme text-white'>
                        <th className='py-2'>Sr No.</th>
                        <th className='py-2'>Name</th>
                        <th className='py-2'>Description</th>
                        <th className='py-2'>Stocks</th>
                    </tr>
                    {products?.length && products.map((item, index) => {
                        return (
                            <tr key={index} className={`text-center ${index % 2 != 0 ? 'bg-red-200' : 'bg-white'} `}>
                                <td className='py-3'>{index + 1}</td>
                                <td className='py-3'>{item.name}</td>
                                <td className='py-3'>{item.description}</td>
                                <td className='py-3'>{item.stock}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}

export default AllProductList