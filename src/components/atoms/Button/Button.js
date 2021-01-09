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

  outline: none;

  ${({ secondary }) =>
    secondary &&
    css`
      background-color: transparent;
      border: 1px solid ${({ theme }) => theme.grey300};
      color: ${({ theme }) => theme.grey500};
    `}

  ${({ outlined }) =>
    outlined &&
    css`
      background-color: ${({ theme }) => theme.white};
      border: border: 1px solid ${({ theme }) => theme.grey100};
      box-shadow: none;
      text-shadow: none;
      color: ${({ theme }) => theme.grey100};
    `}
`;

export const UnderlineButton = styled.button`
  padding: 0 0 2px 0;
  background-color: transparent;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  font-size: ${({ theme }) => theme.font.size.medium};
  color: ${({ theme }) => theme.grey100};
  border: none;
  border-bottom: 1px solid ${(theme) => theme.grey};
`;

export default Button;
