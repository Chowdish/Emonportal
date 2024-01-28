import React from 'react'
import { MdOutlineCancel } from 'react-icons/md'
import BluetoothForm from './Charts/BluetoothForm'
import { useStateContext } from '../contexts/ContextProvider';


const EspSettings = () => {
    const { setespSettings } = useStateContext();
  return (

    <div className='bg-half-transparent w-screen fixed nav-item -top-0 right-0'>
        <div className='float-right h-screen dark:text-gray-200 bg-white dark:[#484b52] w-400'>
            <div className='flex justify-between items-center p-4 ml-4'>
                <p className='font-semibold text-xl'>Settings</p>
                <button type="button" onClick={() => setespSettings(false)} style={{color: 'rgb(153,171,180)', borderRadius: '50%'}} className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray'>
                    <MdOutlineCancel />
                </button>
            </div>
            <div className='flex-col border-t-1 border-color p-4 ml-4'>
                <p className='font-semibold text-lg'>Esp32 Indstillinger </p>
                <div className='mt-10'>
                    <BluetoothForm />
                </div>

            </div>
        </div>
    </div>
  )
}

export default EspSettings