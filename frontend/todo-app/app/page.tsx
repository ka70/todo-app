import { getAlltodos } from "@/api";
import AddTask from "./AddTask";
import TodoList from "./TodoList";


export default async function Page() {
  const todos = await getAlltodos();

  return <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200s">
    <h1 className="text-4xl font-bold text-gray-700 -mt-32">
      Todo App
    </h1>
    <div className="w-full max-w-xl mt-5">
      <div className="w-full px-8 py-6 bg-white shadow-md rounded-lg">
        <AddTask />
        <TodoList todos={todos} />
      </div>
    </div>
  </main>;
}

