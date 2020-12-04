import styled, { css } from 'styled-components';

interface ContainerProps {
  zIndex: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  ${props =>
    props.zIndex &&
    css`
      z-index: -1;
    `}

  header {
    background: blue;
    width: 100%;
  }
`;

export const Main = styled.div`
  display: flex;
  align-content: center;
  flex-direction: column;

  p {
    text-align: left;
    margin-top: 20px;
  }

  table {
    width: 800px;
    text-align: center;
    background: white;
    margin-bottom: 50px;

    td {
      width: 800px;
    }

    thead {
      th {
        background-color: #0091ab;
        color: #ffff;
        padding: 5px;
      }
    }

    tr:nth-child(even) {
      background-color: #cacaca;
      border: 1px solid #dddddd;
    }

    tr {
      padding: 20px;
    }
  }
`;

export const FormContent = styled.div`
  form {
    background: #fff;
    margin-top: 60px;
    width: 300px;
    padding: 20px;
    box-shadow: 0 0 10px #bbbb;

    h1 {
      font-size: 24px;
      padding: 20px;
      text-align: center;
    }
  }
`;

export const Field = styled.div`
  margin-bottom: 15px;

  input {
    border: none;
    border-bottom: 1px solid #bbbb;
    width: 100%;
    padding: 0 10px;
    height: 40px;
  }
`;

// export const InputSearch = styled.div`
//   display: flex;
//   background-color: transparent;
//   border: none;

//   input {
//     padding: 0 10px;
//     height: 30px;
//     border: transparent;
//   }

//   button {
//     background-color: transparent;
//     border: transparent;
//     margin-right: 10px;
//     text-transform: uppercase;

//     &:hover {
//       text-decoration: underline;
//     }
//   }
// `;

export const GeoLocationField = styled.div`
  margin: 50px 0;
  display: flex;

  input {
    background-color: transparent;
    text-align: center;
    text-transform: capitalize;
  }

  input + input {
    margin-left: 10px;
  }
`;

export const ButtonSave = styled.button`
  height: 40px;
  text-transform: uppercase;
  border: transparent;
  background-color: #00ab5d;
  width: 100%;
  color: #fff;
`;

export const ButtonResetContent = styled.div`
  box-shadow: 0 0 10px #bbbb;
  width: 300px;
  background: #ffff;
  margin-top: 15px;
  border: transparent;
  padding: 20px;
`;

export const ButtonReset = styled.button`
  height: 40px;
  text-transform: uppercase;
  border: transparent;
  background-color: #f92b2b;
  width: 100%;
  color: #fff;
`;
