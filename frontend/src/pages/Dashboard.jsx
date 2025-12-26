import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from '@tanstack/react-router'
import UrlForm from '../components/UrlForm.jsx'
import UserUrl from '../components/UserUrl.jsx'

const DashboardPage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: '/auth' })
  }, [isAuthenticated, navigate])
  return (
    <div className="min-h-screen   bg-gray-100 flex flex-col items-center justify-center p-4">
    <div className="bg-white mt-6 p-8 rounded-lg shadow-md w-full max-w-4xl">
      {/* <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1> */}
      <UrlForm/>
      <UserUrl/>
    </div>
  </div>
  )
}

export default DashboardPage