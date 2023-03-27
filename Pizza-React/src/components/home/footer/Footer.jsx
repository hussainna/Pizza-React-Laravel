import React from 'react'
import {BsFacebook} from 'react-icons/bs'
import {AiOutlineInstagram,AiFillYoutube,AiFillLinkedin,AiOutlineTwitter} from 'react-icons/ai'

function Footer() {
  return (
    <footer>
        <div className="container">
            <h2>Pizza</h2>
            <div className="icons">
                <i><BsFacebook/></i>
                <i><AiOutlineInstagram/></i>
                <i><AiFillYoutube/></i>
                <i><AiFillLinkedin/></i>
                <i><AiOutlineTwitter/></i>

            </div>
        </div>
    </footer>
  )
}

export default Footer