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

export default class Register extends Component {
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
                  type="username"
                  name="username"
                  id="username"
                  placeholder="with a placeholder"
                />
                        </FormGroup>
                        <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="with a placeholder"
            />
          </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="password placeholder"
                />
              </FormGroup>

              <Button>Zarejestruj się</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
