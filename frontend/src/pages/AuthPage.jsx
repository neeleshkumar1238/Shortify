import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from '@tanstack/react-router'
import LoginForm from '../components/LoginForm.jsx'
import RegisterForm from '../components/RegisterForm.jsx'


const AuthPage = () => {

  const [login, setLogin] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate({ to: '/dashboard' })
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}
    </div>
  )
}

export default AuthPage


