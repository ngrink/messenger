import React, { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { useStore, socket } from './config/'
import './assets/css/app.css'

const RegistrationScreen = React.lazy(() => import('@/screens/Registration'))
const LoginScreen = React.lazy(() => import('@/screens/Login'))
const ChatScreen = React.lazy(() => import('@/screens/Chat'))

function App() {
  const { authStore } = useStore()

  useEffect(() => {
    if (authStore.isAuth) {
      socket.io.opts.extraHeaders = {
        ...socket.io.opts.extraHeaders,
        Authorization: `Bearer ${authStore.accessToken}`,
      }
      socket.connect()
    }

    return () => {
      socket.disconnect()
    }
  }, [authStore.isAuth])

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route>
            <Route path="/signup" element={<RegistrationScreen />} />
            <Route path="/login" element={<LoginScreen />} />
          </Route>
          <Route>
            <Route path="/" element={<Navigate to="/chats" replace={true} />} />
            <Route path="/chats" element={<ChatScreen />} />
          </Route>
          <Route path="*" element={<h1>404 Not found</h1>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
