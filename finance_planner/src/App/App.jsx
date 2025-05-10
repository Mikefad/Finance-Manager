import Sidebar from '../sidebar'
import { Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import Overview from '../Overviewpage/Overview';
import Data from '../Data/Data';
import Analytics from '../Analyticspage/Analytics';
import Profile from '../Profile/profile';
import Login from '../Login/login';
import useFetchData from './useFetchData';
import { useState, useEffect } from 'react';
import NotFound from '../NotFound';


function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loggedIn, setLoggedin] = useState(null); // initially null
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [Revlist, setRevlist] = useState([]);
  const [Monthlist, setMonthlist] = useState([]);
  const [Profitlist, setProfitlist] = useState([]);
  const [Targetlist, setTargetlist] = useState([]);
  const [loginCount, setLoginCount] = useState(0);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleDataSubmitted = () => {
    setRefreshTrigger(prev => prev + 1); // 🔁 Triggers re-fetch
  };

  useEffect(() => {
    const now = new Date();
    const monthKey = `logins-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const count = parseInt(localStorage.getItem(monthKey)) || 0;
    setLoginCount(count);
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedin") === "true";
    setLoggedin(isLoggedIn);
    if (!isLoggedIn && location.pathname !== '/login') {
      navigate("/login", { replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (list.length > 0) {
      const revenues = list.map(item => Number(item.Revenue));
      setRevlist(revenues);

      const Month = list.map(item => Number(item.Month));
      setMonthlist(Month);

      const Profit = list.map(item => Number(item.Revenue - item.Expenses));
      setProfitlist(Profit);

      const Target = list.map(item => Number(item.Target));
      setTargetlist(Target);
    }
  }, [list]);

 
  useFetchData(setList, setError, setLoading, refreshTrigger);
  
  

  // If login state is not yet determined, don't render anything
  if (loggedIn === null || (loggedIn === false && location.pathname !== '/login')) {
    return null;
  }

  // Revenue, profit, etc.
  const Rev = (list[0]?.Revenue ?? '').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const Profit = (list[0]?.Revenue - list[0]?.Expenses ?? '').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const Prof = list[0]?.Revenue - list[0]?.Expenses ?? '';
  const logd = list[0]?.Lodging ?? '';
  const Renting = list[0]?.Hall_Renting ?? '';
  const drinks = list[0]?.Drinks ?? '';
  const Workers = list[0]?.Workers ?? '';
  const Orders = list[0]?.Orders ?? '';
  const Expen = list[0]?.Expenses ?? '';
  const Staff = list[0]?.Staff ?? '';
  const Drinkpur = list[0]?.Drinks_purch ?? '';
  const Ement = list[0]?.Entertainment ?? '';
  const Pow = list[0]?.Power ?? '';
  const WebP = list[0]?.Web_Presence ?? '';

  // Revenue Change calculation (Revchange)
const RevchangeRaw = (list[1]?.Revenue && list[1]?.Revenue !== 0) 
? ((list[0]?.Revenue - list[1]?.Revenue) / list[1]?.Revenue) * 100
: (list[1]?.Revenue === 0 ? 'Division by zero' : 'Missing data'); // Handle zero division and missing data

// Format Revchange, return empty string if invalid
const Revchange = (isNaN(RevchangeRaw) || RevchangeRaw === 'Division by zero' || RevchangeRaw === 'Missing data') 
? '' 
: RevchangeRaw.toFixed(1);

// Annual Growth Rate calculation (Growthrate)
const GrowthrateRaw = (list[11]?.Revenue && list[11]?.Revenue !== 0) 
? ((list[0]?.Revenue - list[11]?.Revenue) / list[11]?.Revenue) * 100
: (list[11]?.Revenue === 0 ? 'Division by zero' : 'Missing data'); // Handle zero division and missing data

// Format Growthrate, return empty string if invalid
const IGR = (isNaN(GrowthrateRaw) || GrowthrateRaw === 'Division by zero' || GrowthrateRaw === 'Missing data') 
? '' 
: GrowthrateRaw.toFixed(1);

const OrdersRaw = (list[1]?.Orders && list[1]?.Orders !== 0) 
? ((list[0]?.Orders - list[1]?.Orders) / list[1]?.Orders) * 100
: (list[1]?.Orders === 0 ? 'Division by zero' : 'Missing data'); // Handle zero division and missing data

// Format Growthrate, return empty string if invalid
const Orderschange = (isNaN(OrdersRaw) || OrdersRaw === 'Division by zero' || OrdersRaw === 'Missing data') 
? '' 
: OrdersRaw.toFixed(1);




  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden '>
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 t0-gray-900 opacity-80' />
        <div className='absolute inset-0 backdrop-blur-sm' />
      </div>

      {location.pathname !== '/login' && <Sidebar />}

      <Routes>
        <Route path="/" element={<Overview Revenue={Rev} Profit={Profit} Prof={Prof} Lodging={logd} Renting={Renting} Drinks={drinks} Workers={Workers} Expenses={Expen} Staff={Staff} Drinks_purch={Drinkpur} Entertainment={Ement} Power={Pow} Web_Presence={WebP} Revlist={Revlist} Monthlist={Monthlist} />} />
        <Route path="/analytics" element={<Analytics Revenue={Rev} Revchange={Revchange} IGR={IGR} Orders={Orders} Orderschange={Orderschange} Profitlist={Profitlist} Targetlist={Targetlist} Monthlist={Monthlist} loginCount={loginCount}/>} />
        <Route path="/Data" element={<Data List={list} />} />
        <Route path="/profile" element={<Profile setLoggedin={setLoggedin} onDataSubmitted={handleDataSubmitted} />} />
        <Route path="/login" element={<Login setLoggedin={setLoggedin} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

