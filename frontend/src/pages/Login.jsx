import Logo from '../assets/Logo.png'
import google from '../assets/google.jpg'
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
   const [show, setShow] = useState(false)
   const navigate = useNavigate()
    return (
      <div className='bg-[#dddbdb] w-full h-screen flex items-center justify-center '>
        <form className='w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex'>
          {/* left div  */}
  
          <div className='md:w-[50%] w-full h-full flex flex-col items-center justify-center gap-3 '>
              <div>
                  <h1 className='font-semibold text-[black] text-2xl'>Welcome back</h1>
                  <h2 className='text-[#999797] text-[18px]'>Login to your account</h2>
                  </div>
              <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                  <label htmlFor="email"       className='font-semibold'>Email</label>
                  <input id='email' type="email" className='border w-full h-[35px] border-[#e7e6e6] text-[15px] px-5 ' placeholder='Your email' />
              </div>
              <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>
                  <label htmlFor="password"       className='font-semibold'>Password</label>
                  <input id='password' type={show ? "text" : "password"} className='border w-full h-[35px] border-[#e7e6e6] text-[15px] px-5 ' placeholder='Your password' />
                  { !show ? <IoEyeOutline className='absolute w-5 h-5 cursor-pointer right-[5%] bottom-[10%]' onClick={() => setShow(prev => !prev)} /> : <IoEye className='absolute w-5 h-5 cursor-pointer right-[5%] bottom-[10%]' onClick={() => setShow(prev => !prev)} />}
              </div>
              <button className='w-[75%] h-10 bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]'>Login</button>
              <span className='text-[13px] cursor-pointer text-[#585757]'>Forget password ?</span>
              <div className='w-[70%] flex items-center gap-2'>
                  <div className='w-[30%] h-[0.5px] bg-[#c4c4c4]'></div>
                  <div className='w-[50%] text-[15px] text-[#6f6f6f]
                  flex items-center justify-center '>Or continue</div>
                  <div className='w-[30%] h-[0.5px] bg-[#c4c4c4]'></div>
                  </div>
                   <div className='w-[75%] h-10 border border-[black] rounded-[5px] flex items-center justify-center cursor-pointer'>
                  <img src={google} className='w-[25px] cursor-pointer' alt="" />
                  <span className='text-[18px] text-gray-500 cursor-pointer'>oogle</span>
                  </div>
                <div className='text-[#6f6f6f] '>Create a new account  
                <span className='underline underline-offset-1 text-[black] cursor-pointer p-1.5' cursor-pointer onClick={() => navigate("/signup")}>SignUp</span>
                </div>
  
          </div>
  
          {/* right div  */}
          <div className='w-[50%] h-full rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col hidden'>
              <img src={Logo} alt="logo" className='w-30 shadow-2xl'/>
              <span className='text-2xl text-white'>LMS BD</span>
          </div>
        </form>
      </div>
  )
}

export default Login