// import React from 'react'

// const Header = () => {
//     return (
//         <div className='w-full h-auto overflow-hidden bg-gray-200 p-5 pb-0'>
//             <div className="flex justify-around items-center">
//                 <div>
//                     <h1 className='text-7xl'>Up To</h1>
//                     <h1 className='text-7xl text-theme py-3 font-semibold'>35% <span className='text-black font-normal'>Discount</span></h1>
//                     <h4 className='text-2xl font-semibold'>Summer Look - 2024</h4>
//                     <p className='py-5 text-lg text-black'>New Very Trending & Fashionable Garments - 2025</p>
//                     <button className='py-3 px-7 border-black border-2 font-bold hover:bg-black hover:text-white'>Explore Now</button>
//                 </div>
//                 <div>
//                     <img className='' src="https://azim.commonsupport.com/Castro/assets/images/banner/banner-image-1.png" alt="" />
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default Header
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Header = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: false,
    };

    const slides = [
        {
            title: "Men's Collection",
            discount: "25%",
            description: "Explore the latest trends in men's fashion.",
            image: "https://azim.commonsupport.com/Castro/assets/images/banner/banner-image-2.png",
        },
        {
            title: "Women's Collection",
            discount: "30%",
            description: "Discover stylish and trendy women's wear.",
            image: "https://azim.commonsupport.com/Castro/assets/images/banner/banner-image-3.png",
        },
        {
            title: "Kids' Collection",
            discount: "35%",
            description: "Cute and comfy outfits for kids.",
            image: "https://azim.commonsupport.com/Castro/assets/images/banner/banner-image-1.png",
        },
    ];

    return (
        <div className="relative w-full h-auto overflow-hidden bg-gray-200">
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="relative flex flex-col md:flex-row justify-between items-center p-10 max-w-screen-lg mx-auto"
                    >
                        {/* Text Section */}
                        <div className="flex-1 mb-6 md:mb-0 md:pr-10">
                            <h1 className="text-5xl font-bold text-gray-800">{slide.title}</h1>
                            <h2 className="text-5xl text-red-500 py-4 font-semibold">
                                {slide.discount} <span className="text-gray-600 font-normal">Discount</span>
                            </h2>
                            <h4 className="text-lg font-medium text-gray-700 mb-6">{slide.description}</h4>
                            <button className="py-2 px-6 bg-red-500 text-white font-bold text-lg rounded-md hover:bg-red-700 transition">
                                Shop Now
                            </button>
                        </div>
                        {/* Image Section */}
                        <div
                            className="absolute top-0 right-0 flex justify-end items-start p-4"
                        >
                            <img
                                className="w-64 h-64 object-contain"
                                src={slide.image}

                            />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
};

export default Header;