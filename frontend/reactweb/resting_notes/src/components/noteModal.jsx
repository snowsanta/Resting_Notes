import React, { useContext, useEffect, useState } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	makeStyles,
	Button,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";

import { Delete, Note, Label, LabelImportant } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import { flushSync } from "react-dom";

import { Context as NotesContext } from "../contexts/NotesContext";

const useStyles = makeStyles((theme) => ({
	dialogWrapper: {
		padding: theme.spacing(2),
		position: "absolute",
		top: theme.spacing(5),
		minWidth: "xl",
		height: "400px",
	},
	dialogTitle: {
		paddingRight: "0px",
	},
	multilineColor: {
		color: "grey",
		fontSize: "2rem",
		fontStyle: "bold",
		fontFamily: "Montserrat, sans-serif",
	},
}));

const update_note_local = (update_note, note) => {
	console.log("note is getting update local");
	update_note(note, () => {
		console.log("updated the node");
	});
};

export default function Popup(props) {
	const { update_note } = useContext(NotesContext);
	const { title, content, openPopup, setOpenPopup } = props;
	const classes = useStyles();
	const [localState, localSetState] = useState({
		title: title,
		content: content,
	});

	return (
		<Dialog
			open={openPopup}
			onClose={() => {
				console.log("click outside");
				update_note_local(update_note, localState);
				setOpenPopup();
			}}
			maxWidth="xl"
			classes={{ paper: classes.dialogWrapper }}
		>
			<DialogTitle className={classes.dialogTitle}>
				<div style={{ display: "flex" }}>
					<Tooltip title="Title">
						<TextField
							margin="dense"
							id="title"
							label=""
							type="text"
							inputProps={{
								className: classes.multilineColor,
							}}
							value={localState.title}
							variant="outlined"
							size="medium"
							fullWidth
							fontStyke="bold"
							onChange={(event) => {
								localSetState({ ...localState, title: event.target.value });
							}}
						/>
					</Tooltip>
					<Tooltip title="Close">
						<Button
							color="secondary"
							onClick={() => {
								console.log("click button");
								update_note_local(update_note, localState);
								setOpenPopup();
							}}
						>
							<CloseIcon />
						</Button>
					</Tooltip>
				</div>
			</DialogTitle>
			<DialogContent dividers>
				<Tooltip title="Content">
					<TextField
						multiline="true"
						margin="dense"
						id="content"
						label=""
						type="text"
						value={localState.content}
						onChange={(event) => {
							localSetState({ ...localState, content: event.target.value });
						}}
						fullWidth
					/>
				</Tooltip>
			</DialogContent>
			<DialogActions dividers>
				<Tooltip title="Delete">
					<IconButton>
						<Delete />
					</IconButton>
				</Tooltip>
				<Tooltip title="Pin">
					<IconButton>
						<Note />
					</IconButton>
				</Tooltip>
				<Tooltip title="Share">
					<IconButton>
						<Label />
					</IconButton>
				</Tooltip>
			</DialogActions>
		</Dialog>
	);
}
