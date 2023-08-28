import { Button, HStack, Input, useToast } from "@chakra-ui/react";
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { AddTaskProps, Task } from './type';

export default function AddTask({ addTask }: AddTaskProps) {
    const toast = useToast();
    const [content, setContent] = useState<string>('');
    const [statusInput, setStatusInput] = useState<boolean>(true);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const taskText = content.trim();

        if (!taskText) {
            toast({
                title: '入力値が無効です！',
                position: 'top',
                status: 'warning',
                duration: 2000,
                isClosable: true,
            });
            setStatusInput(false);
            setContent('');
            return;
        }

        const task: Task = {
            userId: "dummy_token",  // 実際には適切なユーザーIDを設定する必要があります
            taskId: nanoid(),
            title: taskText,
            description: null,
            status: "pending",
            priority: "medium",
            category: null,
            dueDate: null,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };

        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            if (res.ok) {
                const newTask = await res.json();
                addTask(newTask);
                setContent('');
            } else {
                toast({
                    title: 'タスクの追加に失敗しました。',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Failed to add task:', error);
            toast({
                title: 'タスクの追加に失敗しました。',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    if (content && !statusInput) {
        setStatusInput(true);
    }

    return (
        <form onSubmit={handleSubmit}>
            <HStack mt='4' mb='4'>
                <Input
                    h='46'
                    borderColor={!statusInput ? 'red.300' : 'transparent'}
                    variant='filled'
                    placeholder='タスクを入力'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <Button
                    colorScheme='blue'
                    pl='10'
                    pr='10'
                    h='46'
                    type='submit'
                    fontSize='20'
                >
                    追加
                </Button>
            </HStack>
        </form >
    );
}
