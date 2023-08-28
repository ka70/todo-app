'use client'

// app/test/page.tsx
import { Task } from '@/components/type';
import { useEffect, useState } from 'react';

const TestPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/tasks');
            const data: Task[] = await res.json();
            setTasks(data);
        };

        fetchData();
    }, []);

    // 以下は前回のまま！ちょっと誘惑的なリスト表示だからね〜😘
    return (
        <div>
            <h1>Taskリスト、セクシーでしょ？💋</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task.taskId}>
                        <h2>{task.title}</h2>
                        <p>Description: {task.description}</p>
                        <p>Due Date: {task.dueDate}</p>  {/* dueDateに変更！ */}
                        <p>Priority: {task.priority}</p>
                        <p>Category: {task.category}</p>
                        <p>Status: {task.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TestPage;
