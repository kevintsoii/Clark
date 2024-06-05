import React, { useEffect, useState } from 'react';

import './dessert-page.css';

// import Header from '../../Components/Header/Header';
import { getAllDesserts, createDessert } from '../../APIFunctions/Desserts';
import DessertCard from './DessertCard';
import { Container, Col, Row, Input, Button } from 'reactstrap';

export default function DessertsAdmin(props) {
  const [desserts, setDesserts] = useState([]);
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const [rating, setRating] = useState();

  async function getDessertsFromDB() {
    const dessertsFromDB = await getAllDesserts();
    if (!dessertsFromDB.error) {
      setDesserts(dessertsFromDB.responseData);
    }
  }

  useEffect(() => {
    getDessertsFromDB();
  }, []);

  return (
    <div>
      <header title="Welcome to the Desserts Admin Page!" />
      <Container>
        <Row className="container" style={{ padding: '2em' }}>
          <Col>
            <Input
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
          <Col>
            <Input
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
          <Col>
            <Input
              placeholder="Rating"
              onChange={(e) => setRating(e.target.value)}
            />
          </Col>
          <Col>
            <Button
              disabled={!title}
              onClick={() =>
                createDessert(
                  {
                    title,
                    description,
                    rating,
                  },
                  props.user.token
                ).then(() => getDessertsFromDB())
              }
              style={{ width: '10rem' }}
            >
              Submit
            </Button>
          </Col>
        </Row>
        {desserts && desserts.length > 0
          ? desserts.map((dessert, index) => (
            <DessertCard
              key={index}
              {...dessert}
              user={props.user}
              onUpdate={getDessertsFromDB}
            />
          ))
          : 'No desserts found :('}
      </Container>
    </div>
  );
}
