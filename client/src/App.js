import React, { useEffect } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PetList from './components/PetList';
import Loader from './components/Loader';
import { initWeb3 } from './store/reducers/initWeb3Slice';
import { loadAdopters } from './store/reducers/adoptSlice';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const web3State = useSelector((state) => state.initWeb3Reducer);
  // console.log('web3State >>> ', web3State);
  const adoptState = useSelector((state) => state.adoptReducer);
  // console.log('adoptState >>> ', adoptState);

  const handleNetwork = (networkId) => {
    if (networkId === 3) {
      return 'ropsten testnet';
    } else if (networkId === 4) {
      return 'rinkeby testnet';
    } else {
      return 'please connect to rinkeby or ropsten testnet';
    }
  };

  useEffect(() => {
    dispatch(initWeb3());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log('interval');
      dispatch(loadAdopters());
    }, 2000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  return (
    <Container className="my-3">
      <h1 className="text-center my-4">PETSHOP DAPP</h1>
      <p className="text-center">
        Network Connected: <strong>{handleNetwork(web3State.networkId)}</strong>
      </p>
      {adoptState.error ? (
        <Alert variant="danger">{adoptState.errorMessage}</Alert>
      ) : null}
      {web3State.loading || adoptState.loading ? <Loader /> : <PetList />}
    </Container>
  );
};

export default App;
