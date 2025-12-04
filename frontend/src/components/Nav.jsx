import { IoPersonCircle } from "react-icons/io5"
import Logo from "../assets/Logo.png"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { setUserData } from "../redux/userSlice"
import { serverUrl } from "../App"
import axios from "axios"
import { useState } from "react"
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
function Nav() {
    const {userData} = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [showHam, setShowHam] = useState(false)

    const handleLogOut = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/auth/logout", {withCredentials:true})
            dispatch(setUserData(null))
            console.log(result.data)
            toast.success("Logout Successfully")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
  return (
    <div>
      <div className='w-full h-[70px] fixed top-0 px-5 py-2.5 flex items-center justify-between bg-gray-400 z-10'>
        <div className='lg:w-[20%] w-[40%] lg:pl-[50px]'>
          <img src={Logo} alt="" className='w-[60px] rounded-[5px] cursor-pointer' />
        </div>
        <div className='w-[30%] lg:flex items-center justify-center gap-4 hidden'>

          {!userData && <IoPersonCircle className='w-[50px] h-[50px] fill-black cursor-pointer' onClick={()=> setShow(prev=>!prev)}/>}
          {userData && <div className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer' onClick={()=> setShow(prev=>!prev)}>
          {userData?.name.slice(0,1).toUpperCase()}</div>}


          {userData?.role === "educator" &&<div className='px-5 py-2.5 border-2 border-white text-white bg-[black] rounded-[10px] text-[18px] font-light cursor-pointer'>Dashboard</div>}
         
          {!userData ? <span className='px-5 py-2.5 border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000]' onClick={() => navigate("/login")}>Login</span> :
          <span className='px-5 py-2.5 bg-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer' onClick={handleLogOut}>LogOut</span>}


          {show && <div className='absolute top-[110%] right-[10%] flex
          items-center flex-col justify-center gap-2 text-[16px]
          rounded-md bg-[white] px-[15px] py-2.5 border-2 border-black hover:border-white hover:text-white
          cursor-pointer hover:bg-black'>
          <span className='bg-[black] text-white px-[30px] py-2.5 rounded-2xl hover:bg-gray-600'>My Profile</span>
          <span className='bg-[black] text-white px-[30px] py-2.5 rounded-2xl hover:bg-gray-600'>My Courses</span>
          </div>}         
        </div>
        <GiHamburgerMenu className='w-[35px] h-[35px] lg:hidden text-black cursor-pointer' onClick={()=>setShowHam(prev=>!prev)}/>

        <div className={` fixed top-0 left-0 w-screen h-screen
        bg-[#000000d6] flex items-center justify-center flex-col
        gap-5 z-10 lg:hidden ${showHam ? "translate-x-0 transition duration-600" : "translate-x-full transition duration-600"}`}>
          <ImCross className='w-[35px] h-[35px] fill-white absolute top-5 right-[2.5%]' onClick={()=>setShowHam(prev=>!prev)} />
          {!userData && <IoPersonCircle className='w-[50px] h-[50px] fill-black cursor-pointer'/>}
          {userData && <div className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer'>
          {userData?.name.slice(0,1).toUpperCase()}</div>}

          <div className='w-[200px] h-16 flex items-center justify-center border-2 border-white text-white bg-[black] rounded-[10px] text-[18px] font-light cursor-pointer'>My Profile</div>
          <div className='w-[200px] h-16 flex items-center justify-center border-2 border-white text-white bg-[black] rounded-[10px] text-[18px] font-light cursor-pointer'>My Courses</div>
          {userData?.role === "educator" &&<div className='w-[200px] h-16 flex items-center justify-center border-2 border-white text-white bg-[black] rounded-[10px] text-[18px] font-light cursor-pointer'>Dashboard</div>}

          {!userData ? <span className='w-[200px] h-16 flex items-center justify-center border-2 border-white text-white bg-[black] rounded-[10px] text-[18px] font-light cursor-pointer' onClick={() => navigate("/login")}>Login</span> :
          <span className='w-[200px] h-16 flex items-center justify-center border-2 border-white text-white bg-[black] rounded-[10px] text-[18px] font-light cursor-pointer' onClick={handleLogOut}>LogOut</span>}

        </div>
      </div>
    </div>
  )
}

export default Nav