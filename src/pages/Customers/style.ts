import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1150px;
  margin: 0 auto;

  h1 {
    margin: 60px 0;
    text-align: center;
  }

  p {
    text-align: center;
  }

  table {
    width: 100%;
    border-spacing: 0 15px;

    th {
      font-weight: bold;
      text-align: center;
      font-size: 16px;
      line-height: 30px;
    }

    td {
      padding: 8px 32px;
      border: 0;
      background: #eeee;
      font-weight: normal;
      color: #111111;
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }
  }
`;

export const ButtonDelete = styled.button`
  padding: 2px 8px;
  background: transparent;
  border: transparent;
  border-radius: 5px;
  border: 2px solid red;
  padding: 10px 15px;
  color: white;
`;
