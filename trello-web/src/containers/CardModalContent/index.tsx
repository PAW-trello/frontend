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
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
type Props = {
  cardId: number | null;
  lineId: number | null;
  setDate: (n: number, k: number, x: string) => void
};

export default ({ cardId, lineId, setDate }: Props) => {
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState<Comment[]>([])
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [newComment, setNewCommnet] = useState('')
  useEffect(() => {
    if (cardId && lineId) {
      api.showCardDetails(lineId, cardId).then(({ ok, data }) => {
        if (ok) {
          const cardInformation = data as any;
          setDescription(cardInformation.description);
          setTitle(cardInformation.title);
          cardInformation.label ? setStartDate(new Date(Date.parse(cardInformation.label))) : setStartDate(null)
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
  }, [cardId, lineId]);

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

  const sendStartDate = (date: any) => {
    setStartDate(date)
    if(lineId !== null && cardId !== null){
      setDate(lineId, cardId, dayjs(date).format("DD/MM/YYYY HH:mm"))
      api.editCard(lineId, cardId, title, description, dayjs(date).toISOString())
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
               <h2>Termin:</h2>
                <DatePicker
                  selected={startDate} 
                  onChange={sendStartDate}
                  showTimeSelect
                  timeFormat="HH:mm"
                  dateFormat="dd/MM/yyyy HH:mm"
                />
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