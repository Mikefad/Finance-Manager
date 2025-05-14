import React, { useState } from 'react'
import {AnimatePresence, motion } from 'framer-motion'
import Dataentry from './Dataentry'
import myimage from '../assets/myimage.jpg';
import {BarChart2, ShoppingBag, Users, Zap, Menu, Settings, User, TrendingUp} from 'lucide-react';
import {useNavigate, Link } from 'react-router-dom';

const SIDE_ITEMS = [{name: "Overview", icon: BarChart2, color:"#6366f1", path:"/"},
    {name: "Analytics", icon: TrendingUp, color:"#3B82F6", path:"/analytics"},
    {name: "Datapage", icon: Settings, color:"#6EE787", path:"/Data"},
    {name: "Profile", icon: User, color:"#EC4899", path:"/profile"}
] 

const Profile = ({ setLoggedin, onDataSubmitted}) => {

    const[Openform, setOpenform] = useState(false);

    const [isDropOpen, setDropOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('loggedin'); // Clear the login state
        setLoggedin(false);                  // Update app state
        navigate('/login');                 // Redirect to login page
    };
    
    const menuVariants = {
    open: {
        scaleY: [0, 1.2, 1],
        transition: {
        duration: 0.5,
        ease: "easeInOut"
        }
    }
    };

    const triggerRefresh = () => setRefreshTrigger(prev => prev + 1);

  return (
    
    <div className={`flex-1 overflow-auto ${isDropOpen && 'overflow-hidden'} relative z-15`}>
        <header className=' bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
        <div className='flex justify-between max-w-5xl mx-auto py-4 px-4 sm:px-6 lg:px-8 '>
            <h1 className=' text-2xl text-gray-100 font-semibold'>
            ℳdev
            </h1>

            <motion.button
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            onClick={ () => setDropOpen(!isDropOpen)}
            className="px-2 flex sm:hidden  rounded-full hover:bg-gray-700 transition-colors max-w-fit"
            >
                <Menu size={24}/>

            </motion.button>

        </div>
        </header>

        <main className='max-w-6xl mx-auto py-6 px-4 lg:px-8'>
            <motion.div
            initial={{opacity:0, y:20}}
            animate={{opacity:1, y:0}}
            transtition={{ delay:0.2}}
            className='bg-gray-800 rounded-xl px-[5px] sm:px-[70px] py-4 border border-gray-700'>

                <div className='flex py-4 pl-6 '>
                    <User size={20} className='text-gray-400' />
                    <span className='pl-4'> Profile </span>
                </div>

                <div className='flex h-auto items-center'>
                    <div className=''>
                        <img src={myimage} className='rounded-full  border-2 border-white size-20 sm:w-[185px] sm:h-[175px]' />
                    </div>

                    <div className='p-6 '>
                        <h2 className='text-gray-100 text-2xl font-semibold px-1 py-4'> Fadairo Michael </h2>
                        <p className='text-gray-400 px-1 font-medium'> michealfadairo14@gmail.com</p>
                    </div>

                </div>

                <div className='flex gap-7 mt-2 py-4 pl-[10px] sm:pl-[225px] '>
                    
                    <button className='bg-[#8B5CF6] py-2 px-3 rounded-md' onClick={() => setOpenform(!Openform)}> Data Input </button>
                    <button className='bg-[#8B5CF6] py-2 px-3 rounded-md' onClick={handleLogout}> Logout </button>
                </div>
                
            </motion.div>

            
            {Openform && <Dataentry onDataSubmitted={onDataSubmitted} />}

        </main>

        {isDropOpen && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate="open"
          variants={menuVariants}
          style={{ transformOrigin: "top"}}
          className='fixed top-[65px] right-0 bottom-0 left-0   flex flex-col md:hidden items-center overflow-hidden w-full min-h-screen  bg-gray-900 py-8 text-gray-100'

        >
          {SIDE_ITEMS.map((item, index) => (
                <Link key={item.path} to={item.path}>
                    <motion.div className='flex items-center py-9 px-4 text-lg font-md rounded-lg hover:bg-gray-700 transition-colours mb-2'>
                        <item.icon size={25} style={{color: item.color, minWidth: "20px"}} />

                        <AnimatePresence>
                            {isDropOpen && (<motion.span className="ml-4 whitespace-nowrap"
                                                            initial={{opacity:0 }}
                                                            animate={{opacity:1}}
                                                            exit={{opacity:0}}
                                                            transition={{duration:0.5, delay:0.4}}
                                                            >{item.name}</motion.span> )}
                        </AnimatePresence>
                        
                    </motion.div>
                </Link>
            ))}
        </motion.div>
      )}


    </div>
  )
}

export default Profile
