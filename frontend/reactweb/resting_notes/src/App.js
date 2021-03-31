import React from "react";
import ReactDOM from "react-dom";
import NotesView from "./components/NotesView";
import { Provider as NotesContextProvider } from "./contexts/NotesContext";

function App() {
	console.log("consoling......");
	return (
		<NotesContextProvider>
			<NotesView />;
		</NotesContextProvider>
	);
}

export default App;
