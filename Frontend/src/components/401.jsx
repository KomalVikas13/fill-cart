import { Link } from 'react-router-dom'
import unauthorized from '../assets/401.png'
const Unauthorized = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col py-10'>
            <img src={unauthorized} className='lg:object-center md:h-full' alt="" />
            <Link to='/' className='bg-theme py-2 px-5 text-white hover:scale-105 transition-all duration-500'>Go Back</Link>
        </div>
    )
}

export default Unauthorized