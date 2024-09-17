import { useState } from 'react';

const Todo = () => {
    // State for active and completed todos
    const [todos, setTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);
    const [task, setTask] = useState("");

    // Add a new todo
    const addTodo = () => {
        if (task.trim()) {
            setTodos([...todos, task]);
            setTask("");
        }
    };

    // Mark a todo as completed
    const completeTodo = (index) => {
        const completedTask = todos.splice(index, 1);
        setCompletedTodos([...completedTodos, completedTask[0]]);
        setTodos([...todos]);
    };

    // Delete a todo from active or completed list
    const deleteTodo = (index, isCompleted = false) => {
        if (isCompleted) {
            const updatedCompletedTodos = [...completedTodos];
            updatedCompletedTodos.splice(index, 1);
            setCompletedTodos(updatedCompletedTodos);
        } else {
            const updatedTodos = [...todos];
            updatedTodos.splice(index, 1);
            setTodos(updatedTodos);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
            <h1 className="text-2xl font-bold mb-4">Simple To-Do App</h1>
            <p>sdfjsdf</p>

            {/* Input for adding a new todo */}
            <div className="flex space-x-2 mb-4">
                <input
                    type="text"
                    className="border border-gray-300 p-2 rounded-md w-80"
                    placeholder="Add a new task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button
                    onClick={addTodo}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Add
                </button>
            </div>

            {/* Active Todos List */}
            <div className="w-full max-w-md">
                <h2 className="text-xl font-semibold mb-3">Active Tasks</h2>
                <ul className="list-disc list-inside">
                    {todos.length > 0 ? (
                        todos.map((todo, index) => (
                            <li key={index} className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        onClick={() => completeTodo(index)}
                                        className="mr-2"
                                    />
                                    <span>{todo}</span>
                                </div>
                                <button
                                    onClick={() => deleteTodo(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </li>
                        ))
                    ) : (
                        <p>No active tasks</p>
                    )}
                </ul>
            </div>


            <div className="w-full max-w-md mt-8">
              
                <ul className="list-disc list-inside">
                    {completedTodos.length > 0 ? (
                        completedTodos.map((todo, index) => (
                            <li key={index} className="flex justify-between items-center mb-2">
                                <span>{todo}</span>
                                <button
                                    onClick={() => deleteTodo(index, true)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </li>
                        ))
                    ) : (
                        <p>No completed tasks</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Todo;
