import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: {},
        projects: [],
        currentProject: ''
    },
    reducers: {
        setUser: (state, action) =>  {
            state.value = action.payload;
        },
        setUserProjects: (state, action) =>  {
            state.projects = action.payload;
        },
        setCurrentUserProject: (state, action) =>  {
            state.currentProject = action.payload;
        }
    }
});

export const { setUser, setUserProjects, setCurrentUserProject } = userSlice.actions;

export const selectUser = state => state.value;

export default userSlice.reducer;