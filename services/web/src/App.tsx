import React, { Suspense } from "react"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route>
            <Route path="/login" element={<div>LoginScreen</div>} />
          </Route>
          <Route>
            <Route path="/" element={<div>HomeScreen</div>} />
            <Route path="/chats/:id" element={<div>ChatScreen</div>} />
          </Route>
					<Route path="*" element={<h1>404 Not found</h1>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
