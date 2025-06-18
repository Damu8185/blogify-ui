import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { PostData } from "./PostCards";
import { deletePost } from "../utils/auth";
import { AuthContext } from "../context/AuthContext";

type postMenuProps = {
  postData: PostData;
  setReloadPosts: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditPostDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<PostData>>;
};

export const PostsMenu = ({
  postData,
  setReloadPosts,
  setShowEditPostDialog,
  setSelectedPost,
}: postMenuProps) => {
  const { setSucessToast, setErrorToast } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      const response = await deletePost(postData._id);

      if (response.ok) {
        setSucessToast("Post deleted successfully");
        handleClose();
        setReloadPosts(true);
      } else {
        setErrorToast("Post deletion failed");
      }
    } catch (err) {
      console.error(err);
      setErrorToast("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton onClick={handleClick} aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            setSelectedPost(postData);
            setShowEditPostDialog(true);
          }}
        >
          <ListItemIcon>
            <EditNoteIcon fontSize="medium" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};
