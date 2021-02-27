import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserById = createAsyncThunk("users/getUsers", async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const data = await response.json();
  return data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    saveItem: (state, { payload }) => {
      const newArr = state.users.map((user) =>
        user.id === payload.id ? payload : user
      );
      return {
        users: [...newArr],
      };
    },
    removeItem: (state, { payload }) => {
      const newArr = state.users.filter((x) => x.id !== payload);
      return {
        users: [...newArr],
      };
    },
  },
  extraReducers: {
    [fetchUserById.fulfilled]: (state, action) => {
      return {
        ...state,
        users: action.payload,
      };
    },
  },
});

export const { saveItem, removeItem } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;

export const selectUsers = (state) => state.users.users;
