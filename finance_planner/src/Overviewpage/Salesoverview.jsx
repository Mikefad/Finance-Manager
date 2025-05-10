import { LineChart,XAxis,YAxis,ResponsiveContainer,CartesianGrid,Tooltip,Line} from 'recharts';
import { motion } from 'framer-motion';

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];


const Salesoverview = ({Revlist2, Monthlist}) => {


  const dataset = Monthlist.map((monthNum, i) => ({
    month: months[monthNum - 1],
    sales: Revlist2[i]
  })).reverse();
  
  

  return (
    
    <motion.div
        initial={{opacity:0, y:20}} 
        animate={{opacity:1, y:0}}
        transition={{delay:0.4}}
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-[2px] overflow-hidden border border-gray-700">

        <h2 className='text-lg font-md mb-2 text-gray-100 p-1'>
            Revenue Trend
        </h2>

        <div className='h-60 text-[15px]'>
            <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart data={dataset}>
                <CartesianGrid strokeDasharray="3 3" stroke='#4B5563'/>
                <XAxis dataKey={"month"} stroke='#9ca3af'/>
                <YAxis stroke='#9ca3af'/>
                <Tooltip contentStyle={{backgroundColor:"rgba(31,41,55,0.8)", borderColor:"4B5563"}}
                itemStyle={{ color: "E5E7EB"}}/>
                
                <Line type="monotone" dataKey="sales" stroke="#6366F1" 
                strokeWidth={3}
                dot={{fill:"#6366F1", strokeWidth:2, r:6}}
                activeDot={{r:8,strokeWidth:2}}/>
            </LineChart>

            </ResponsiveContainer>
        </div>
        
        
        </motion.div>
    
  )
}

export default Salesoverview
