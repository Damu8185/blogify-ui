import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
  Grid,
} from "@mui/material";
import { PostsMenu } from "./PostActions";
import { useContext, useState } from "react";
import { CreateEditPostModal } from "../pages/CreateEditPostModal";
import { AuthContext } from "../context/AuthContext";
import { profileName } from "../utils/helper";
import { redirect, Link as RouterLink, useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth";

export interface PostData {
  _id: string;
  post_title: string;
  user_info: {
    first_name: string;
    last_name: string;
    _id: string;
  };
  created_at: string;
  description: string;
}

type postMenuProps = {
  posts: PostData[];
  setReloadPosts: React.Dispatch<React.SetStateAction<boolean>>;
};

export const initialStatePost = {
  _id: "",
  post_id: "",
  post_title: "",
  user_info: {
    first_name: "",
    last_name: "",
    _id: "",
  },
  created_at: "",
  description: "",
};

export const PostCards = ({ posts, setReloadPosts }: postMenuProps) => {
  console.log("posts", posts);
  const navigate = useNavigate();
  const [showEditPostDialog, setShowEditPostDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostData>(initialStatePost);
  const userId = getUser();

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
      <div className="row">
        {posts && posts.length > 0 ? (
          posts.map((post: PostData) => (
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Card
                variant="outlined"
                style={{ marginBottom: "1rem" }}
                key={post._id}
                sx={{ borderRadius: 3, boxShadow: 4 }}
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
                        post.user_info.first_name +
                          " " +
                          post.user_info.last_name
                      )}
                    </Avatar>
                  }
                  action={
                    userId === post.user_info._id && (
                      <PostsMenu
                        postData={post}
                        setReloadPosts={setReloadPosts}
                        setShowEditPostDialog={setShowEditPostDialog}
                        setSelectedPost={setSelectedPost}
                      />
                    )
                  }
                  title={
                    <Typography
                      sx={{ cursor: "pointer" }}
                      component={"p"}
                      onClick={() => navigate(`/home/profile/${userId}`)}
                    >
                      {post.user_info.first_name +
                        " " +
                        post.user_info.last_name}
                    </Typography>
                  }
                  subheader={new Date(post.created_at).toDateString()}
                />
                <CardContent sx={{ paddingTop: "0" }}>
                  <Typography
                    component={"p"}
                    variant="h6"
                    onClick={() => navigate(`/home/post/${post._id}`)}
                  >
                    {post.post_title}
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                    {post.description}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))
        ) : (
          <>You haven’t written any posts yet. Start sharing your thoughts!</>
        )}
      </div>
    </>
  );
};
