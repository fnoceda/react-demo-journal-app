import { TurnedInNot } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import { useMemo } from "react";
import { setActiveNote } from "../../store/journal";
import { useDispatch } from "react-redux";

export const SideBarItem = ({ id, title = "", body, date, imageUrls = [] }) => {
  const dispatch = useDispatch();

  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]);

  const onClickActiveNote = () => {
    dispatch(setActiveNote({ id, title, body, date, imageUrls }));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickActiveNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
