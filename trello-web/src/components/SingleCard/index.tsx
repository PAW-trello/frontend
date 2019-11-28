import React from 'react';
import { Card, CardBody, CardTitle, Button, Spinner } from 'reactstrap';
import { SpinnerContainer } from './styled';
import api from '../../utils/api';
import { toast } from 'react-toastify';
interface SingleCardProps {
    id: number;
    name: string;
    removeBoard: (id: number) => void;
}

class SingleCard extends React.PureComponent<SingleCardProps> {
    state={
        newName: this.props.name,
        inputOpened: false,
        loadingState: false,
    }
    componentDidUpdate = (_: SingleCardProps, prevState: any) => {
        const {inputOpened} = this.state
        const {inputOpened: wasOpened} = prevState
        if(inputOpened && !wasOpened) {
            console.log('add')
            setTimeout(() => {
                window.addEventListener('click',this.clickListener)
            }, 0);
        }
        if(wasOpened && !inputOpened) {
            window.removeEventListener('click', this.clickListener)
        }
    }

    clickListener = (e: any) => {
        if(this.state.inputOpened && e.target.id !== 'edit-name') {
            this.editCard()
        }
    }

    public deleteCard = () => {
        this.props.removeBoard(this.props.id);
        console.log("deleted");
    }
    public editCard = () => {
        const {id, name} = this.props;
        const {newName} = this.state
        this.setState({
            loadingState: true,
            inputOpened: false
        })
        api.updateBoard(newName, id).then(({ok}) => {
            if(ok) {
                this.setState({
                    loadingState: false
                })
            } else {
                toast.error('Nie udało się zaktualizować boarda')
                this.setState({
                    newName: name
                })  
            }
        })

        console.log(id,newName);
    }
    showInput = () => this.setState({inputOpened: true})

    changeName=(e: any) => {
        this.setState({newName: e.target.value})
    }

    keyDownHandler = (e: any) => {
        if (e.key === 'Enter') {
            this.editCard()
            return
        }
    }

    public render() {
        const { id } = this.props
        const {inputOpened, newName, loadingState} = this.state
        return (
                <Card>
                    <CardBody>
                        {loadingState && <SpinnerContainer>
                            <Spinner />
                            </SpinnerContainer>
                        }
                        {!loadingState && <>
                            {!inputOpened && <CardTitle onClick={this.showInput}>{newName}</CardTitle>}
                            {inputOpened && <input id={'edit-name'} value={newName} onChange={this.changeName} onKeyDown={this.keyDownHandler}/> }
                            <br/>
                            <Button onClick={this.deleteCard}>Usuń</Button>
                            <Button href={`/board/${id}`}>Otwórz</Button>
                        </>}
                    </CardBody>
                </Card>
        );
    }
}

export default SingleCard;
