import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadAdopters = createAsyncThunk(
  'LoadAdopters',
  async (_, thunkAPI) => {
    // console.log('loadAdopters');
    const { contract } = thunkAPI.getState().initWeb3Reducer;
    // console.log('contract >>> ', contract);
    try {
      const adoptersList = await contract.methods.getAdopters().call();
      // console.log(`adoptersList`, adoptersList);
      return adoptersList;
    } catch (error) {
      console.log('Error in loadAdopters: ', error);
    }
  }
);

export const adoptPet = createAsyncThunk(
  'AdoptPet',
  async (petIndex, thunkAPI) => {
    // console.log('petIndex >>> ', petIndex);
    const { contract, address } = thunkAPI.getState().initWeb3Reducer;
    const result = await contract.methods
      .adopt(petIndex)
      .send({ from: address });
    // console.log('result >>> ', result);
    return {
      petIndex,
      adopterAddress: result.from,
    };
  }
);

export const removeAdoption = createAsyncThunk(
  'RemoveAdoption',
  async (petIndex, thunkAPI) => {
    const { contract, address } = thunkAPI.getState().initWeb3Reducer;
    await contract.methods.removeAdoption(petIndex).send({ from: address });
    // console.log('result >>> ', result);
    return {
      petIndex,
      zeroAddress: '0x0000000000000000000000000000000000000000',
    };
  }
);

const adoptSlice = createSlice({
  name: 'AdoptSlice',
  initialState: {
    loading: false,
    adoptersList: [],
    error: false,
    errorMessage: '',
  },
  extraReducers: {
    [loadAdopters.fulfilled]: (state, action) => {
      state.loading = false;
      state.adoptersList = action.payload;
    },
    [adoptPet.fulfilled]: (state, action) => {
      // console.log('state in adoptPet fulfilled >>> ', state);
      // console.log('action in adoptPet fulfilled >>> ', action);
      const { petIndex, adopterAddress } = action.payload;
      state.adoptersList[petIndex] = adopterAddress;
      state.loading = false;
      state.error = false;
    },
    [adoptPet.pending]: (state, action) => {
      // console.log('state in adoptPet pending >>> ', state);
      // console.log('action in adoptPet pending >>> ', action);
      state.loading = true;
      state.error = false;
    },
    [adoptPet.rejected]: (state, action) => {
      // console.log('state in adoptPet rejected >>> ', state);
      // console.log('action in adoptPet rejected >>> ', action);
      state.loading = false;
      state.error = true;
      state.errorMessage = action.error.message;
    },
    [removeAdoption.fulfilled]: (state, action) => {
      const { petIndex, zeroAddress } = action.payload;
      state.adoptersList[petIndex] = zeroAddress;
    },
    [removeAdoption.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [removeAdoption.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.error.message;
    },
  },
});

export const adoptReducer = adoptSlice.reducer;
