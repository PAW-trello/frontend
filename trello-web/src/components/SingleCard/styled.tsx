import styled from 'styled-components'
import { Icon, Card } from 'semantic-ui-react'

export const SpinnerContainer = styled.div`
  width: 100%;
  min-height: 125px;    
  text-align: center;
`

export const CenterContainer = styled(Card.Content)`
  min-height: 50px;
` 
export const IconStyled = styled(Icon)`
  float: right;
  cursor: pointer;
`