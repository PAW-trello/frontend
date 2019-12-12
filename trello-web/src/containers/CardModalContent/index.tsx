import React, { useState, useEffect } from "react";
import {
  Modal,
  Loader,
  Comment as SemanticComment,
  Button,
  TextArea
} from "semantic-ui-react";
import api from "../../utils/api";
import CommentCoponent from "../../components/Comment"
import { Comment } from '../../typings';

type Props = {
  cardId: number | null;
  lineId: number | null;
};

export default ({ cardId, lineId }: Props) => {
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("");
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewCommnet] = useState('')
  useEffect(() => {
    if (cardId && lineId) {
      api.showCardDetails(lineId, cardId).then(({ ok, data }) => {
        if (ok) {
          const cardInformation = data as any;
          setDescription(cardInformation.description);
          setTitle(cardInformation.title);
          setLabel(cardInformation.label)
        } else {
        }
      });
      api.showAllCardComments(cardId)
      .then(({ ok, data }) => {
        if (ok) { 
          setComments(data as Comment[])
        } else {}
      });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [cardId]);

  const removeComment = (removeId: number) => {
    const newComments = comments.filter(({ id }) => id !== removeId)
    setComments(newComments)
  }

  const renderSingleComment = (comment: Comment) =>
    <CommentCoponent key={comment.id} removeCommentProp={removeComment} {...comment}
    />
  
  const addComment = () => {
    if(cardId) {
      api.addComment(cardId, newComment).then(({data, ok}) => {
        setNewCommnet('')
        if(ok) {
          const newComments = [...comments, data] as Comment[]
          setComments(newComments)
        }
      })
    }
  } 

  // @ts-ignore
  const onChange = ({target: {value}}: React.FormEvent<HTMLTextAreaElement>) => {
    setNewCommnet(value)
  }

  return (
    <>
      {loading && <Loader active />}
       {!loading && (
         <>
           <Modal.Header> {title} </Modal.Header>
           <Modal.Content>
             <Modal.Description>
               <h2>Opis: {description || 'Brak'}</h2>
               <br/>
               <h2>Label: {label || 'Brak'}</h2>
               <br/>
               <h2>Komentarze</h2>
               <SemanticComment.Group>
                 {comments.map(renderSingleComment)}
                  <br/>
                  <TextArea style={{resize: 'none', width: '100%'}} value={newComment} onChange={onChange}/>
                  <br/>
                  <Button onClick={addComment}>Dodaj komentarz</Button>
   
               </SemanticComment.Group>
             </Modal.Description>
           </Modal.Content>
         </>
       )}
    </>
  );
};