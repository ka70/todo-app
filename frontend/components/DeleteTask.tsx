import {
    Button, IconButton, Modal, ModalBody, ModalContent, ModalFooter,
    ModalHeader, ModalOverlay, Text, useDisclosure, useToast
} from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';
import { DeleteAllTaskProps, DeleteTaskProps } from './type';

const DeleteAllTask: React.FC<DeleteAllTaskProps> = ({ deleteTaskAll }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const handleDeleteAll = async () => {
        try {
            const res = await fetch('/api/tasks', { method: 'DELETE' });
            if (res.ok) {
                await deleteTaskAll();
                onClose();
                toast({
                    title: '全てのタスクが削除されました。',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                throw new Error('Failed to delete all tasks');
            }
        } catch (error) {
            toast({
                title: 'タスクの削除に失敗しました。',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Button
                colorScheme='gray'
                px='8'
                h='45'
                color='gray.500'
                mt='8'
                onClick={onOpen}>
                すべてクリア
            </Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent w='90%'>
                    <ModalHeader>
                        全てのタスクを削除しますか?
                    </ModalHeader>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>いいえ</Button>
                        <Button colorScheme='blue' onClick={handleDeleteAll}>
                            はい
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

const DeleteTask: React.FC<DeleteTaskProps> = ({ task, deleteTask }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/tasks/${task.taskId}`, { method: 'DELETE' });
            if (res.ok) {
                await deleteTask(task.taskId, onClose);
                toast({
                    title: 'タスクが削除されました。',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                throw new Error('Failed to delete the task');
            }
        } catch (error) {
            toast({
                title: 'タスクの削除に失敗しました。',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <IconButton
                icon={<FiTrash2 />}
                isRound='true'
                onClick={onOpen}
            />
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent w='90%'>
                    <ModalHeader>
                        タスクを削除しますか?
                    </ModalHeader>
                    <ModalBody>
                        <Text>{task.body}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>いいえ</Button>
                        <Button colorScheme='blue' onClick={handleDelete}>
                            はい
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export { DeleteAllTask, DeleteTask };
