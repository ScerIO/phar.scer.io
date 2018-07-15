import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const FormContainer = styled.div`
  padding: 16px;

  & > * {
    width: 100%;
  }
`

export default {
  Container,
  FormContainer,
}
