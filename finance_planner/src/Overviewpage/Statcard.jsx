import React from 'react'
import {motion} from 'framer-motion';

const Statcard = ({title,icon:Icon, value,color}) => {
  return (
    <div>

        <motion.div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl overflow-hidden border border-gray-700"
        whileHover = {{y:-5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"}}>
            <div className='px-2 py-3 sm:p-3 '>
                <span className='flex item-center text-sm  font-medium text-gray-400'>
                <Icon size={15} className="mr-1 " style={{color}}/>
                {title}</span>

                <p className='mt-2 text-2xl font-semibold text-gray-100'>{value}</p>

            </div>


        </motion.div>
    
    </div>
  )
}

export default Statcard
