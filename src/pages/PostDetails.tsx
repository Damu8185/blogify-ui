import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Divider, Grid, Typography } from "@mui/material";
import { fetchPostById } from "../services/postService";
import { profileName } from "../utils/helper";

export const PostDetails = () => {
  const [post, setPost] = useState<any>({});

  const { post_id } = useParams();

  useEffect(() => {
    if (post_id) {
      fetchPostById(post_id).then((res) => {
        setPost(res);
      });
    }
  }, []);

  return (
    <Grid>
      <Avatar
        sx={{
          background: "linear-gradient(-45deg, #36096D 0%, #37D5D6 100% )",
        }}
        aria-label="recipe"
      >
        {profileName(
          post?.user_info?.first_name + " " + post?.user_info?.last_name
        )}
      </Avatar>
      <Typography>
        {post?.user_info?.first_name + " " + post?.user_info?.last_name}
      </Typography>
      <Typography>{new Date(post?.created_at).toDateString()}</Typography>
      <Divider />
      <Typography variant="h6">{post?.post_title}</Typography>
      <Typography sx={{ whiteSpace: "pre-wrap" }} variant="body2">
        {post?.description}
      </Typography>
    </Grid>
  );
};
