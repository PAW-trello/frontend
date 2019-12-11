import React, { useState, useEffect } from 'react'
import { Modal, Loader} from 'semantic-ui-react'
import api from '../../utils/api'

type Props = {
  cardId: number | null;
  lineId: number | null;
}


export default ({cardId,lineId}: Props) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if(cardId && lineId) {
      api.showCardDetails(lineId, cardId)
      .then(({ ok, data }) => {
        if (ok) {
          console.log(data);
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
      <Modal.Header>Chosen card: {cardId}  </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          Tu jakiś kontent
        </Modal.Description>
      </Modal.Content>
    </>}
  </>
}