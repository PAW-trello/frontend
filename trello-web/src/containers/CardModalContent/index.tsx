import React, { useState, useEffect } from "react";
import {
  Modal,
  Loader,
  Button,
  Comment,
  Form
} from "semantic-ui-react";
import api from "../../utils/api";

type Props = {
  cardId: number | null;
  lineId: number | null;
};

export default ({ cardId, lineId }: Props) => {
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  useEffect(() => {
    if (cardId && lineId) {
      api.showCardDetails(lineId, cardId).then(({ ok, data }) => {
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
        setLoading(false);
      }, 1000);
    }
  }, [cardId]);

  return (
    <>
      {loading && <Loader active />}
      {!loading && (
        <>
          <Modal.Header> {title} </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              Opis: {description}
              <Comment.Group>
                <Comment>
                  <Comment.Content>
                    <Comment.Text>Mój pierwszy fajny komentarz!</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Usuń</Comment.Action>
                      <Comment.Action>Edytuj</Comment.Action>
                    </Comment.Actions>  
                  </Comment.Content>
                </Comment>{" "}
                <Comment>
                  <Comment.Content>
                    <Comment.Text>Mój jest fajniejszy :o</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Usuń</Comment.Action>
                      <Comment.Action>Edytuj</Comment.Action>
                    </Comment.Actions>  
                  </Comment.Content>
                </Comment>{" "}
                <Form reply>
                  <Form.TextArea />
                    <Button>Dodaj komentarz</Button>
                  
                </Form>
              </Comment.Group>
            </Modal.Description>
          </Modal.Content>
        </>
      )}
    </>
  );
};
