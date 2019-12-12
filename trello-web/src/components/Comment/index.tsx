import React, { useEffect } from "react";
import {
  Comment as CommentUI
} from "semantic-ui-react";
interface CommentProps {
    boardId: number;
    cardId: number;
    message: string;
    commentId: number;
    addComment: (cardId: number, message: string) => void;
}


const Comment = ({boardId, cardId, message,commentId}: CommentProps) => {
  useEffect(() => {
    // if(inputOpened) {
    //     console.log('add')
    //         window.addEventListener('click', clickListener)
    // } else {
    //     console.log('remove')
    //     window.removeEventListener('click', clickListener)
    // }
  }, []);

  // const removeComment = () => {
  //   // removeComment(id);
  //   console.log("remove");
  // };

  return (
    <CommentUI>
      {/* <Comment.Content>
        <Comment.Text>Mój pierwszy fajny komentarz!</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Usuń</Comment.Action>
          <Comment.Action>Edytuj</Comment.Action>
        </Comment.Actions>  
      </Comment.Content> */}
  </CommentUI>
  );
};

export default Comment;
