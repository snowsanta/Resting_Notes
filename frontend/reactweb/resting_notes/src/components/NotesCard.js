import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import SvgIcon from "@material-ui/core/SvgIcon";
import { Delete, Note, Label, LabelImportant } from "@material-ui/icons";
import Modal from "./noteModal";

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

export function NotesCard({ data }) {
	const classes = useStyles();

	const { title, content } = data;
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<React.Fragment>
			<Card className={classes.root}>
				<CardContent
					onClick={() => {
						setModalOpen(true);
					}}
				>
					<Typography variant="h5" component="h2">
						{title}
					</Typography>
					<Typography className={classes.pos} color="textSecondary">
						{content}
					</Typography>
				</CardContent>
				<CardActions>
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
				</CardActions>
			</Card>
			<Modal
				title={title}
				content={content}
				openPopup={modalOpen}
				setOpenPopup={() => {
					setModalOpen(false);
				}}
			></Modal>
		</React.Fragment>
	);
}
