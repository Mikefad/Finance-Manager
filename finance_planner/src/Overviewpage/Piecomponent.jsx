import { PieChart,Pie, Cell ,ResponsiveContainer,Tooltip,Legend} from 'recharts';
import { motion } from 'framer-motion';



const Piecomponent = ({Lodging2, Renting2, Drinks_purch2}) => {

    const dataset = [
        { name: "Lodging", value: Number(Lodging2) },
        { name: "Renting", value: Number(Renting2) },
        { name: "Drinks", value: Number(Drinks_purch2) },
    ];

    const COLORS=["#6366F1","#8B5CF6","#EC4899"]
    

  return (
    
    <motion.div
        initial={{opacity:0, y:20}} 
        animate={{opacity:1, y:0}}
        transition={{delay:0.4}}
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-[2px] overflow-hidden border border-gray-700">

        <h2 className='text-lg font-md mb-2 text-gray-100 p-1'>
            Income Stream
        </h2>

        <div className='h-60 text-[15px]'>
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <PieChart data={dataset}>
                    <Pie data={dataset}
                    cx={"50%"}
                    cy={"50%"}
                    labelLine={false}
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey={'value'}
                    label={({name,percent}) => `${name} ${(percent*100).toFixed(0)}%`}>
                        {dataset.map((entry,index) =>(
                            <Cell key={`cell-${index}`} fill={COLORS [index % COLORS.length]}/>
                        ))}
                    </Pie>
                    
                    <Tooltip contentStyle={{backgroundColor:"rgba(31,41,55,0.8)", borderColor:"4B5563"}}
                    itemStyle={{ color: "E5E7EB"}}/>
                    
                    <Legend/>
                </PieChart>

            </ResponsiveContainer>
        </div>
        
        
        </motion.div>
    
  )
}

export default Piecomponent