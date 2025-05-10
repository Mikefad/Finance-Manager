import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis,YAxis,ResponsiveContainer,CartesianGrid,Tooltip,Legend} from 'recharts';


const COLORS=["#6366F1","#8B5CF6","#EC4899","#10B981","#F59E0B"]
const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];


const Comparisonchart = ({Profitlist, Targetlist, Monthlist}) => {

    const dataset =Profitlist.map((profval, i) => ({month: months[Monthlist[i] - 1 ], profit: profval, target:Targetlist[i]})).reverse();
    
   

  return (
    <div>

        <motion.div
            initial={{opacity:0, y:20}} 
            animate={{opacity:1, y:0}}
            transition={{delay:0.2}}
            className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 mb-9 overflow-hidden border border-gray-700">

            <div className='flex justify-between'>
                <h2 className='text-lg font-md mb-4 text-gray-100 p-1'>
                    Profit Against Target
                </h2>

                
            </div>

            <div style={{ width:"100%", height:400 }}>
                <ResponsiveContainer>
                    <AreaChart data={dataset}>
                        <CartesianGrid strokeDasharray="3 3" stroke='#374151'/>
                        <XAxis dataKey={"month"} stroke='#9ca3af'/>
                        <YAxis stroke='#9ca3af'/>
                        <Tooltip contentStyle={{backgroundColor:"rgba(31,41,55,0.8)", borderColor:"4B5563"}}
                        itemStyle={{ color: "E5E7EB"}}/>
                        
                        <Legend/>

                        <Area type="monotone" dataKey="profit" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3}/>
                        <Area type="monotone" dataKey="target" stroke="#10B981" fill="#10B981" fillOpacity={0.3}/>

                    </AreaChart>
                </ResponsiveContainer>
            </div>
            
        </motion.div>
    </div>
)
}

export default Comparisonchart
