import contextCreator from "./contextCreator";
import { rawData } from "../components/rawData";

// All the operations that should be performed on Notes should be
// defined and described here
const notesReducer = (state, action) => {
	switch (action.type) {
		case "add_new_note":
			//   console.log("adding new note");
			//   console.log(action.payload);
			return [...state, action.payload];
		case "update_note":
			return state.map((note) =>
				note.id === action.payload.id ? action.payload : note
			);
		case "delete_note":
			return state.filter((note) => note.id !== action.payload.id);
	}
};

const add_new_note = (dispatch) => {
	return (note, callback) => {
		dispatch({ type: "add_new_note", payload: note });
		if (callback) {
			callback();
		}
	};
};

const update_note = (dispatch) => {
	return (note, callback) => {
		dispatch({ type: "update_note", payload: note });
		if (callback) {
			callback();
		}
	};
};

const delete_note = (dispatch) => {
	return (note, callback) => {
		dispatch({ type: "delete_note", payload: note });
		if (callback) {
			callback();
		}
	};
};

export const { Context, Provider } = contextCreator(
	notesReducer,
	{ add_new_note, update_note, delete_note },
	rawData
);
