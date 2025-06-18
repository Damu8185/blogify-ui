import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
  Grid,
  Tooltip,
} from "@mui/material";
import { PostsMenu } from "./PostActions";
import { useContext, useState } from "react";
import { CreateEditPostModal } from "../pages/CreateEditPostModal";
import { AuthContext } from "../context/AuthContext";
import { profileName } from "../utils/helper";
import {
  redirect,
  Link as RouterLink,
  useNavigate,
  useParams,
} from "react-router-dom";
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
  const { user_id } = useParams();
  console.log("posts", posts);

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
      <Grid container spacing={2} alignItems="stretch">
        {posts && posts.length > 0 ? (
          posts.map((post: PostData) => (
            <Grid size={user_id ? { xs: 12, md: 12 } : { xs: 12, md: 6 }}>
              <Card
                variant="outlined"
                style={{ marginBottom: "1rem" }}
                key={post._id}
                sx={{ borderRadius: 3, boxShadow: 4, flexGrow: 1 }}
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
                      onClick={() =>
                        navigate(`/home/profile/${post.user_info._id}`)
                      }
                    >
                      {post.user_info.first_name +
                        " " +
                        post.user_info.last_name}
                    </Typography>
                  }
                  subheader={new Date(post.created_at).toDateString()}
                />
                <CardContent sx={{ paddingTop: "0" }}>
                  {/* <Tooltip title={post.post_title}> */}
                  <Typography
                    component={"p"}
                    variant="h6"
                    onClick={() => navigate(`/home/post/${post._id}`)}
                    sx={{
                      cursor: "pointer",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      // textOverflow: "ellipsis",
                    }}
                  >
                    {post.post_title}
                  </Typography>
                  {/* </Tooltip> */}
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: "pre-wrap",
                      overflow: "hidden",
                      display: "-webkit-box",
                      // WebkitLineClamp: 2,
                      // WebkitBoxOrient: "vertical",
                      // textOverflow: "ellipsis",
                    }}
                  >
                    {post.description
                      ? post.description.length > 150
                        ? post.description.slice(0, 150) + "..."
                        : post.description
                      : ""}
                    {post.description.length > 150 && (
                      <Typography
                        component="span"
                        onClick={() => navigate(`/home/post/${post._id}`)}
                        sx={{
                          color: "primary.main",
                          cursor: "pointer",
                          fontWeight: "bold",
                          ml: 1,
                        }}
                      >
                        {post.description.length > 150 && "Show more"}
                      </Typography>
                    )}
                  </Typography>
                </CardContent>
              </Card>
              {/* </div> */}
            </Grid>
          ))
        ) : (
          <>You haven’t written any posts yet. Start sharing your thoughts!</>
        )}
      </Grid>
      {/* </div> */}
    </>
  );
};
