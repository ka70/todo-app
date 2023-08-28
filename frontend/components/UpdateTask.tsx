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
                            <Input ref={initialRef} placeholder='新しいタスク名' defaultValue={task.body} onChange={(e) => setBody(e.target.value)} onFocus={(e) => setBody(e.target.value)} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>キャンセル</Button>
                        <Button colorScheme='blue' onClick={() => updateTask(task.id, body, onClose)}>
                            更新
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateTask;
