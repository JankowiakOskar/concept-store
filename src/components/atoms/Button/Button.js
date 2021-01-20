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
  color: ${({ theme }) => theme.white};
  text-transform: uppercase;
  outline: none;
  transition: all 0.3s ease-out;

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

export const HoverPrimaryBtn = css`
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
  }
`;

export const HoverPrimaryDarkBtn = css`
  &:hover {
    background-color: ${({ theme }) => theme.primaryDark};
    color: ${({ theme }) => theme.white};
  }
`;

export const HoverBlackBtn = css`
  &:hover {
    background-color: ${({ theme }) => theme.black};
    opacity: 0.9;
    color: ${({ theme }) => theme.primaryLight};
  }
`;

export default Button;
