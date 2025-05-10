import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

const Analysiscard = ({ title, value, icon: Icon, change }) => {
  // Special case: Dashboard views is always purple
  const isDashboardViews = title === 'Dashboard views This Month';

  // For other cards, check if data is up to a year
  const isDataUpToAYear = !(change === '' || change === null || change === undefined);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700"
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
    >

      <div className='flex items-center justify-between '>
        <div>
          <h3 className='text-sm font-medium text-gray-400'>{title}</h3>
          <p className='mt-1 text-xl font-semibold text-gray-100'>{value}</p>
        </div>

        <div className={`rounded-full p-6 ${
          isDashboardViews 
            ? 'bg-[#8B5CF6]/10' 
            : !isDataUpToAYear 
              ? 'bg-gray-500/10' 
              : change >= 0 
                ? 'bg-green-500/10' 
                : 'bg-red-500/10'
        }`}>
          <Icon size={24} className={`${
            isDashboardViews 
              ? 'text-[#8B5CF6]' 
              : !isDataUpToAYear 
                ? 'text-gray-500' 
                : change >= 0 
                  ? 'text-green-500' 
                  : 'text-red-500'
          }`} />
        </div>
      </div>

      <div className={`flex ${
        isDashboardViews 
          ? 'text-[#8B5CF6]' 
          : !isDataUpToAYear 
            ? 'text-gray-500' 
            : change >= 0 
              ? 'text-green-500' 
              : 'text-red-500'
      }`}>

        {title !== 'Annual Growth Rate' ? (
          !isDashboardViews && (
            <>
              {isDataUpToAYear ? (
                <div className='flex'>
                  <span>{change >= 0 ? <ArrowUpRight /> : <ArrowDownRight />}</span>
                  <div>{change}% <span className='text-gray-400 text-[13px]'> vs last period</span></div>
                </div>
              ) : (
                <div className='text-[14px]'>Your data is not up to a year</div>
              )}
            </>
          )
        ) : (
          isDataUpToAYear ? (
            <div className='text-[14px]'>{`Your Business ${change > 0 ? "grew" : "declined"} by ${value}.`}</div>
          ) : (
            <div className='text-[14px]'>Your data is not up to a year</div>
          )
        )}
      </div>

    </motion.div>
  )
}

export default Analysiscard
