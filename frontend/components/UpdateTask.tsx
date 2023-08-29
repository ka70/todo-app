import {
    Button,
    FormControl,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';


function UpdateTask({ task, updateTask }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [body, setBody] = useState('');

    const initialRef = React.useRef()

    const handleUpdateTask = async () => {
        try {
            const updatedTask = { ...task, title: body }; // この例では"title"フィールドだけを更新しています

            const res = await fetch(`/api/tasks/${task.taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });

            if (res.ok) {
                const data = await res.json();
                // ローカルの状態も更新するために、親コンポーネントのupdateTask関数を呼び出す
                updateTask(data.taskId, data, onClose);
            } else {
                console.error('Failed to update the task');
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <>
            <IconButton
                icon={<FiEdit />}
                isRound='true'
                onClick={onOpen}
            />
            <Modal
                isCentered
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent w='90%'>
                    <ModalHeader>タスクの編集</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input ref={initialRef} placeholder='新しいタスク名' defaultValue={task.title} onChange={(e) => setBody(e.target.value)} onFocus={(e) => setBody(e.target.value)} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>キャンセル</Button>
                        <Button colorScheme='blue' onClick={handleUpdateTask}>
                            更新
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default UpdateTask;

