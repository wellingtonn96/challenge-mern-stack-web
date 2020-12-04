import styled, { css } from 'styled-components';

const toastTypeValidations = {
  info: css`
    background: #ebfaff;
    color: #3172b7;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

interface ToastProps {
  type?: 'success' | 'info' | 'error';
}

export const Container = styled.div<ToastProps>`
  width: 300px;
  display: flex;
  position: relative;
  margin: 20px;
  padding: 16px;
  border-radius: 5px;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
  ${props => toastTypeValidations[props.type || 'info']}

  & + div {
    margin-top: 10px;
  }

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    color: inherit;
    background: transparent;
    border: 0;
    opacity: 0.6;
  }
`;
