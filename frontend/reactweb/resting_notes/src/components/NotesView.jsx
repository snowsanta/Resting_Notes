import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { NotesGrid } from "./notesGrid";
import { Delete, Note, Label, LabelImportant } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		display: "flex",
		// paddingTop: theme.spacing(8),
	},
	paper: {
		// padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	appBar: {
		zIndex: "1400 !important",
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: "flex",
		alignItems: "right",
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		paddingTop: theme.spacing(10),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		paddingTop: theme.spacing(10),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}));

const drawerWidth = 240;

export default function NotesView() {
	const theme = useTheme();
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);

	const handleDrawerToggle = () => {
		setOpen(!open);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar className={clsx(classes.appBar)} position="fixed">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerToggle}
						edge="start"
						className={clsx(classes.menuButton)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						NotesApp
					</Typography>
				</Toolbar>
			</AppBar>
			<Toolbar />
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader} color="inherit">
					<Typography variant="h6" noWrap>
						NotesApp
					</Typography>
				</div>
				<Divider />
				<List>
					<ListItem button key="Notes">
						<ListItemIcon>
							<Note />
						</ListItemIcon>
						<ListItemText primary="Notes" />
					</ListItem>
					<ListItem button key="Important">
						<ListItemIcon>
							<LabelImportant />
						</ListItemIcon>
						<ListItemText primary="Important" />
					</ListItem>
					<ListItem button key="Shared">
						<ListItemIcon>
							<Label />
						</ListItemIcon>
						<ListItemText primary="Shared" />
					</ListItem>
					<ListItem button key="Trash">
						<ListItemIcon>
							<Delete />
						</ListItemIcon>
						<ListItemText primary="Trash" />
					</ListItem>
				</List>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
			>
				<NotesGrid />
			</main>
		</div>
	);
}
