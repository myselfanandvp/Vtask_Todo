import { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('vtask-data');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  useEffect(() => {
    localStorage.setItem('vtask-data', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now()
    };
    setTodos([newTodo, ...todos]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? {
        ...todo,
        completed: !todo.completed,
        completedAt: !todo.completed ? Date.now() : undefined
      } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === 'all' ? true :
        filter === 'completed' ? todo.completed :
          !todo.completed;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-cat-base via-cat-mantle to-cat-crust py-10 px-4 sm:px-0 font-sans">
      <div className="max-w-xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cat-mauve to-cat-pink mb-2">
            VTASK
          </h1>
          <p className="text-cat-subtext0 font-medium tracking-wide">
            DESIGNED FOR PRODUCTIVITY
          </p>
        </div>

        <div className="bg-cat-surface0/60 backdrop-blur-xl rounded-2xl shadow-xl border border-cat-surface1/50 p-6 md:p-8">
          <TodoForm addTodo={addTodo} />

          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-cat-overlay0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-cat-surface1 rounded-lg leading-5 bg-cat-mantle/50 text-cat-text placeholder-cat-overlay0 focus:outline-none focus:bg-cat-mantle focus:ring-1 focus:ring-cat-mauve focus:border-cat-mauve sm:text-sm transition duration-150 ease-in-out"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-1 rounded-xl bg-cat-mantle/50 p-1 mb-6">
            {['all', 'active', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200
                  ${filter === f
                    ? 'bg-cat-surface1 text-cat-mauve shadow'
                    : 'text-cat-subtext0 hover:bg-cat-surface1/50 hover:text-cat-text'
                  }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Scrollable List Area - Max height approx 3 items (~300px) */}
          <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-10 text-cat-overlay0">
                <p>No tasks found.</p>
              </div>
            ) : (
              filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  deleteTodo={deleteTodo}
                />
              ))
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-cat-surface1 flex justify-between items-center text-xs text-cat-overlay0 font-medium">
            <span>{todos.length} total tasks</span>
            <span>{todos.filter(t => !t.completed).length} items left</span>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(49, 50, 68, 0.5); /* surface0 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(203, 166, 247, 0.5); /* mauve */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(203, 166, 247, 0.7); /* mauve */
        }
      `}</style>
    </div>
  )
}

export default App
