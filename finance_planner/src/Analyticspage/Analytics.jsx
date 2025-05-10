import React, { useState } from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import { DollarSign, Eye, BarChart2, ShoppingBag, Users, Zap, Menu, Settings, User, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom';
import Analysiscard from './Analysiscard'
import Comparisonchart from './Comparisonchart'


const SIDE_ITEMS = [{name: "Overview", icon: BarChart2, color:"#6366f1", path:"/"},
  {name: "Analytics", icon: TrendingUp, color:"#3B82F6", path:"/analytics"},
  {name: "Datapage", icon: Settings, color:"#6EE787", path:"/Data"},
  {name: "Profile", icon: User, color:"#EC4899", path:"/profile"}
] 

const Analytics = ({Revenue, Revchange, IGR, Orders,Orderschange, Profitlist, Targetlist, Monthlist, loginCount}) => {

  const [isDropOpen, setDropOpen] = useState(false);

  const menuVariants = {
    open: {
      scaleY: [0, 1.2, 1],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const WrappedComparison = ({ Profitlist, Targetlist, Monthlist }) => (
      <Comparisonchart Profitlist={Profitlist} Targetlist={Targetlist} Monthlist={Monthlist}/>
  );
  const WrappedSales = ({ Revlist, Monthlist }) => (
    <Salesoverview Revlist2={Revlist} Monthlist={Monthlist} />
  );

  return (
    <div className={`flex-1 overflow-auto ${isDropOpen && 'overflow-hidden'} relative z-15`}>
        <header className=' bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
        <div className=' flex justify-between max-w-5xl mx-auto py-4 px-4 sm:px-6 lg:px-8 '>
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

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-9'>
           

            <Analysiscard title="Revenue" value={`N ${Revenue}`} icon={DollarSign} change={Revchange}/>
            <Analysiscard title="Annual Growth Rate" value={` ${IGR}%`} icon={User} change={IGR}/>
            <Analysiscard title="Orders" value={Orders} icon={ShoppingBag} change={Orderschange}/>
            <Analysiscard title="Dashboard views This Month" value={loginCount} icon={Eye}/>

        </div>

        <div>
            <WrappedComparison Profitlist={Profitlist} Targetlist={Targetlist} Monthlist={Monthlist}/>
        </div>

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
                                                                  initial={{opacity:0}}
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

export default Analytics
