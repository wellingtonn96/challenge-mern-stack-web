import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { useToast } from '../../../hooks/Toast';

import { Container } from './style';

interface ToastMessage {
  id: string;
  type?: 'success' | 'info' | 'error';
  title: string;
  description: string;
}

interface ToatProps {
  message: ToastMessage;
}

const Toast: React.FC<ToatProps> = ({ message }) => {
  const { removeToast } = useToast();

  return (
    <Container type={message.type}>
      <FiAlertCircle size={24} />
      <div>
        <strong>{message.title}</strong>
        <p>{message.description}</p>
      </div>
      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
