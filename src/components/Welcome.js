import React, { useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../firebase/firebase.js'
import { useNavigate } from 'react-router-dom'
import './welcome.css'


export const Welcome = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [signUpInfo, setSignUpInfo] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const navigate = useNavigate()

  // If user already signed in, navigate to home
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/home')
      }
    })
  })
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePassWordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/home')
      })
      .catch((err) => alert(err.message))
  }

  const handleSignUp = () => {
    // check if password matches
    if (signUpInfo.password !== signUpInfo.confirmPassword) {
        alert("Passwords don't match.")
        return
    }

    if (signUpInfo.password.length < 8) {
        alert("Password needs to have at least 8 characters.")
        return
    }
    createUserWithEmailAndPassword(auth, signUpInfo.email, signUpInfo.password).then(() => {
        navigate('/home')
    })
  }
  return (
    <div className='welcome'>
      <h1>ToDo-List</h1>
      <div className='login-register-container'>
        {isRegistering ? (
          <>
            <input
              type='email'
              placeholder='Email Address:'
              onChange={(e) => setSignUpInfo({...signUpInfo, email: e.target.value})}
              value={signUpInfo.email}
            />
            <input
              type='password'
              placeholder='Password'
              onChange={(e) => setSignUpInfo({...signUpInfo, password: e.target.value})}
              value={signUpInfo.password}
            />
            <input
              type='password'
              placeholder='Confirm Password'
              onChange={(e) => setSignUpInfo({...signUpInfo, confirmPassword: e.target.value})}
              value={signUpInfo.confirmPassword}
            />
            <button onClick={handleSignUp}>Sign Up</button>
            <button onClick={() => setIsRegistering(false)}>Go Back</button>
          </>
        ) : (
          <>
            <input type='email' onChange={handleEmailChange} value={email} />
            <input
              type='password'
              onChange={handlePassWordChange}
              value={password}
            />
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={() => setIsRegistering(true)}>
              Create an account
            </button>
          </>
        )}
      </div>
    </div>
  )
}
