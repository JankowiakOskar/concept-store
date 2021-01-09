/* eslint-disable import/prefer-default-export */
import { css } from 'styled-components';

export const baseIconStyle = css`
  font-size: 3rem !important;
  color: ${({ theme }) => theme.grey100};
  cursor: pointer;
`;
