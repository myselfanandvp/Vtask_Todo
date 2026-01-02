import React from 'react';

function TodoItem({ todo, toggleComplete, deleteTodo }) {
  const formatDate = (timestamp, includeTime = true) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const options = {
      month: 'short',
      day: 'numeric',
      ...(includeTime && {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <div
      className={`group flex items-center justify-between p-4 mb-3 bg-cat-surface0 hover:bg-cat-surface0/80 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-cat-surface1 ${todo.completed ? 'bg-cat-surface1' : ''
        }`}
    >
      <div className="flex items-center gap-3 flex-1 overflow-hidden">
        <button
          onClick={() => toggleComplete(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 mt-1 ${todo.completed
            ? 'bg-cat-green border-cat-green'
            : 'border-cat-overlay0 hover:border-cat-mauve'
            }`}
        >
          {todo.completed && (
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <div className="flex flex-col min-w-0">
          <span
            className={`text-lg font-medium text-cat-text truncate transition-all duration-200 ${todo.completed ? 'line-through text-cat-overlay1' : ''
              }`}
          >
            {todo.text}
          </span>
          <div className="text-xs text-cat-overlay0 flex flex-wrap gap-x-2">
            {!todo.completed && (
              <span>Added: {formatDate(todo.createdAt, true)}</span>
            )}
            {todo.completed && (
              <>
                <span>Created: {formatDate(todo.createdAt, false)}</span>
                <span>•</span>
                <span>Completed: {formatDate(todo.completedAt || Date.now(), true)}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => deleteTodo(todo.id)}
        className="ml-2 opacity-0 group-hover:opacity-100 text-cat-overlay0 hover:text-cat-red transition-all p-2 rounded-lg hover:bg-cat-red/10 flex-shrink-0"
        aria-label="Delete"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}

export default TodoItem;
