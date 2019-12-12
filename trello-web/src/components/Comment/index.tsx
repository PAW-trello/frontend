import React from "react";
import {
  Comment as CommentUI
} from "semantic-ui-react";
import { Comment } from '../../typings';
import api from '../../utils/api';

interface Props extends Comment {
  removeCommentProp: (id: number) => void
}

const CommentComponent = ({card_id, message, id, removeCommentProp} : Props) => {

  const removeComment = () => {
    api.removeComment(card_id, id)
    removeCommentProp(id)
  };

  return (
    <CommentUI>
      <CommentUI.Content>
        <CommentUI.Text>{message}</CommentUI.Text>
        <CommentUI.Actions>
          <CommentUI.Action onClick={removeComment}>Usuń</CommentUI.Action>
          {/* <CommentUI.Action onClick={editComment}>Edytuj</CommentUI.Action> */}
        </CommentUI.Actions>  
      </CommentUI.Content>
  </CommentUI>
  );
};

export default CommentComponent;
