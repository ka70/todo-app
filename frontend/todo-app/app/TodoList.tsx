import { Todo } from '../types';
import TodoListItem from './TodoListItem';

interface TodoListProps {
    todos: Todo[];
}

const ListTask = ({ todos }: TodoListProps) => {
    return (
        <ul className='space-y-3'>
            {todos.map((todo) => (
                <TodoListItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
};

export default ListTask;
