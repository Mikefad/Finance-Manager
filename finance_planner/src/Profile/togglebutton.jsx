const Togglebutton = ({label, isOn, isToggled}) => {
  return (
    <div className='flex justify-between'>
        <span>{label}</span>

        <button className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none ${isOn ? 'bg-indigo-600' : 'bg-gray-600'}`}
        onClick={isToggled}>
            <span className={`inline-block size-4 rounded-full bg-white transform transition-transform ${isOn? 'translate-x-6' : 'translate-x-1'}`}/>

        </button>
      
    </div>
  )
}

export default Togglebutton
