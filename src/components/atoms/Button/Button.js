import styled from 'styled-components'

const Button = styled.button`
  width: 170px;
  height: 50px;
  padding: 20px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 20px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.small};
  text-shadow: 0 0 5px ${({ theme }) => theme.black};
  color: ${({ theme }) => theme.white};
  text-transform: uppercase;
  box-shadow: 0px 2px 7px -1px rgba(0, 0, 0, 0.75);

  outline: none;
`

export default Button
