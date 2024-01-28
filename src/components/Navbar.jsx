import React, {useEffect} from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
import {BsChatLeft} from 'react-icons/bs'
import {TooltipComponent} from '@syncfusion/ej2-react-popups'
import { useStateContext } from '../contexts/ContextProvider';

const Navbar = () => {
  const {activeMenu, setActiveMenu} = useStateContext();

  const NavButton =  ({title, customFunc, icon, color, dotcolor}) => (
  <TooltipComponent className='' content={title} position='BottomCenter'>
    <button type='Button' onClick={customFunc} style={{ color }} className='relative text-1xl rounded-full p-3 hover:bg-light-gray'>
      <span style={{ background: dotcolor }} className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'>
        {icon}

      </span>

    </button>

  </TooltipComponent>)
  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
      <NavButton title="Menu" customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} color="blue" icon={<AiOutlineMenu />} />
    </div>
  )
}

export default Navbar