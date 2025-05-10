import {BarChart2, DollarSign, Settings, User, Menu, TrendingUp} from 'lucide-react';
import { useState } from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import { Link } from 'react-router-dom';

const SIDE_ITEMS = [{name: "Overview", icon: BarChart2, color:"#6366f1", path:"/"},
    {name: "Analytics", icon: TrendingUp, color:"#3B82F6", path:"/analytics"},
    {name: "Data", icon: Settings, color:"#6EE787", path:"/Data"},
    {name: "Profile", icon: User, color:"#EC4899", path:"/profile"}
] 


const Sidebar = () => {
    const[isSidebarOpen, setSidebarOpen] = useState(true)

  return (
    <motion.div className={`relative z-10 hidden sm:flex sm:flex-col transition-all duration-300 ease-in-out flex-shrink-0  h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4  border-r border-gray-700 `}
    initial={{ width: 185 }}  // Set the initial width
    animate={{ width: isSidebarOpen ? 185 : 80 }} // Animate based on `isSidebarOpen`
    >
        <div>

        <motion.button
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            onClick={ () => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
            <Menu size={24}/>

        </motion.button>

        <nav className='mt-8 flex-grow'>
            {SIDE_ITEMS.map((item, index) => (
                <Link key={item.path} to={item.path}>
                    <motion.div className='flex items-center p-4 text-sm font-md rounded-lg hover:bg-gray-700 transition-colours mb-2'>
                        <item.icon size={20} style={{color: item.color, minWidth: "20px"}} />

                        <AnimatePresence>
                            {isSidebarOpen && (<motion.span className="ml-4 whitespace-nowrap"
                                                            initial={{opacity:0, width:0}}
                                                            animate={{opacity:1, width:"auto"}}
                                                            exit={{opacity:0, width:0}}
                                                            transition={{duration:0.05, delay:0.4}}
                                                            >{item.name}</motion.span> )}
                        </AnimatePresence>
                        
                    </motion.div>
                </Link>
            ))}
        </nav>

        </div>
       
        
       
    </motion.div>
  )
}

export default Sidebar
