import React from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const PetCard = ({ imgSrc, title, breed, age, location, petOwner, btn }) => {
  const zeroAddress = '0x0000000000000000000000000000000000000000';
  const { networkId } = useSelector((state) => state.initWeb3Reducer);

  const petOwnerHandler = (petOwner) => {
    return (
      <OverlayTrigger
        key="top"
        placement="top"
        overlay={<Tooltip>{petOwner}</Tooltip>}
      >
        <Card.Link
          href={`https://${
            networkId === 3 ? 'ropsten' : 'rinkeby'
          }.etherscan.io/address/${petOwner}`}
        >{`${String(petOwner).slice(0, 5)}...${String(petOwner).slice(
          37,
          42
        )}`}</Card.Link>
      </OverlayTrigger>
    );
  };

  return (
    <Card className="mb-3">
      <Card.Img variant="top" src={imgSrc} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <strong>Breed</strong>: <span>{breed}</span>
          <br />
          <strong>Age</strong>: <span>{age}</span>
          <br />
          <strong>Location</strong>: <span>{location}</span>
          <br />
          {petOwner !== zeroAddress ? (
            <>
              <strong>Owner</strong>: <span>{petOwnerHandler(petOwner)}</span>
            </>
          ) : null}
        </Card.Text>
        {btn}
      </Card.Body>
    </Card>
  );
};

export default PetCard;
