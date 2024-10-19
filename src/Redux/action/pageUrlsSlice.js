import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // pageUrls: [],
  instagramUrl: null,
  pageUrls:[],
  telegramProfileUrl:null,
  linkedinprofile:null,
  youtubeProfile:null
};

const pageUrlsSlice = createSlice({
  name: 'imageUrls',
  initialState,
  reducers: {
    setPageUrls: (state, action) => {
      // console.log(action.payload);
      state.pageUrls = action.payload;  
    },
    setInstagramUrl:(state,action)=>{
      // console.log(action.payload);
      state.instagramUrl=action.payload
    },
    setTelegramUrl:(state,action)=>{
      // console.log(action.payload);
      state.telegramProfileUrl=action.payload
    },
    setLinkedInProfile:(state,action)=>{
      // console.log(action.payload);
      state.linkedinprofile=action.payload
    },
    setYoutubeProfile:(state,action)=>{
      // console.log(action.payload);
      state.youtubeProfile=action.payload
    }
  },
});

export const { setPageUrls , setInstagramUrl , setTelegramUrl, setLinkedInProfile, setYoutubeProfile} = pageUrlsSlice.actions;
export default pageUrlsSlice.reducer;
