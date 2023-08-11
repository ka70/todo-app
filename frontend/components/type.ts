// types.ts

export interface Task {
    userId: string;
    taskId: string;
    title: string;
    description: string | null;
    status: string | 'pending' | 'in-progress' | 'completed'; // これが"pending"などの値を持つことを反映
    priority: string | 'low' | 'medium' | 'high'; // これが"medium"などの値を持つことを反映
    category: string | null;
    dueDate: number | null;
    createdAt: number;
    updatedAt: number;
}

export interface TaskListProps {
    tasks: Task[];
    updateTask: (taskId: string, updatedTask: Task) => void;
    deleteTask: (taskId: string) => void;
    deleteTaskAll: () => void;
    checkTask: (taskId: string) => void;
}

export interface AddTaskProps {
    addTask: (task: Task) => void;
}

export interface DeleteAllTaskProps {
    deleteTaskAll: () => void;
}

export interface DeleteTaskProps {
    task: Task;
    deleteTask: (id: string, onClose: () => void) => void;
}
