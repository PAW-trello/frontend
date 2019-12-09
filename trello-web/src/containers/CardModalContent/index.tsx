import React, { useState, useEffect } from 'react'
import {Modal, Loader, Button, Input} from 'semantic-ui-react'
import api from "../../utils/api";

type Props = {
  cardId: number | null;
  laneId: number | null;
}


export default ({cardId, laneId}: Props) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if(cardId && laneId) {
      api.getCardDetails(laneId, cardId).then(({data}) => {
        console.log(data);
      });
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    }
  }, [cardId, laneId])

  return <>
    {loading &&<Loader active/>}
    {!loading && <>
      <Modal.Header>Chosen card: {cardId}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <h2>Komentarze</h2>
          <Input></Input>
          <Button>Dodaj komentarz</Button>

          <Button>Dodaj załącznik</Button>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button>jeden</Button>
        <Button>dwa</Button>
      </Modal.Actions>
    </>}
  </>
}
