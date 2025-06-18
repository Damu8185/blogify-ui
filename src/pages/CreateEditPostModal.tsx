import { useContext, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { removeToken } from "../utils/helper";
import { initialStatePost, PostData } from "../components/PostCards";
import { AuthContext } from "../context/AuthContext";
import { createPost, updatePost } from "../services/postService";

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
  const [form, setForm] = useState({
    _id: "",
    description: "",
    post_title: "",
  });
  const [errors, setErrors] = useState({ description: "", post_title: "" });
  console.log("postData", postData);

  useEffect(() => {
    if (postData && isEdit) {
      setForm(postData);
    }
  }, [isEdit, postData]);

  const handleClose = () => {
    setForm({ _id: "", description: "", post_title: "" });
    setShowPostDialog(!show);
    setPostData?.(initialStatePost);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let valid = true;
    const newErrors = { description: "", post_title: "" };

    if (!form.description.trim()) {
      newErrors.description = "Description is required";
      valid = false;
    }
    if (!form.post_title.trim()) {
      newErrors.post_title = "Title is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    if (isEdit) {
      try {
        const formData = {
          _id: form._id,
          description: form.description,
          post_title: form.post_title,
        };
        const response = await updatePost(formData);
        if (!response.ok && response.status === 401) {
          removeToken();
          setErrorToast("Session expired");
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
        const formData = {
          post_title: form.post_title,
          description: form.description,
        };
        const response = await createPost(formData);
        console.log("response", response);

        if (!response.ok && response.status === 401) {
          removeToken();
          setErrorToast("Session expired");
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
        <DialogTitle>{isEdit ? "Edit Post" : "Create new post"}</DialogTitle>
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
            label="Title"
            name="post_title"
            value={form.post_title}
            onChange={handleChange}
            error={!!errors.post_title}
            helperText={errors.post_title}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Share your thoughts..."
            name="description"
            value={form.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              justifyContent: "flex-end",
              color: "#ffffff",
              background: "linear-gradient(-45deg, #36096D 0%, #37D5D6 100% )",
            }}
            variant="contained"
            onClick={handleSubmit}
          >
            {isEdit ? "Save Changes" : "Publish Post"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
