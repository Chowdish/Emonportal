import React, {useEffect} from 'react'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import {FiSettings} from 'react-icons/fi';
import {TooltipComponent} from '@syncfusion/ej2-react-popups'

import './App.css'
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Area from './pages/Charts/Area';
import Line from './pages/Charts/Line';
import Enheder from './pages/Enheder';
import Indstillinger from './pages/Indstillinger';
import Home from './pages/Home';
import { useStateContext } from './contexts/ContextProvider';
import LineChart from './components/Charts/LineChart';
import EspSettings from './components/EspSettings';
const App = () => {
  const { activeMenu, espSettings, setespSettings } = useStateContext();
  return (
    <div className=''>
      <BrowserRouter>
        <div className='flex relative dark:bg-main-dark-bg'>
          <div className='fixed right-4 bottom-4' style={{zIndex: '1000' }}>
            <TooltipComponent content="Settings" position="Top">
              <button onClick={() => setespSettings(true)} className='text-3xl p-3 hover:bg-light-gray rounded-xl' >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
              <Sidebar />
            </div>
          ) : (
            <div className='w-0 dark:bg-secondary-dark-bg'>
              <Sidebar />
            </div>
          )}
          <div className={activeMenu ? 'dark:bg-main-bg bg-main-bg min-h-screen md:ml-72 w-full ' :  'dark:bg-main-bg bg-main-bg min-h-screen flex-2 w-full'}>
            <div className=' fixed md:static bg-white drop-shadow-sm dark:bg-main-dark-bg navbar w-full'>
              <Navbar />
            </div>
            <div className=' fixed md:static bg-white drop-shadow-sm dark:bg-main-dark-bg navbar w-full'>
              {espSettings && <EspSettings />}
            </div>



          <div>
            <Routes>
              {/* Dashboard */}
              <Route path="/" element={ <Home />}></Route>

              {/* Pages */}
              <Route path ="/Indstillinger" element={ <Indstillinger />}></Route>
              <Route path ="/enheder" element={ <Enheder />}></Route>

              {/* Charts */}
              <Route path ="/Area" element={ <Area />}></Route>
              <Route path ="/Line" element={ <Line />}></Route>
            </Routes>
          </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App