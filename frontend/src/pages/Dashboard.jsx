import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ListForm from '../components/ListForm'
import ListItem from '../components/ListItem'
import Spinner from '../components/Spinner'      
import { getLists } from '../features/lists/listSlice'
import { reset } from "../features/auth/authSlice";

export default function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { lists, isLoading, isError, message } = useSelector((state) => state.lists)

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login')
    }
    dispatch(getLists())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Todo List Dashboard</p>
      </section>

      <ListForm />

      <section className="content">
        {lists && lists.length > 0 ? (
          <div className="list">
            {lists.map((list) => (
              <ListItem key={list._id} list={list} />
            ))}
          </div>
        ) : (
          <h3>You have not set any lists</h3>
        )}
      </section>
    </>
  )
}
