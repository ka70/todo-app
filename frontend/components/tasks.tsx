import { Box, Flex, HStack, Image, StackDivider, Text, VStack } from '@chakra-ui/react';
import { DeleteAllTask, DeleteTask } from './DeleteTask';
import UpdateTask from './UpdateTask';
import { TaskListProps } from './type';

function TaskList({ tasks, updateTask, deleteTask, deleteTaskAll, checkTask }: TaskListProps) {
    if (!tasks.length) {
        return (
            <>
                <Box maxW='80%'>
                    <Image mt='20px' w='98%' maxW='350' src='./empty.svg' alt='タスクが空です:(' />
                </Box>
            </>
        );
    }

    return (
        <>
            <VStack
                divider={<StackDivider />}
                borderColor='gray.100'
                borderWidth='2px'
                p='5'
                borderRadius='lg'
                w='100%'
                maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
                alignItems='stretch'
            >
                {tasks.map((task) => (
                    <HStack key={task.taskId}
                        // タスクの透明度を設定する。ステータスに応じて透明度が変わる。
                        opacity={
                            task.status === 'completed' ? '0.2' :  // 完了したタスクは透明度を0.2に設定
                                task.status === 'in-progress' ? '0.5' : // 進行中のタスクは透明度を0.5に設定
                                    '1'                                    // それ以外のタスクは透明度を1に設定（全く透明でない）
                        }>
                        <Text
                            w='100%'
                            p='8px'
                            borderRadius='lg'
                            as={task.status === 'completed' ? 's' : undefined}
                            cursor='pointer'
                            onClick={() => checkTask(task.taskId)}
                        >
                            {task.title}
                        </Text>
                        <DeleteTask task={task} deleteTask={deleteTask} deleteTaskAll={deleteTaskAll} />
                        <UpdateTask task={task} updateTask={updateTask} />
                    </HStack>
                ))}
            </VStack>

            <Flex>
                <DeleteAllTask deleteTaskAll={deleteTaskAll} />
            </Flex>
        </>
    );
}

export default TaskList;
