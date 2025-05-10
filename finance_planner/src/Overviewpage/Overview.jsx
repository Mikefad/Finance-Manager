import React, { useState } from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import Statcard from './Statcard';
import {BarChart2, ShoppingBag, Users, Zap, Menu, Settings, User, TrendingUp} from 'lucide-react';
import { Link } from 'react-router-dom';
import Salesoverview from './Salesoverview';
import Piecomponent from './Piecomponent';
import Barcomponent from './Barcomponent';

const SIDE_ITEMS = [{name: "Overview", icon: BarChart2, color:"#6366f1", path:"/"},
  {name: "Analytics", icon: TrendingUp, color:"#3B82F6", path:"/analytics"},
  {name: "Datapage", icon: Settings, color:"#6EE787", path:"/Data"},
  {name: "Profile", icon: User, color:"#EC4899", path:"/profile"}
] 
 

const Overview = ({Revenue, Profit, Prof, Lodging, Renting, Drinks, Workers, Expenses, Staff, Drinks_purch, Entertainment, Power, Web_Presence, Revlist, Monthlist}) => {

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

  
  const WrappedPie = ({ Lodging, Renting, Drinks }) => (
    <Piecomponent Lodging2={Lodging} Renting2={Renting} Drinks_purch2={Drinks} />
  );


  const WrappedSales = ({ Revlist, Monthlist }) => (
    <Salesoverview Revlist2={Revlist} Monthlist={Monthlist} />
  );
  
  
  
  return (
    <div className={`flex-1 overflow-auto ${isDropOpen && 'overflow-hidden'} relative z-15`}>


      <header className=' bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
        <div className='flex justify-between max-w-5xl  mx-auto py-4 px-4 sm:px-6 lg:px-8 '>
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


      <main className='max-w-6xl mx-auto py-6 px-4 lg:px-8 '>

        <motion.div
        initial={{opacity:0, y:20}} 
        animate={{opacity:1, y:0}}
        transition={{duration:1}}
        className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-9 lg:grid-cols-4'>
          <Statcard title ="Revenue" icon={Zap} value={`N ${Revenue}`} color="#6366F1"/>
          <Statcard title ="Profit" icon={ShoppingBag} value={`N ${Profit}`} color="#8B5CF6"/>
          <Statcard title ="Workers" icon={Users} value={Workers} color="#EC4899"/>
          <Statcard title ="ROE" icon={BarChart2} value={isNaN((Prof / Expenses) * 100) || (Prof / Expenses) === 0 ? '0%' : `${((Prof / Expenses) * 100).toFixed(1)}%`} color="#10B981"/>

        </motion.div>


        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-9'>
          
          <WrappedSales Revlist={Revlist} Monthlist={Monthlist} />

          <WrappedPie Lodging={Lodging} Renting={Renting} Drinks={Drinks} />


        </div>

        <div>
        <Barcomponent Staff2={Staff} Drinks_purch2={Drinks_purch} Entertainment2={Entertainment} Power2={Power}Web_presence2={Web_Presence}/>
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

export default Overview
