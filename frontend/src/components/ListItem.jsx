import {useDispatch} from 'react-redux'
import {deleteList} from '../features/lists/listSlice'

function ListItem({list}) {
    const dispatch = useDispatch()
  return (
    <div className="list">
        <div>
            {new Date(list.createdAt).toLocaleDateString('en-US')}
        </div>
        <h2>{list.text}</h2>
        <button onClick={() => dispatchEvent(deleteList(list._id))}className="close">X</button>
    </div>
  )
}

export default ListItem