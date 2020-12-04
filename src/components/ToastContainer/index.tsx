import React from 'react';

import Toast from './Toast';

import { Container } from './style';

export interface ToastMessages {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description: string;
}

interface ToastContainerProps {
  messages: ToastMessages[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  return (
    <Container>
      {messages.map(item => (
        <Toast key={item.id} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
