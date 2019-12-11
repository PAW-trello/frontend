import React, { useEffect } from "react";
import { IconStyled } from "./styled";
import { Card } from "semantic-ui-react";
// interface CommentProps {
//     id: number;
//     name: string;
//     removeComment: (id: number) => void;
// }

// const Comment = ({id, name, removeComment}: CommentProps) => {
const Comment = () => {
  useEffect(() => {
    // if(inputOpened) {
    //     console.log('add')
    //         window.addEventListener('click', clickListener)
    // } else {
    //     console.log('remove')
    //     window.removeEventListener('click', clickListener)
    // }
  }, []);

  const deleteCard = () => {
    // removeComment(id);
    console.log("remove");
  };

  return (
      <Card.Content>
        <IconStyled color="red" name="cancel" onClick={deleteCard} />
        <Card.Header>dupa</Card.Header>
        <br />
      </Card.Content>

  );
};

export default Comment;
