import React, { useState, useEffect } from "react";
import {
  Modal,
  Loader,
  Button,
  Form
} from "semantic-ui-react";
import api from "../../utils/api";
import Comment from "../../components/Comment"

type Props = {
  cardId: number | null;
  lineId: number | null;
};

export default ({ cardId, lineId }: Props) => {
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState<Comment[]>([])
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
      api.showAllCardComments(cardId)
      .then(({ ok, data }) => {
        if (ok) {
          setComments(data as Comment[])
          console.log("pobrano komentarze");
          console.log(comments);
        } else {
          console.log("kiła mogiła");
        }
      });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [cardId]);

  const renderSingleComment = ({ }: Comment) =>
    <Comment
      boardId = {boardId}
      cardId = {cardId}
      message = {message}
      commentId = {commentId}
      addComment = {addComment}
    />
  
  const addComment = 

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
                {comments.map(renderSingleComment)}
                <Form reply>
                  <Form.TextArea value={message} onChange={updateCommentMessage}/>
                    <Button onClick={addComment}>Dodaj komentarz</Button>
   
                </Form>
              </Comment.Group>
            </Modal.Description>
          </Modal.Content>
        </>
      )}
    </>
  );
};
