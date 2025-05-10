import React, { useEffect,useState } from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {BarChart2, ShoppingBag, Users, Zap, Menu, Settings, User, Edit, Trash2, TrendingUp, TrendingDown} from 'lucide-react';
import Statcard from './Datacard';
import { Link } from 'react-router-dom';

const SIDE_ITEMS = [{name: "Overview", icon: BarChart2, color:"#6366f1", path:"/"},
  {name: "Analytics", icon: TrendingUp, color:"#3B82F6", path:"/analytics"},
  {name: "Datapage", icon: Settings, color:"#6EE787", path:"/Data"},
  {name: "Profile", icon: User, color:"#EC4899", path:"/profile"}
] 

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Data = ({List}) => {
  const [items, setItems] = useState([]);
  const [isDropOpen, setDropOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  const[Dataamt, setDataamt] = useState('');

  useEffect(() => {
    if (List.length > 0) {
      setItems(List); // Assuming List is passed as prop
      setLoading(false); // Once data is loaded, set loading to false
    } else {
      setLoading(true);
    }
  }, [List]); 

  const menuVariants = {
    open: {
        scaleY: [0, 1.2, 1],
        transition: {
        duration: 0.5,
        ease: "easeInOut"
        }
    }
    };

  const profitabilityData = items.map(item => ({
    month: item?.Month,
    year: item?.Year,
    profitability: item?.Revenue - item?.Expenses
  }));

  const mostProfitableMonth = profitabilityData.length > 0
  ? profitabilityData.reduce((max, current) => {
      return current.profitability > max.profitability ? current : max;
    })
  : null;  // Fallback to null or a default value

  const expensesData = items.map(item => ({
    month: item?.Month,
    year: item?.Year,
    expenses: item?.Expenses
  }));

  const mostExpensiveMonth = expensesData.length > 0
  ? expensesData.reduce((max, current) => {
      return current.expenses > max.expenses ? current : max;
    })
  : null;  // Fallback to null or a default value

  


  async function handleTrash(id){

    let add = "Delete"
    let backlist = id;
    let details = {add, backlist};

    try{

        if (add && backlist){
            let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/`,{
                method: "POST",
                headers : {"Content-Type": "application/json"},
                body: JSON.stringify(details),
                credentials: 'include'
            });

            const feedback = await response.json();

            if (feedback.success){
              
             setItems(prevItems => prevItems.filter(item => item.id !== id));
            } 
            else {
    
              setError(feedback.message);
            
            }
        }
        else{
            setError("Enter username or password");
        }

        
    }
    catch(error){
        setError(error)
    }

  }

  if (loading) {
    return null; // Show loading message or spinner until data is available
  }

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
        className='grid grid-cols-1 md:grid-cols-2 gap-8 p-4 mb-9 lg:grid-cols-2'>
          <Statcard title ="Most Profitable Month" icon={TrendingUp} value={months[mostProfitableMonth?.month -1 ]} color="#22C55E"/>
          <Statcard title ="Most Expensive Month" icon={TrendingDown} value={months[mostExpensiveMonth?.month -1 ]} color="#EF4444"/>
          

        </motion.div>


        <motion.div
        initial={{opacity:0, y:20}} 
        animate={{opacity:1, y:0}}
        transition={{delay:1}}
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 overflow-hidden border border-gray-700">
          
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl font-semibold text-gray-100 '>
                Expenses
            </h2>

            <select value={Dataamt} onChange={(e) => setDataamt(e.target.value)} className='border border-gray-700 text-white rounded-md m-2 px-5 py-2'>
              
              <option  value={1}>
                Essential
              </option>

              <option  value={2}>
                All
              </option>
          
            </select>

          </div>

          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-700'>
              <thead>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wider'>
                    Revenue
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wider'>
                    Target Revenue
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wider'>
                    Expenses
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wider'>
                    Workers
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wider'>
                    Orders
                  </th>
                  {Dataamt == '2' && (<>
                  <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wider'>
                    Lodging
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wider'>
                    Drinks
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wider'>
                    Hall Renting
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wider'>
                    Staff Payment
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wider'>
                    Drink purchase
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wider'>
                    Entertainment
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wider'>
                    Power
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wider'>
                    Web Presence
                  </th>
                  </>
                      )}
                  <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wider'>
                    Month
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wider'>
                    Year
                  </th>
                  
                </tr>
              </thead>

              <tbody className='divide-y divide-gray-700'>
                {items.map((entry) => (
                  <tr key={entry.id}>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {entry.Revenue.toLocaleString()}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {entry.Target.toLocaleString()}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {entry.Expenses.toLocaleString()}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {entry.Workers}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {entry.Orders}
                    </td>
                    {Dataamt == '2' && (<>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {entry.Lodging}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {entry.Drinks}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {entry.Hall_Renting}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {entry.Staff}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {entry.Drinks_purch}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {entry.Entertainment}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {entry.Power}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {entry.Web_Presence}
                    </td>
                    </>)}
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                    {months[entry.Month -1]}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {entry.Year}
                    </td>
                    <td className='flex px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      <button className='text-indigo-400 hover:text-indigo-300 mr-2 cursor-pointer'>
                        <Edit size={18}/>
                      </button>
                      <button className='text-red-400 hover:text-red-300 cursor-pointer'>
                        <Trash2 size={18} onClick={() => handleTrash(entry.id)}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>


            </table>
          </div>
          
        </motion.div>

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

export default Data

