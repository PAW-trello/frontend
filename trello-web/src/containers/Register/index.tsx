import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";

import api from '../../utils/api';
import RegisterPayload from "../../typings";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      username: "",
      password_confirmation: ""
    };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(target);
    console.log(value);
    console.log(name);

    this.setState({
      [name]: value
    });
    }
  handleSubmit = () => {
       console.log(this.state)
      api
        .register({
          email: this.state.email, username: this.state.username, password: this.state.password, password_confirmation: this.state.password_confirmation
        })
        .then(({ok, data}) => {
          if (ok) {
           console.log('zarejestrowano')
          } else {
            console.log('wyjebalo sie cos')
          }
        })
        .catch(e => {
          console.log(e);
        });
  };
  
  render() {
    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            {" "}
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Nazwa użytkownika</Label>
                <Input
                  type="text"
                  name="username"
                  onChange={this.handleInputChange}
                  placeholder="Wpisz nazwę użytkownika"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  onChange={this.handleInputChange}
                  placeholder="Wpisz email"
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Hasło</Label>
                <Input
                  type="password"
                  name="password"
                  onChange={this.handleInputChange}
                  placeholder="Wpisz hasło"
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Potwierdź hasło</Label>
                <Input
                  type="password"
                  name="password_confirmation"
                  onChange={this.handleInputChange}
                  placeholder="Wpisz ponownie hasło"
                />
              </FormGroup>

              <Button onClick={this.handleSubmit}>Zarejestruj się</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
