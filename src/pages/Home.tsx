import { useContext, useEffect, useState } from "react";
import { Typography, Button, Grid } from "@mui/material";
import { BASE_URL, getToken, removeToken } from "../utils/auth";
import { PostCards } from "../components/PostCards";
import { CreateEditPostModal } from "./CreateEditPostModal";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { SkeletonCard } from "../components/Skeleton";
import { AuthContext } from "../context/AuthContext";
import { redirect } from "react-router-dom";

export const Home = () => {
  const { setErrorToast } = useContext(AuthContext);
  const [posts, setPosts] = useState<any[]>([]);
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [reloadPosts, setReloadPosts] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (reloadPosts) {
          setLoading(true);
          const response = await fetch(`${BASE_URL}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${getToken()}` },
          });
          const posts = await response.json();
          if (!response.ok && response.status === 401) {
            removeToken();
            setErrorToast("Session expired");
            setTimeout(() => {
              redirect("/sign-in");
            }, 2000);
          }
          setTimeout(() => {
            setPosts(posts);
            setReloadPosts(false);
            setLoading(false);
          }, 1000);
        }
      } catch (error) {
        console.error("error", error);
        setErrorToast("Something went wrong. Please try again.");
      }
    };
    fetchPosts();
  }, [reloadPosts, setErrorToast]);

  return (
    <>
      <CreateEditPostModal
        show={showPostDialog}
        setShowPostDialog={setShowPostDialog}
        setReloadPosts={setReloadPosts}
      />
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 8 }}>
          <Typography variant="h4" gutterBottom>
            Latest Posts
          </Typography>
        </Grid>
        <Grid size={{ xs: 6, md: 4 }} textAlign={"end"}>
          <Button
            sx={{
              justifyContent: "flex-end",
              color: "#ffffff",
              background: "linear-gradient(-45deg, #36096D 0%, #37D5D6 100% )",
            }}
            variant="contained"
            onClick={() => setShowPostDialog(!showPostDialog)}
            startIcon={<AddRoundedIcon />}
          >
            Create Post
          </Button>
        </Grid>
      </Grid>
      {loading &&
        Array.from({ length: 3 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      {!loading && <PostCards posts={posts} setReloadPosts={setReloadPosts} />}
    </>
  );
};
