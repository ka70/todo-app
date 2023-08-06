import { Todo } from "./types";

export const getAlltodos = async (): Promise<Todo[]> => {
    const res = await fetch("http://localhost:3001/task", {
        cache: "no-store", //SSR
    });
    const todos = res.json();

    return todos;
};

export const addTodo = async (todo: Todo): Promise<Todo> => {
    const res = await fetch("http://localhost:3001/task", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });
    const newTodo = res.json();

    return newTodo;
};
