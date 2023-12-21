import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Animal = {
  id: number;
  name: string;
  img: string;
};

type AnimalState = {
  value: Animal[];
};

const initialState: AnimalState = {
  value: JSON.parse(localStorage.getItem("animals")!),
};

export const animalsSlice = createSlice({
  name: "animals",
  // `createSlice` will infer(MAKE IMUTABLE!!!) the state type from the `initialState` argument
  initialState,
  reducers: {
    addAnimal: (state, action: PayloadAction<Animal>) => {
      state.value.push(action.payload);
    },
    removeAnimal: (state, action: PayloadAction<number>) => {
      const index = state.value.findIndex((obj) => obj.id === (action.payload));
      state.value.splice(index, 1);
    },
    sortAnimals: (state, action: PayloadAction<string>) => {
      if (action.payload == "asc") {
        state.value.sort((a,b)=> (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
      } else {
        state.value.sort((a,b)=> (a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1))
      }
    },
    editAnimal: (state, action: PayloadAction<Animal>) => {
      const index = state.value.findIndex((obj) => obj.id === (action.payload.id));
      state.value.splice(index, 1, action.payload);
    }
  },
});

export const { addAnimal, removeAnimal, sortAnimals, editAnimal } = animalsSlice.actions;

export default animalsSlice.reducer;
