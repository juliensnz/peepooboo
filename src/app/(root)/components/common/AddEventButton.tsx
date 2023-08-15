'use client';

import {ModalContext} from '@/app/(root)/components/context/ModalContext';
import {motion} from 'framer-motion';
import Image from 'next/image';
import {useLayoutEffect, useRef, useState} from 'react';
import styled from 'styled-components';

const Container = styled(motion.div)`
  border: 1px solid #555;
  position: absolute;
  bottom: 10px;
  left: 10px;
  overflow: hidden;
  -webkit-backdrop-filter: blur(33px);
  backdrop-filter: blur(33px);
  background-blend-mode: overlay;
`;

const Form = styled(motion.div)``;

const Button = styled(motion.div)`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
`;

type AddEventButtonProps = {
  children: React.ReactNode;
};

const button = {
  open: {
    rotate: '45deg',
    transition: {
      type: 'spring',
    },
  },
  closed: {
    rotate: '0deg',
    transition: {
      type: 'spring',
    },
  },
};

const container = {
  open: (height: number) => ({
    width: 'calc(100vw - 20px)',
    height: `${height}px`,
    borderRadius: '15px',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  }),
  closed: {
    width: '50px',
    height: '50px',
    borderRadius: '25px',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const useHeight = (ref: React.RefObject<HTMLDivElement>) => {
  const [height, setWidth] = useState(0);

  useLayoutEffect(() => {
    setTimeout(() => {
      setWidth((ref.current?.offsetHeight ?? 0) - 60);
    }, 200);
  }, []);

  return height;
};

const form = {
  open: (height: number) => ({
    opacity: 1,
    width: '100%',
    transition: {
      type: 'spring',
      stiffness: 600,
      damping: 40,
    },
  }),
  closed: {
    opacity: 0,
    width: '0%',
    transition: {
      type: 'spring',
      stiffness: 600,
      damping: 40,
    },
  },
};

const AddEventButton = ({children}: AddEventButtonProps) => {
  const [isOpen, setState] = useState(false);
  const formRef = useRef(null);
  const height = useHeight(formRef);

  return (
    <Container custom={height} initial={false} animate={isOpen ? 'open' : 'closed'} variants={container}>
      <Form initial={false} animate={isOpen ? 'open' : 'closed'} variants={form} ref={formRef}>
        <ModalContext.Provider value={{closeModal: () => setState(false)}}>{children}</ModalContext.Provider>
      </Form>
      <Button initial={false} onClick={() => setState(!isOpen)} animate={isOpen ? 'open' : 'closed'} variants={button}>
        <Image src="/icon/plus.svg" width={20} height={20} alt="plus" />
      </Button>
    </Container>
  );
};

export {AddEventButton};
