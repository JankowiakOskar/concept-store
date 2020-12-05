import styled, { css } from 'styled-components';

const Button = styled.button`
  width: 170px;
  height: 50px;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 10px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.small};
  text-shadow: 0 0 5px ${({ theme }) => theme.black};
  color: ${({ theme }) => theme.white};
  text-transform: uppercase;
  box-shadow: 0px 2px 7px -1px rgba(0, 0, 0, 0.75);
  outline: none;

  ${({ secondary }) =>
    secondary &&
    css`
      background-color: transparent;
      border: 1px solid ${({ theme }) => theme.grey300};
      color: ${({ theme }) => theme.grey500};
    `}

  ${({ tertiary }) =>
    tertiary &&
    css`
      background-color: transparent;
      border: none;
      box-shadow: none;
      text-shadow: none;
      color: ${({ theme }) => theme.grey100};
    `}
`;

export default Button;
