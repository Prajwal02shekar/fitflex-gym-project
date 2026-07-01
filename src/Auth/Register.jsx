import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Register = () => {

  let naviagte = useNavigate();
  let [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phNum: "",
    age: "",
    gender: ""
  })

  let handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)

    try {
      let exisiting = await axios.get('http://localhost:3000/register')
      if (exisiting.data.some((item) => item.email === formData.email)) {
        toast.error("This Email already Registered")
        return
      }


      axios.post('http://localhost:3000/register', formData)
      toast.success("Account Created --Please Login")
      setFormData({
        username: "",
        email: "",
        password: "",
        phNum: "",
        age: "",
        gender: ""
      })
      setTimeout(() => {
        naviagte('/login')
      }, 1200)
    } catch {
      toast.error("SomeThing went Wrong")
    }


  }
  return (
    <section className='auth-page'>
      <div>
        <h3>Create Account</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter Username</label>
        <input type="text" id='username' name='username' placeholder='Your Name' onChange={handleChange} /><br /><br />
        <label htmlFor="email">Enter Email</label>
        <input type="email" id='email' name='email' placeholder='You@gmail.com' onChange={handleChange} /><br /><br />
        <label htmlFor="password">Enter Password</label>
        <input type="password" id='password' name='password' placeholder='*************' onChange={handleChange} /><br /><br />
        <label htmlFor="phNum">Enter ph number</label>
        <input type="tel" id='phNum' name='phNum' placeholder='10 digit number' onChange={handleChange} minLength={10} maxLength={10} /><br /><br />
        <label htmlFor="age">Enter Age</label>
        <input type="number" id='age' name='age' placeholder='Your Age' onChange={handleChange} /><br /><br />
        <label htmlFor="gender">Select Gender</label>
        &nbsp;&nbsp;
        <input type="radio" name="gender" id="gender" value="Male" onChange={handleChange} />Male
        &nbsp;&nbsp;
        <input type="radio" name="gender" id="gender" value="Female" onChange={handleChange} />Female
        &nbsp;&nbsp;
        <input type="radio" name="gender" id="gender" value="Others" onChange={handleChange} />Others
        &nbsp;&nbsp;
        <br /><br />
        <button type='submit'>Submit</button>
      </form>

      <div>
        <h3>Already Have an Account? <Link to='/login'>Login</Link></h3>
      </div>
    </section>
  )
}

export default Register