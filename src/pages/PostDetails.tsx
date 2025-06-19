import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Typography,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import { fetchPostById } from "../services/postService";
import { getUser, profileName } from "../utils/helper";
import { CreateEditPostModal } from "./CreateEditPostModal";
import { EditNote } from "@mui/icons-material";

export const PostDetails = () => {
  const { post_id } = useParams();
  const userId = getUser();
  const [post, setPost] = useState<any>({});
  const [selectedPost, setSelectedPost] = useState<any>({});
  const [showEditPostDialog, setShowEditPostDialog] = useState(false);
  const [reloadPostData, setReloadPostData] = useState(false);

  useEffect(() => {
    if (post_id) {
      fetchPostById(post_id)
        .then((res) => {
          setPost(res);
        })
        .finally(() => setReloadPostData(false));
    }
  }, [post_id, reloadPostData]);

  const fullName = `${post?.user_info?.first_name ?? ""} ${
    post?.user_info?.last_name ?? ""
  }`;
  const createdDate = post?.created_at
    ? new Date(post.created_at).toDateString()
    : "";

  return (
    <>
      <CreateEditPostModal
        show={showEditPostDialog}
        setShowPostDialog={setShowEditPostDialog}
        setReloadPosts={setReloadPostData}
        isEdit={true}
        postData={selectedPost}
        setPostData={setSelectedPost}
      />
      <Container maxWidth="md" sx={{ py: 4, pt: 0 }}>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          {/* Avatar, Name & Date */}
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              sx={{
                background: "linear-gradient(135deg, #36096D 0%, #37D5D6 100%)",
                fontWeight: 600,
              }}
            >
              {profileName(fullName)}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {fullName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {createdDate}
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mt: 3 }}>
          {/* Title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="700"
              gutterBottom
              sx={{ wordBreak: "break-word" }}
            >
              {post?.post_title}
            </Typography>

            {userId === post?.user_info?._id && (
              <Tooltip title="Edit Post">
                <IconButton
                  onClick={() => {
                    setSelectedPost(post);
                    setShowEditPostDialog(true);
                  }}
                  color="inherit"
                  data-testid="add-post-icon"
                  sx={{ p: 0 }}
                >
                  <EditNote />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          {/* Divider */}
          <Divider sx={{ mb: 2 }} />

          {/* Content */}
          <Typography
            variant="body1"
            sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}
          >
            {post?.description}
          </Typography>
        </Paper>
      </Container>
    </>
  );
};
