import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  goals: [],
};
const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGoals.fulfilled, (state, action) => {
        state.goals = action.payload;
      })
      .addCase(createGoal.rejected, () => {
        console.log("Goal creation Promise rejected");
      })
      .addCase(deleteGoal.rejected, () => {
        console.log("Goal deletion failed");
      });
  },
});

export const getGoals = createAsyncThunk("goals/getgoals", async () => {
  const token = window.localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await axios.get("http://localhost:4000/goals/", config);
  return response.data;
});
export const createGoal = createAsyncThunk(
  "goals/creategoal",
  async ({ title, definition }, thunkAPI) => {
    const token = window.localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const body = {
      title: title,
      definition: definition,
    };
    const response = await axios.post(
      "http://localhost:4000/goals/",
      body,
      config
    );
    thunkAPI.dispatch(getGoals());
    return response.data;
  }
);
export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async ({ id }, thunkAPI) => {
    const token = window.localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await axios.delete(
      "http://localhost:4000/goals/" + id,
      config
    );
    thunkAPI.dispatch(getGoals());
    return response.data;
  }
);
const {} = goalSlice.actions;

export default goalSlice.reducer;
