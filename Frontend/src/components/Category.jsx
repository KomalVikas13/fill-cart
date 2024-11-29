import React from 'react'
import category1 from '../assets/category-1.png';
import category2 from '../assets/category-2.png';
import category3 from '../assets/category-3.png';
import category4 from '../assets/category-4.png';

const Category = () => {
    return (
        <div className='w-screen bg-white p-5 lg:py-24 lg:px-32'>
            <div className='flex justify-center flex-col items-center'>
                <h1 className='text-2xl lg:text-3xl font-semibold'>All Categories</h1>
                <p className='text-gray-800 mt-2'>Follow the most popular trends and get exclusive items from castro shop</p>
            </div>
            <div className='flex lg:flex-row flex-col justify-center gap-20 items-center mt-10'>
                <div>
                    <div className="relative group w-64 h-64">
                        <img src={category1} alt="" className="w-full h-full object-cover" />
                        <div class="absolute inset-0 bg-[#f83734] opacity-75 rounded-full scale-0 group-hover:scale-100 transition-all duration-500"></div>
                    </div>

                    <p className="text-center font-semibold text-black mt-3">Womens Collection</p>
                </div>
                <div>
                    <div className="relative group w-64 h-64">
                        <img src={category2} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-[#f83734] opacity-75 rounded-full scale-0 group-hover:scale-100 transition-all duration-500"></div>
                    </div>
                    <p className="text-center font-semibold text-black mt-3">Kids Collection</p>
                </div>
                <div>
                    <div className="relative group w-64 h-64">
                        <img src={category4} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-[#f83734] opacity-75 rounded-full scale-0 group-hover:scale-100 transition-all duration-500"></div>
                    </div>
                    <p className="text-center font-semibold text-black mt-3">Gents Collection</p>
                </div>
            </div>
        </div>
    )
}

export default Category