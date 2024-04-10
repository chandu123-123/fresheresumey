import React from 'react'
import Link from "next/link";
import useFormStatus from 'react-dom'
const Homecreate = () => {

  return (
    <div className='pt-5'>
       <Link href="/build-resume"><button className="btn btn-warning">Create Resume</button></Link>
    </div>
  )
}

export default Homecreate
