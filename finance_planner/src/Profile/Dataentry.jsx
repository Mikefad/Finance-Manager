import React, { useEffect, useState } from 'react';
import Togglebutton from './togglebutton';
import useFetchData from '../App/useFetchData';

const Dataentry = ({ onDataSubmitted }) => {
  const [switchOn, setswitchOn] = useState(false);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState(null);

  const [isAppliedClicked, setIsAppliedClicked] = useState(false);
  const [dataVals, setDataVals] = useState([
    { label: "Month", value: month },
    { label: "Year", value: year },
    { label: "Workers", value: "" },
    { label: "Revenue", value: "" },
    { label: "Profit Target", value: "" },
    { label: "Lodging", value: "" },
    { label: "Drinks", value: "" },
    { label: "Hall_Renting", value: "" },
    { label: "Orders", value: "" },
    { label: "Expenses", value: "" },
    { label: "Staff", value: "" },
    { label: "Drinks_purch", value: "" },
    { label: "Entertainment", value: "" },
    { label: "Power", value: "" },
    { label: "Web_Presence", value: "" }
  ]);

  useEffect(() => {
    const now = new Date();
    setMonth((now.getMonth() + 1).toString()); // Month as string (0–11)
    setYear(now.getFullYear().toString());
  }, []);

  useEffect(() => {
    // Only runs when month or year changes
    setDataVals(prev => [
      { label: "Month", value: month },
      { label: "Year", value: year },
      ...prev.slice(2) // preserve rest of the values
    ]);
  }, [month, year]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = [];
  for (let y = 2000; y <= 2030; y++) {
    years.push(y.toString());
  }

  const handleChange = (e, label) => {
    const value = e.target.value;
    const updatedDataVals = dataVals.map(item => 
      item.label === label ? { ...item, value } : item
    );
    setDataVals(updatedDataVals);
    
  };

  // Validation function
  const validateData = () => {
    for (let item of dataVals) {
      if (item.value === "" || (item.label !== "Month" && item.label !== "Year" && isNaN(item.value))) {
        setError(`Please provide a valid value for ${item.label}`);
        return false;
      }
    }
    setError(null);
    return true;
  };

  async function Applydata() {
    let add = "insert";
    let backlist = dataVals;

    if (!validateData()) {
      return; // If validation fails, stop the submission
    }

    let details = { add, backlist };

    try {
      if (add && backlist) {
        let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(details)
        });

        const feedback = await response.json();

        if (feedback.success) {
          setIsAppliedClicked(true);
          

          // Reset form
            setDataVals([
                { label: "Month", value: month },
                { label: "Year", value: year },
                { label: "Workers", value: "" },
                { label: "Revenue", value: "" },
                { label: "Profit Target", value: "" },
                { label: "Lodging", value: "" },
                { label: "Drinks", value: "" },
                { label: "Hall_Renting", value: "" },
                { label: "Orders", value: "" },
                { label: "Expenses", value: "" },
                { label: "Staff", value: "" },
                { label: "Drinks_purch", value: "" },
                { label: "Entertainment", value: "" },
                { label: "Power", value: "" },
                { label: "Web_Presence", value: "" }
            ]);
            
            setswitchOn(false); // Optional: reset toggle
            setIsAppliedClicked(false); // Optional: reset button state
            

          if (onDataSubmitted) {
            onDataSubmitted(); // ✅ Tell App to re-fetch
          }
        } else {
          setError("No response from the server");
        }
      } else {
        console.log("add or backlist not intact");
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className='max-w-6xl mx-auto py-6 px-4 lg:px-8'>
        <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 mb-9 overflow-hidden border border-gray-700">
            <div className='flex flex-col max-w-2xl mx-auto'>

                <div className='flex justify-between'>

                    <label>
                        Month:
                        <select value={month-1} onChange={(e) => setMonth(e.target.value)} className='border border-gray-700 bg-gray-800 text-white rounded-md m-2 px-3 py-1'>
                        {months.map((name, index) => (
                        <option key={index} value={index}>
                            {name}
                            </option>
                        ))}
                        </select>
                    </label>


                    <label>
                        Year:
                        <select value={year} onChange={(e) => setYear(e.target.value)}  className='border border-gray-700 bg-gray-800 text-white rounded-md m-2 px-3 py-1'>
                        {years.map((y) => (
                            <option key={y} value={y}>
                            {y}
                            </option>
                        ))}
                        </select>
                    </label>
                </div>

                <label className=' pb-1 pt-4'>
                Workers:
                    <input
                        type="number"
                        value={dataVals[2].value}
                        onChange={(e) => handleChange(e, "Workers")}
                        className='border border-gray-700 text-white rounded-md m-2 px-3 py-1'
                    />
                   
                </label>

                <div className='mt-8'>
                    <h2>{dataVals[3].label}</h2>
                    <input
                        type="text"
                        value={dataVals[3].value}
                        onChange={(e) => handleChange(e, "Revenue")}
                        className=" w-[270px] md:w-[350px] lg:w-[500px] h-[30px] bg-gray-400 border-none p-[10px] m-[15px]"
                    />
                </div>

                <div className="mt-6 flex flex-col items-start sm:items-center">
                  <h2 className="text-base sm:text-lg mb-2">{dataVals[4].label}</h2>
                  <input
                    type="text"
                    value={dataVals[4].value}
                    onChange={(e) => handleChange(e, "Profit Target")}
                    className="w-full max-w-[270px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[370px] h-10 bg-gray-400 border-none p-2 rounded"
                  />
                </div>


                <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
                    <div>
                        <h2>{dataVals[5].label}</h2>
                        <input
                            type="text"
                            value={dataVals[5].value}
                            onChange={(e) => handleChange(e, "Lodging")}
                            className="h-[30px] bg-gray-400 border-none p-[10px] m-[15px]"
                        />
                    </div>

                    <div>
                        <h2>{dataVals[6].label}</h2>
                        <input
                            type="text"
                            value={dataVals[6].value}
                            onChange={(e) => handleChange(e, "Drinks")}
                            className="h-[30px] bg-gray-400 border-none p-[10px] m-[15px]"
                        />
                    </div>

                    <div>
                        <h2>{dataVals[7].label}</h2>
                        <input
                            type="text"
                            value={dataVals[7].value}
                            onChange={(e) => handleChange(e, "Hall_Renting")}
                            className="h-[30px] bg-gray-400 border-none p-[10px] m-[15px]"
                        />
                    </div>

                    <div>
                        <h2>{dataVals[8].label}</h2>
                        <input
                            type="text"
                            value={dataVals[8].value}
                            onChange={(e) => handleChange(e, "Orders")}
                            className="h-[30px] bg-gray-400 border-none p-[10px] m-[15px]"
                        />
                    </div>

                </div>

                <div className='mt-15'>

                    <Togglebutton label="Expenses" isOn={switchOn} isToggled={() => setswitchOn(!switchOn)}/>
                    
                </div>
                
                
                {switchOn &&  <><input type="text" value={dataVals[9].value} onChange={(e) => handleChange(e, "Expenses")} className="w-[270px] md:w-[350px] lg:w-[500px] h-[30px] bg-gray-400 border-none p-[10px] m-[15px]"/>
                
                <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
                    <div>
                        <h2>{dataVals[10].label}</h2>
                        <input
                            type="text"
                            value={dataVals[10].value}
                            onChange={(e) => handleChange(e, "Staff")}
                            className=" h-[30px] w-[200px] sm:w-[143px] bg-gray-400 border-none p-[10px] m-[15px]"
                        />
                    </div>

                    <div>
                        <h2>{dataVals[11].label}</h2>
                        <input
                            type="text"
                            value={dataVals[11].value}
                            onChange={(e) => handleChange(e, "Drinks_purch")}
                            className=" h-[30px] w-[200px] sm:w-[143px] bg-gray-400 border-none p-[10px] m-[15px]"
                        />
                    </div>

                    <div>
                        <h2>{dataVals[12].label}</h2>
                        <input
                            type="text"
                            value={dataVals[12].value}
                            onChange={(e) => handleChange(e, "Entertainment")}
                            className=" h-[30px] w-[200px] sm:w-[143px] bg-gray-400 border-none p-[10px] m-[15px]"
                        />
                    </div>
                    
                    <div>
                        <h2>{dataVals[13].label}</h2>
                        <input
                            type="text"
                            value={dataVals[13].value}
                            onChange={(e) => handleChange(e, "Power")}
                            className=" h-[30px] w-[200px] sm:w-[143px] bg-gray-400 border-none p-[10px] m-[15px]"
                        />
                    </div>
                  
                </div>

                <div className='mt-8 flex'>
                
                    <div>
                        <h2>{dataVals[14].label}</h2>
                        <input
                            type="text"
                            value={dataVals[14].value}
                            onChange={(e) => handleChange(e, "Web_Presence")}
                            className="h-[30px] bg-gray-400 border-none p-[10px] m-[15px]"
                        />
                    </div>
                </div>

        
                <div className='flex gap-7 mt-2 py-4 justify-end '>
                <button className={` py-2 px-3 rounded-md ${isAppliedClicked ? 'bg-gray-500' : 'bg-indigo-600'}`} onClick={Applydata}>  Generate Dashboard  </button>
                
                </div>

                {/* Error message */}
                {error && <div className="text-red-500 mt-2 text-center text-[20px]">{error}</div>}
                
                </>


                
                }

                
                
               
            </div>
        </div>
      
    </div>
  )
}

export default Dataentry;

