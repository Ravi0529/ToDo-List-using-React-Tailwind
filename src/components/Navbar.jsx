import React from 'react'

const Navbar = () => {
    return (
        <div className='p-3'>
            <nav className='bg-[#1a1a1a] rounded-2xl'>
                <ul className='flex justify-around p-4 lg:p-3 text-white font-semibold font-mono text-2xl lg:text-xl'>
                    <li className='text-center hover:text-green-500 hover:font-bold transition-all duration-100 cursor-pointer'>Home</li>
                    <li className='hidden sm:block hover:text-green-500 hover:font-bold transition-all duration-100 cursor-pointer'>TaskIt: Your list</li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
