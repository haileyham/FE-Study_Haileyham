import React from 'react'
import '../../styles/main.scss';
import { useNavigate } from 'react-router-dom';

export default function Main()  : JSX.Element{
    const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="navbarItem" onClick={()=>{navigate('/')}}>Home</div>
        <div className="navbarItem" onClick={()=>{navigate('/List')}}>List</div>
        <div className="navbarItem" onClick={()=>{navigate('/Photo')}}>Photo</div>
      </nav>
    </>
  )
}
