/* eslint-disable import/prefer-default-export */
import { css } from 'styled-components';

export const baseIconStyle = css`
  font-size: 3rem !important;
  color: ${({ theme }) => theme.black};
  cursor: pointer;
`;

export const hoverIconStyle = css`
  border-radius: 50%;
  &:hover {
    background-color: ${({ theme }) => theme.grey400};
  }
`;
