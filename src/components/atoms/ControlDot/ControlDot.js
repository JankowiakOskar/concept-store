import styled, { css } from 'styled-components';

const ControlDot = styled.span`
  display: inline-block;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  opacity: 0.3;
  background-color: ${({ theme }) => theme.grey400};
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.white};
    opacity: 1;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${({ theme }) => theme.white};
      opacity: 1;
    `}
`;

export default ControlDot;
