import {createContext, useContext} from 'react';

const ModalContext = createContext<{closeModal: () => void}>({closeModal: () => {}});

const useModalContext = (): {closeModal: () => void} => {
  return useContext(ModalContext);
};

export {useModalContext, ModalContext};
