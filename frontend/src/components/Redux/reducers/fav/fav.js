import { createSlice } from "@reduxjs/toolkit";
const FavSlice = createSlice({
  name: "fav",
  initialState: {
    fav : []
    
  },
  reducers: {
    setFav: (state, action) => {
      state.fav = action.payload;
    }, 
    addToFav: (state, action) => {
        state.fav.push(action.payload);
      },
      deleteFav: (state, action) => {
     state.fav= state.fav.filter((elem, index) =>{
          return elem.id != action.payload;
        });
      },
   
  },
});

export const { setFav ,addToFav, deleteFav} = FavSlice.actions;
export default FavSlice.reducer;
