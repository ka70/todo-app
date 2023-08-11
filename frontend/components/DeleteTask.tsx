import {
    Button, IconButton, Modal, ModalBody, ModalContent, ModalFooter,
    ModalHeader, ModalOverlay, Text, useDisclosure
} from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';
import { DeleteAllTaskProps, DeleteTaskProps } from './type'; // Assuming type.ts is in the same directory.

const DeleteAllTask: React.FC<DeleteAllTaskProps> = ({ deleteTaskAll }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
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
                        <Button colorScheme='blue' onClick={() => deleteTaskAll()}>
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
                        <Button colorScheme='blue' onClick={() => deleteTask(task.id, onClose)}>
                            はい
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export { DeleteAllTask, DeleteTask };

