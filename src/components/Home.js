import React, { useEffect, useState } from 'react'
import {signOut, onAuthStateChanged} from 'firebase/auth'
import { auth, db } from '../firebase/firebase'
import {useNavigate} from 'react-router-dom'
import {uid} from 'uid'
import {set, ref, onValue, remove, update} from 'firebase/database'


export const Home = () => {

  const navigate = useNavigate()
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [isUpdate, setIsUpdate] = useState(false)
  const [tempUidd, setTempUidd] = useState("")


  useEffect(() => {
    auth.onAuthStateChanged((user => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([])
          const data = snapshot.val()
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo])
            })
          }
        })
      }
      else if (!user)
        navigate('/')
    }))
  },[])
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/')
    }).catch((err) => {
      alert(err.message)
    })
  }

  // read

  // add
  const writeToDb = () => {
    const uidd = uid()
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd,
    })
    setTodo('')
  }
  // update

  const handleUpdate = (todo) => {
    setIsUpdate(true)
    setTodo(todo.todo)
    setTempUidd(todo.uidd)
  }

  const handleUpdateConfirm = () => {
    update(ref(db,`/${auth.currentUser.uid}/${tempUidd}`),{
      todo: todo,
      tempUidd: tempUidd
    })
    setIsUpdate(false)
    setTodo('')
  }
  // delete
  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`))
  }

  return (
    <div>
      <input type="text" placeholder='Add ToDo' value={todo} onChange={(e) => setTodo(e.target.value)}/>
      {
        todos.map((todo) => (
          <div>
          <h1> {todo.todo}</h1>
          <button onClick= {() => handleUpdate(todo)}> Update</button>
          <button onClick={() => handleDelete(todo.uidd)}> Delete</button>
          </div>
        ))
      }
      {isUpdate ? (
        <div>
          <button onClick={handleUpdateConfirm}>Submit</button>
        </div>)
        : (<div>
          <button onClick={writeToDb}> Add </button>
          </div>
      )}
      <button onClick={handleSignOut}> Sign Out</button>
    </div>
  )
}

