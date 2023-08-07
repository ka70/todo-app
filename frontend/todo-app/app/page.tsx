'use client'

import { Flex, Heading, IconButton, Link, VStack, useColorMode } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaMoon, FaSun } from 'react-icons/fa';
import AddTask from "./[components]/AddTask";
import TaskList from "./[components]/TaskList";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack p={4} minH='100vh' pb={28}>
      <IconButton
        icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
        isRound='true'
        size='md'
        alignSelf='flex-end'
        onClick={toggleColorMode}
      />

      <Heading
        p='5'
        fontWeight='extrabold'
        size='xl'
        bgGradient='linear(to-l, teal.300, blue.500)'
        bgClip='text'
      >
        Todo App
      </Heading>
      <AddTask />
      <TaskList />
      <Flex position='absolute' bottom='5'>
        <Link href='https://github.com/raminhuk' target='_blank' >
          <IconButton
            icon={<FaGithub />}
            isRound='true'
            size='md'
            m='1'
          />
        </Link>
        <Link href='https://www.linkedin.com/in/fabio-junior-raminhuk-740669121/' target='_blank'>
          <IconButton
            icon={<FaLinkedin />}
            isRound='true'
            size='md'
            m='1'
          />
        </Link>
      </Flex>
    </VStack>

  )
}
