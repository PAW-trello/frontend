import React, { useState, useEffect } from 'react'
import { Modal, Loader, Button} from 'semantic-ui-react'
import api from '../../utils/api'
import { CenteredContainer, InputStyled } from './styled';

type Props = {
  cardId: number | null;
  lineId: number | null;
}


export default ({cardId,lineId}: Props) => {
  const [loading, setLoading] = useState(true)
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  useEffect(() => {
    if(cardId && lineId) {
      api.showCardDetails(lineId, cardId)
      .then(({ ok, data }) => {
        if (ok) {
          const cardInformation = data as any;
          setDescription(cardInformation.description); 
          setTitle(cardInformation.title); 
          console.log("pobrano szczegoly karty");
        } else {
            console.log("kiła mogiła");
        }

      });
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    }
  }, [cardId],)

  return <>
    {loading &&<Loader active/>}
    {!loading && <>
      <Modal.Header> {title} </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          Opis: {description}
          <CenteredContainer>
            <br />
            <InputStyled type='text'
                value=''
                placeholder="Dodaj komentarz"
            />
            <Button>Dodaj komentarz</Button>
          </CenteredContainer>
        </Modal.Description>
      </Modal.Content>
    </>}
  </>
}