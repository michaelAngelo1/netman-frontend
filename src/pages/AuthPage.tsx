import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function AuthPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleLogin() {
    if(email.length > 0 && password.length > 0) {
      if(email.includes("binus.edu")) {
        localStorage.setItem('at', "access_token");
        navigate('/')
      } else {
        alert('Administrator access only. Please stay out')
      }
    } else {
      alert("One or more fields are still empty. Please fill all the fields.")
    }
  }

  useEffect(() => {
    const at = localStorage.getItem('at');
    if(at) {
      navigate('/')
    }
  }, [])

  return (
    <div className="p-4 flex min-h-[100vh] justify-center">
      <form className="flex flex-col gap-4 mt-24 w-1/4">
        <div className="text-4xl font-medium text-white text-center">Log in to Netman</div>
        <input type="email" placeholder="Input email" className="input w-full" onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Input password" className="input w-full" onChange={(e) => setPassword(e.target.value)}/>
        <a href="" className="btn btn-primary" onClick={() => handleLogin()}>Log in</a>
      </form>
    </div>
  )
}
