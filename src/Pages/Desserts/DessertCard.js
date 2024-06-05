import React, { useState } from 'react';
import { Container, Col, Row, Button, Input } from 'reactstrap';

import { editDessert, deleteDessert } from '../../APIFunctions/Desserts';

function DessertCard(props) {
  const { _id, onUpdate } = props;

  const [editMode, setEditMode] = useState(false);
  const [title, setTtitle] = useState(props.title);
  const [rating, setRating] = useState(props.rating);
  const [description, setDescription] = useState(props.description);

  async function handleEdit() {
    const status = await editDessert(
      { _id, title, description, rating },
      props.user.token
    );
    onUpdate();
  }

  async function handleDelete() {
    const status = await deleteDessert({ _id }, props.user.token);
    if (!status.error) {
      onUpdate();
    }
  }

  async function handleMode() {
    if (editMode) {
      await handleEdit();
    }
    setEditMode(!editMode);
  }

  return (
    <Container>
      <Row className="dessert">
        <Col md="6" lg="8">
          {editMode ? (
            <>
              <Input
                value={title}
                onChange={(e) => setTtitle(e.target.value)}
              ></Input>
              <Input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              ></Input>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Input>
            </>
          ) : (
            <>
              <h1>{title}</h1>
              {rating !== undefined && <p>Rating: {rating}</p>}
              <p>{description}</p>
            </>
          )}
        </Col>
        <Col>
          {editMode ? (
            <Button disabled={!title || !description} onClick={handleMode}>
              Save
            </Button>
          ) : (
            <>
              <Button onClick={handleMode}>Edit</Button>
              <Button className="delete" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default DessertCard;
