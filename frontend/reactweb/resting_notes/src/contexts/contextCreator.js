import React, { useReducer } from "react";

const contextCreator = (reducer, actions, initialState) => {
	const Context = React.createContext();
	const Provider = ({ children }) => {
		// useReducer gives us actual state and functions
		// dispatch function actually takes two arguments mainly
		// i.e. dispatch({type:"addDeliveryBoy",payload:DeliveryBoy})...
		const [state, dispatch] = useReducer(reducer, initialState);

		// Here i will be binding the "actions to be performed on a specific state" extracted from useReducer
		// just above.
		// For example :addDeliveryBoy,updateliveryBoy,deleteDeliveryBoy etc
		const boundedActions = {};

		// I am doing so because where the actual 'actions functions' are defined don't have access
		// to the "dispatch function of useReducer()"", so i am passing that "dispatch" from here
		// to the function and that function is returning me a callback function
		// that is able to do the all work for me
		// e.g AddDeliveryBoy,updateDeliveryBoy,deleteDeliveryBoy etc...
		for (let key in actions) {
			boundedActions[key] = actions[key](dispatch);
		}

		return (
			// here below i am utilising the fact of "key:value" pairs to be same of "ES6"
			// i can write this in other way as value={{state:state,boundedActions:boundedActions}}

			// Also remember the "value" prop passed through the <context.provider> part
			// will be extracted from the current context everywhere i need them:

			// so after using useContext(Context), we will access objects like:
			// const {state,addDeliveryBoy}=useContext(Context)
			<Context.Provider value={{ state, ...boundedActions }}>
				{children}
			</Context.Provider>
		);
	};

	return { Context, Provider };
};

export default contextCreator;
