import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import petListJson from '../pets.json';
import { adoptPet, removeAdoption } from '../store/reducers/adoptSlice';
import PetCard from './PetCard';

const PetList = () => {
  const zeroAddress = '0x0000000000000000000000000000000000000000';
  const dispatch = useDispatch();

  const { address } = useSelector((state) => state.initWeb3Reducer);
  const { adoptersList } = useSelector((state) => state.adoptReducer);

  const btnHandler = (petId) => {
    if (adoptersList[petId] === zeroAddress) {
      return (
        <Button
          variant="primary"
          onClick={() => {
            dispatch(adoptPet(petId));
          }}
        >
          Adopt
        </Button>
      );
    } else if (adoptersList[petId] === address) {
      return (
        <Button
          variant="primary"
          onClick={() => {
            dispatch(removeAdoption(petId));
          }}
        >
          Remove Adoption
        </Button>
      );
    } else {
      return (
        <Button variant="primary" disabled={true}>
          Already Adopted
        </Button>
      );
    }
  };

  return (
    <Container fluid className="animate-bottom">
      <Row>
        {adoptersList &&
          petListJson.map((pet, index) => (
            <Col xs={12} md={3} key={index}>
              <PetCard
                imgSrc={pet.picture}
                title={pet.name}
                breed={pet.breed}
                age={pet.age}
                location={pet.location}
                petOwner={adoptersList[pet.id]}
                btn={btnHandler(pet.id)}
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default PetList;
