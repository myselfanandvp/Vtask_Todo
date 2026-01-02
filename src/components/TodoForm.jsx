import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cat-pink to-cat-mauve rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <div className="relative flex items-center bg-cat-surface0 rounded-lg leading-none">
        <input
          type="text"
          className="w-full p-4 pl-6 pr-16 bg-cat-surface0 rounded-l-lg focus:outline-none text-cat-text placeholder-cat-overlay0 font-medium"
          placeholder="What needs to be done?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 px-4 py-2 bg-cat-mauve text-cat-base font-bold rounded-md hover:bg-cat-pink transition-colors pointer-events-auto"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
