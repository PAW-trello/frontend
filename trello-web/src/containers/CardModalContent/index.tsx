import React, { useState, useEffect } from 'react'
import { Modal, Loader } from 'semantic-ui-react'

type Props = {
  cardId: number | null;
}


export default ({cardId}: Props) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if(cardId) {
      // tu zapytanie o szczegoly karty
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    }
  }, [cardId])

  return <>
    {loading &&<Loader active/>}
    {!loading && <>
      <Modal.Header>Chosen card: {cardId}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          Tu jakiś kontent
        </Modal.Description>
      </Modal.Content>
    </>}
  </>
}