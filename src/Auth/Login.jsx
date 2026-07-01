import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  let navigate = useNavigate();

  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")


  let handleSubmit = async (e) => {
    e.preventDefault();

    let res = await axios.get('http://localhost:3000/register')
    console.log(res)
    let user = await res.data.find((u) => u.email === email && u.password === password)
    console.log(user)


    if (user) {
      toast.success(`Welcome Back ${user.username}`)
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } else {
      toast.error("Something went wrong")
    }

  }

  return (
    <section className='auth-page'>
      <div>
        <h3>Login</h3>
        <p>Login to manage all memebers and payments</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter Email</label>
        <input type="email" id='email' name='email' placeholder='You@gmail.com' onChange={(e) => { setEmail(e.target.value) }} /><br /><br />
        <label htmlFor="password">Enter Password</label>
        <input type="password" id='password' name='password' placeholder='*************' onChange={(e) => { setPassword(e.target.value) }} /><br /><br />

        <button type='submit'>Submit</button>
      </form>

      <div>
        <h3>Dont'have an Account ? Create Account <Link to='/register'>Register</Link></h3>
      </div>
    </section>
  )
}

export default Login