"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {
    const router=useRouter()
  return (
    <div className='flex gap-10 p-10'>
      <div>
      <button onClick={()=>{router.push(`/build-resume/templates/create-resume`)}}>template 1</button>
      </div>
      <div>
      <button onClick={()=>{router.push(`/build-resume/templates/create-resume2`)}}>template 2</button>
      </div>
    </div>
  )
}

export default Page
