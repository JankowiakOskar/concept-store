import styled, { css } from 'styled-components'

const ControlDot = styled.span`
  display: inline-block;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  opacity: 0.3;
  background-color: ${({ theme }) => theme.grey400};
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
  cursor: pointer;

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${({ theme }) => theme.white};
      opacity: 1;
    `}
`

export default ControlDot
