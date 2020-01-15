import React, { useEffect, useState } from "react";
//@ts-ignore
import TrelloBoard from "react-trello";
import { useParams, useHistory, useLocation } from "react-router";
import api from "../../utils/api";
import { Board } from "../../typings";
import { Loader, Modal } from "semantic-ui-react";
import CardModalContent from "../CardModalContent";
import dayjs from 'dayjs';
import {set, cloneDeep} from 'lodash'
const SingleBoard = () => {
  const {push, replace} = useHistory();
  const {pathname} = useLocation()
  const { id } = useParams();
  const [boardDetails, setBoardDetails] = useState<Board | null>(null);
  const [lines, setLines] = useState<any[]>([]);
  const [chosenCard, setChosenCard] = useState<number | null>(null);
  const [chosenLine, setChosenLine] = useState<number | null>(null);
  const addLine = ({ title }: { title: string }) => {
    if (id) {
      api.addNewLine(+id, title).then(({ data }) => {
        // @ts-ignore
        const x = { ...data, id: "" + data.id, cards: [] };
        const newList = [...lines, x];
        setLines(newList);
      });
      console.log("add");
    }
  };

  const deleteLine = (lineId: number) => {
    if (id) {
      api.removeLine(+id, lineId);
      const x = lines.filter(({ id: listId }) => lineId !== listId);
      setLines(x);
      console.log("delete");
    }
  };

  const editLine = (lineId: number, { title }: { title: string }) => {
    if (id) {
      api.editLine(+id, lineId, title);
      const x = { ...lines };
      const index = lines.findIndex(({ id: listId }) => lineId === listId);
      x[index].title = title;
    }
  };
  const clickCard = (cardId: number, metadata: any, lineId: number) => {
      setChosenCard(cardId);
      setChosenLine(lineId);
  };
  const closeModal = () => setChosenCard(null);

  const onCardAdd = (cardId: any, lineId: number) => {
    api
      .addCard(lineId, cardId.title, cardId.description)
      .then(({ ok, data }) => {
        if (ok) {
          push('/xd')
          replace(pathname)
        } else {
            console.log("kiła mogiła");
        }

      });
  };

  const onCardDelete = (cardId: number, lineId: number) => {
    console.log(lineId)
    api
    .removeCard(lineId, cardId)
    .then(({ ok, data }) => {
      if (ok) {
        console.log("remove card");
      } else {
          console.log("kiła mogiła");
      }
    });
  };

  const setDate = (lineId: number, cardId: number, date: string) => {
    const lineIndex = lines.findIndex(({id}) =>{
       return id  === lineId
    })
    // @ts-ignore
    const cardIndex = lines[lineIndex].cards.findIndex(({id}) => id === cardId)
    const lineCopy = cloneDeep(lines)
    set(lineCopy, `[${lineIndex}].cards[${cardIndex}].label`, date)
    setLines(lineCopy)
  }

  const handleLineEnd = (_: number, toIndex: number, payload: any) => {
    api.changeLineOrder(toIndex, +payload.id);
  };

  useEffect(() => {
    if (id) {
      api.getBoardDetails(+id).then(({ data }) => {
        setBoardDetails(data as Board);
        let lines = [];
        // @ts-ignores
        if (data.lists) {
          // @ts-ignores
          lines = data.lists.map(list => ({
            ...list,
            id: "" + list.id,
            // @ts-ignores
            cards: list.cards.map(card => ({
              ...card,
              label: card.label ? dayjs(Date.parse(card.label)).format("DD/MM/YYYY HH:mm") : ''
            }))
          }));
        }
        setLines(lines);
      });
    }
  }, [id]);

  if (boardDetails === null) return <Loader active />;
  const { name } = boardDetails;
  return (
    <>
      <div>
        {name && (
          <div style={{ backgroundColor: "#3179ba" }}>
            <div
              style={{
                fontSize: "20px",
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                padding: "10px"
              }}
            >
              Nazwa boarda: {name}
            </div>
            <TrelloBoard
              draggable
              handleLaneDragEnd={handleLineEnd}
              onCardClick={clickCard}
              onLaneUpdate={editLine}
              onLaneDelete={deleteLine}
              onLaneAdd={addLine}
              data={{ lanes: lines }}
              onCardAdd={onCardAdd}
              onCardDelete={onCardDelete}
              canAddLanes
              editable
              editLaneTitle
            />
          </div>
        )}
      </div>
      <Modal open={!!chosenCard} onClose={closeModal}>
        <CardModalContent setDate={setDate} cardId={chosenCard} lineId={chosenLine}/>
      </Modal>
    </>
  );
};

export default SingleBoard;
