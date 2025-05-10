import { BarChart,XAxis,YAxis,ResponsiveContainer,CartesianGrid,Tooltip, Legend, Bar,Cell} from 'recharts';
import { motion } from 'framer-motion';



const Barcomponent = ({Staff2, Drinks_purch2, Entertainment2, Power2, Web_presence2}) => {

    const dataset =[{name: "staff", value:Number(Staff2)},
        {name: "Purchase Drinks", value:Number(Drinks_purch2)},
        {name: "Entertainment", value:Number(Entertainment2)},
        {name: "Power", value:Number(Power2)},
        {name: "web Presence", value:Number(Web_presence2)},
        
        
      ]
      const COLORS=["#6366F1","#8B5CF6","#EC4899","#10B981","#F59E0B"]
      


  return (
    
    <motion.div
        initial={{opacity:0, y:20}} 
        animate={{opacity:1, y:0}}
        transition={{delay:1}}
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-[2px] overflow-hidden border border-gray-700">

        <h2 className='text-lg font-md mb-2 text-gray-100 p-1'>
            Expenses
        </h2>


        <div className='h-80 text-[15px]'>
            <ResponsiveContainer width={"100%"} height={"100%"}>
            <BarChart data={dataset}>
                <CartesianGrid strokeDasharray="3 3" stroke='#4B5563'/>
                <XAxis dataKey={"name"} stroke='#9ca3af'/>
                <YAxis stroke='#9ca3af'/>
                <Tooltip contentStyle={{backgroundColor:"rgba(31,41,55,0.8)", borderColor:"4B5563"}}
                itemStyle={{ color: "E5E7EB"}}/>

                <Legend/>
                
                <Bar dataKey={"value"} fill="#8884d8">
                    {dataset.map((entry,index) =>(
                        <Cell key={`cell-${index}`} fill={COLORS [index % COLORS.length]}/>
                    ))}
                </Bar>
            </BarChart>

            </ResponsiveContainer>
        </div>
        
        
        </motion.div>
    
  )
}

export default Barcomponent