import React from 'react'
import UrlForm from '../components/UrlForm'
import { useSelector, useDispatch } from 'react-redux'
import { logout as logoutAction } from '../store/slices/authSlice'
import { logoutUser } from '../api/user.api'
import { useNavigate } from '@tanstack/react-router'

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser()
    } catch (err) {
      // ignore API errors, still remove local auth state
    }
    dispatch(logoutAction())
    navigate({ to: '/auth' })
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <div className="flex items-center justify-center mb-6 relative">
        <h1 className="text-2xl font-bold">URL Shortner</h1>
        {isAuthenticated && (
          <div className="absolute right-0">
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <UrlForm/>
    </div>
  </div>
  )
}

export default HomePage