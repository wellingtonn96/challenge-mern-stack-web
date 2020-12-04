import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background-color: #566573;
  text-align: center;
  padding: 20px;
  box-shadow: 2px 5px 8px 5px #bbbbbb;

  li {
    display: inline;

    a {
      font-style: none;
      text-decoration: none;
      color: white;
      margin-left: 10px;
      font-weight: 600;

      &:hover {
        opacity: 0.7;
      }
    }
  }
`;
