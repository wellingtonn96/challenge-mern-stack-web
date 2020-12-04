import React, { createContext, useCallback, useState, useContext } from 'react';
import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(message: Omit<ToastMessages, 'id'>): void;
  removeToast(id: string): void;
  messages: ToastMessages[];
}

const ToastContext = createContext({} as ToastContextData);

interface ToastMessages {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description: string;
}

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessages[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessages, 'id'>) => {
      const data = {
        id: Math.random().toString(),
        type,
        title,
        description,
      };

      setMessages(state => [...state, data]);
    },
    [],
  );

  const removeToast = useCallback(
    (id: string) => {
      const removedToasts = messages.filter(item => item.id !== id);

      setMessages(removedToasts);
    },
    [messages],
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast, messages }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

const useToast = (): ToastContextData => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a toast provider');
  }

  return context;
};

export { ToastProvider, useToast };
