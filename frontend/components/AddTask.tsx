import { Button, HStack, Input, useToast } from "@chakra-ui/react";
import { nanoid } from 'nanoid';
import { useState } from 'react';

import { AddTaskProps, Task } from './type';


export default function AddTask({ addTask }: AddTaskProps) {
    const toast = useToast();
    const [content, setContent] = useState<string>('');
    const [statusInput, setStatusInput] = useState<boolean>(true);

    function handleSubmit(e: React.FormEvent) {
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
            id: nanoid(),
            body: taskText,
            check: false,
        };

        addTask(task);
        setContent('');
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

