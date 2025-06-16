import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { createPost, removeToken, updatePost } from "../utils/auth";
import { initialStatePost, PostData } from "../components/PostCards";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";

type modalTypes = {
  isEdit?: boolean;
  postData?: PostData;
  show: boolean;
  setShowPostDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadPosts: React.Dispatch<React.SetStateAction<boolean>>;
  setPostData?: React.Dispatch<React.SetStateAction<PostData>>;
};

export const CreateEditPostModal = ({
  isEdit = false,
  postData,
  show,
  setShowPostDialog,
  setReloadPosts,
  setPostData,
}: modalTypes) => {
  const { setSucessToast, setErrorToast } = useContext(AuthContext);
  const [form, setForm] = useState({ post_id: "", description: "" });
  const [errors, setErrors] = useState({ description: "" });

  useEffect(() => {
    if (postData && isEdit) {
      setForm(postData);
    }
  }, [isEdit, postData]);

  const handleClose = () => {
    setForm({ post_id: "", description: "" });
    setShowPostDialog(!show);
    setPostData?.(initialStatePost);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let valid = true;
    const newErrors = { description: "" };

    if (!form.description.trim()) {
      newErrors.description = "Description is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    if (isEdit) {
      try {
        const response = await updatePost(form.post_id, form.description);
        const updatedPost = await response.json();
        if (!response.ok && response.status === 401) {
          removeToken();
          setErrorToast("Session expired");
        }
        if (!response.ok) {
          throw new Error(updatedPost.message || "Post updation failed");
        } else {
          handleClose();
          setSucessToast("Post updated successfully");
          setReloadPosts(true);
        }
      } catch (err) {
        console.error(err);
        setErrorToast("Something went wrong. Please try again.");
      }
    } else {
      try {
        const response = await createPost(form.description);
        const createdPost = await response.json();
        if (!response.ok && response.status === 401) {
          removeToken();
          setErrorToast("Session expired");
        }
        if (!response.ok) {
          throw new Error(createdPost.message || "Post publishtion failed");
        } else {
          handleClose();
          setSucessToast("Post published successfully");
          setReloadPosts(true);
        }
      } catch (err) {
        console.error(err);
        setErrorToast("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <Dialog fullWidth maxWidth="lg" onClose={handleClose} open={show}>
        <DialogTitle>{isEdit ? "Edit Post" : "Create a new post"}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit}>
            {isEdit ? "Save Changes" : "Publish Post"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
