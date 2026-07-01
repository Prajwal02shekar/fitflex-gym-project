import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import Members from './pages/Members'
import PTRequest from './pages/PTRequest'
import Login from './Auth/Login'
import Register from './Auth/Register'
import PaymentHistory from './pages/PaymentHistory'
import { ToastContainer } from 'react-toastify'

const App = () => {
    let router=createBrowserRouter([
        {
            path:"/",
            element:<Layout/>,
            children:[
                {
                    path:"/",
                    element:<HomePage/>
                },
                {
                    path:"/members",
                    element:<Members/>
                },
                {
                    path:"/payment",
                    element:<PaymentHistory/>
                },
                {
                    path:"/personTraining",
                    element:<PTRequest/>
                },
                {
                    path:"/login",
                    element:<Login/>
                },
                {
                    path:"/register",
                    element:<Register/>
                },

            ]
        }
    ])
  return (
    <>
        <RouterProvider router={router}>

        </RouterProvider>
        <ToastContainer/>
    </>
  )
}
export default App