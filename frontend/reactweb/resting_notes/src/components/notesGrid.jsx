import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { NotesCard } from "./NotesCard";
import { rawData } from "./rawData";
import { Context as NotesContext } from "../contexts/NotesContext";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}));

export function NotesGrid() {
	const { state } = useContext(NotesContext);
	const [local_state, setState] = useState(state);

	const classes = useStyles();
	return (
		<Grid container spacing={2}>
			{local_state.map((data) => {
				return (
					<Grid item xs={3}>
						<Paper className={classes.paper}>
							<NotesCard data={data} />
						</Paper>
					</Grid>
				);
			})}
		</Grid>
	);
}
