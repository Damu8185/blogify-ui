import { useContext, useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { removeToken } from "../utils/helper";
import { PostCards } from "../components/PostCards";
import { CreateEditPostModal } from "./CreateEditPostModal";
import { SkeletonCard } from "../components/Skeleton";
import { AuthContext } from "../context/AuthContext";
import { getAllPosts } from "../services/postService";

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
          const response = await getAllPosts();
          if (!response.ok && response.status === 401) {
            removeToken();
            setErrorToast("Session expired");
            setTimeout(() => {
              redirect("/sign-in");
            }, 2000);
          }
          setPosts(response);
          setReloadPosts(false);
          setLoading(false);
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
        <Grid
          size={{ xs: 12, md: 12 }}
          textAlign={"end"}
          sx={{ marginBottom: { xs: "5%", sm: "2%", md: "2%" } }}
        >
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
