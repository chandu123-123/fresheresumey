"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {
    const router=useRouter()
  return (
    <div>
      <button onClick={()=>{router.push(`/build-resume/create-resume/templates/download`)}}>template 1</button>
      <button onClick={()=>{router.push(`/build-resume/create-resume/templates/template2`)}}>template 2</button>
    </div>
  )
}

export default Page
