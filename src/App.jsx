import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  const savetoLS = (params) => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }

  useEffect(() => {
    let todoString = localStorage.getItem('todos')
    if (todoString) {
      setTodos(JSON.parse(todoString))
    }
  }, [])


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    savetoLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    savetoLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    savetoLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => item.id === id)
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    savetoLS()
  }


  return (
    <section className='pl-2 pr-2'>
      <Navbar />

      <div className=" max-w-lg container h-[84vh] rounded-xl bg-[#1a1a1a] m-auto">
        <div className="addTodo">

          {/* Add your todo + input + add button */}
          <h2 className='text-white text-xl p-3 text-center font-mono'>~ Add your Todo ~</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-[78%] h-8 rounded-md ml-[4%]' />
          <button onClick={handleAdd} disabled={todo.length <= 0} className='font-semibold ml-2 font-mono text-md bg-green-500 p-1 rounded-lg disabled:bg-green-500'>Save</button>
        </div>
        <div className="hide text-center font-mono mt-2">
          <input onChange={toggleFinished} type="checkbox" checked={showFinished} /><span className='text-white ml-3'>Show finished</span>
        </div>

        {/* Display the list and headings with buttons */}
        <h2 className="text-white text-center font-mono mt-3 text-lg underline">Your list</h2>
        <div className="todos h-3/4 overflow-y-auto">

          {todos.length === 0 && <div className='text-gray-400 text-center mt-9'>No Todos to Display</div>}

          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex-col m-2 border border-green-500 rounded-lg">


              <div className="box flex flex-row">
                <input className='ml-3' onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id='' />
                <article className={item.isCompleted ? 'line-through' : ''}>{item.todo}</article>
              </div>

              {/* Edit and Delete buttons */}
              <div className="buttons ml-3 mb-2 font-mono flex gap-3">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='font-semibold bg-green-500 h-7 w-12 rounded-2xl'>Edit</button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='font-semibold bg-green-500 h-7 w-16 rounded-2xl'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </section>
  )
}

export default App