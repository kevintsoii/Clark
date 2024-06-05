import React, { useEffect, useState } from 'react';

// import Header from '../../Components/Header/Header';
import { getAllDesserts } from '../../APIFunctions/Desserts';
import { Container } from 'reactstrap';

export default function DessertsPage() {
  const [desserts, setDesserts] = useState([]);

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
      <header title="Welcome to the Desserts Page!" />
      <Container style={{ marginTop: '2%' }}>
        {desserts && desserts.length > 0
          ? desserts.map((dessert, index) => (
            <div key={index}>
              <h1>{dessert.title}</h1>
              {dessert.rating && <p>Rating: {dessert.rating}</p>}
              <p>{dessert.description}</p>
            </div>
          ))
          : 'No desserts found :('}
      </Container>
    </div>
  );
}
