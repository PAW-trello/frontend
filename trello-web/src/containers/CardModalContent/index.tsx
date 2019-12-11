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
                  <Comment.Avatar src="https://a.allegroimg.com/s400/112a4b/40c85ffe417aa6e9a2ca16a46f36/Talk-to-me-duck-kaczka-programista-torba-na" />
                  <Comment.Content>
                    <Comment.Text>Mój pierwszy fajny komentarz!</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Usuń</Comment.Action>
                      <Comment.Action>Edytuj</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>{" "}
                <Form reply>
                  <Form.TextArea />
                  <Button
                    content="Dodaj komentarz"
                    labelPosition="left"
                    icon="edit"
                    primary
                  />
                </Form>
              </Comment.Group>
            </Modal.Description>
          </Modal.Content>
        </>
      )}
    </>
  );
};
