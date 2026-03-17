import dynamic from 'next/dynamic'
import React from 'react'

const LoginPage = dynamic(() => import("@/pages/auth/Login/login"))

export const metadata = {
    title: "Login",
}

function page() {
  return (
    <div>
      <LoginPage />
    </div>
  )
}

export default page
