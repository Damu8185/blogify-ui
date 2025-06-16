import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
} from "@mui/material";
import { PostsMenu } from "./PostActions";
import { useContext, useState } from "react";
import { CreateEditPostModal } from "../pages/CreateEditPostModal";
import { AuthContext } from "../context/AuthContext";
import { profileName } from "../utils/helper";

export interface PostData {
  post_id: string;
  user_info: {
    first_name: string;
    last_name: string;
    user_id: string;
  };
  created_date: string;
  description: string;
}

type postMenuProps = {
  posts: PostData[];
  setReloadPosts: React.Dispatch<React.SetStateAction<boolean>>;
};

export const initialStatePost = {
  post_id: "",
  user_info: {
    first_name: "",
    last_name: "",
    user_id: "",
  },
  created_date: "",
  description: "",
};

export const PostCards = ({ posts, setReloadPosts }: postMenuProps) => {
  const { userId } = useContext(AuthContext);
  const [showEditPostDialog, setShowEditPostDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostData>(initialStatePost);

  return (
    <>
      <CreateEditPostModal
        show={showEditPostDialog}
        setShowPostDialog={setShowEditPostDialog}
        setReloadPosts={setReloadPosts}
        isEdit={true}
        postData={selectedPost}
        setPostData={setSelectedPost}
      />
      {posts && posts.length > 0 ? (
        posts.map((post: PostData) => (
          <Card
            variant="outlined"
            style={{ marginBottom: "1rem" }}
            key={post.post_id}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    background:
                      "linear-gradient(-45deg, #36096D 0%, #37D5D6 100% )",
                  }}
                  aria-label="recipe"
                >
                  {profileName(
                    post.user_info.first_name + " " + post.user_info.last_name
                  )}
                </Avatar>
              }
              action={
                userId === post.user_info.user_id && (
                  <PostsMenu
                    postData={post}
                    setReloadPosts={setReloadPosts}
                    setShowEditPostDialog={setShowEditPostDialog}
                    setSelectedPost={setSelectedPost}
                  />
                )
              }
              title={post.user_info.first_name + " " + post.user_info.last_name}
              subheader={new Date(post.created_date).toDateString()}
            />
            <CardContent sx={{ paddingTop: "0" }}>
              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                {post.description}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <>You haven’t written any posts yet. Start sharing your thoughts!</>
      )}
    </>
  );
};
