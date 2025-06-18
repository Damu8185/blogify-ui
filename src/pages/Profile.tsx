import { useContext, useEffect, useState } from "react";
import { Avatar, Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { removeToken } from "../utils/helper";
import { PostCards } from "../components/PostCards";
import { SkeletonCard } from "../components/Skeleton";
import { AuthContext } from "../context/AuthContext";
import { ProfileSkeleton } from "../components/ProfileSkleton";
import { profileName } from "../utils/helper";
import { profile } from "../services/authService";
import { getUserPosts } from "../services/postService";
import { useParams } from "react-router-dom";

interface Iuser {
  first_name: string;
  last_name: string;
  email_id: string;
  created_at: string;
}

export const Profile = () => {
  const { setErrorToast } = useContext(AuthContext);
  const [tab, setTab] = useState(0);

  const [user, setUser] = useState<Iuser>({
    first_name: "",
    last_name: "",
    email_id: "",
    created_at: "",
  });
  const [posts, setPosts] = useState<any[]>([]);
  const [reloadPosts, setReloadPosts] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [userLoader, setUserLoader] = useState(true);
  const { user_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setUserLoader(true);
      try {
        if (user_id) {
          const response = await profile(user_id);
          if (!response.ok && response.status === 401) {
            removeToken();
            setErrorToast("Session expired");
          }
          setTimeout(() => {
            setUserLoader(false);
            setUser(response);
          }, 1000);
        }
      } catch (error) {
        setUserLoader(false);
        console.error("Error fetching data:", error);
        setErrorToast("Something went wrong. Please try again.");
      }
    };

    fetchData();
  }, [setErrorToast, user_id]);

  useEffect(() => {
    const fetchUserPostData = async () => {
      setLoadingPosts(true);
      try {
        if (user_id) {
          const response = await getUserPosts(user_id);

          if (!response.ok && response.status === 401) {
            removeToken();
            setErrorToast("Session expired");
          }
          setTimeout(() => {
            setPosts(response);
            setReloadPosts(false);
            setLoadingPosts(false);
          }, 1000);
        }
      } catch (error) {
        setLoadingPosts(false);
        console.error("Error fetching data:", error);
        setErrorToast("Something went wrong. Please try again.");
      }
    };
    fetchUserPostData();
  }, [reloadPosts, setErrorToast, user_id]);

  return (
    <Container maxWidth="sm">
      {userLoader && <ProfileSkeleton />}
      {!userLoader && (
        <>
          <Box
            sx={{
              borderRadius: 3,
              textAlign: "center",
            }}
          >
            <Avatar
              sx={{
                background:
                  "linear-gradient(-45deg, #36096D 0%, #37D5D6 100% )",
                color: "#ffffff",
                width: 120,
                height: 120,
                fontSize: 48,
                mx: "auto",
                mb: 2,
              }}
            >
              {profileName(user?.first_name + " " + user.last_name)}
            </Avatar>

            <Typography variant="h4" gutterBottom>
              {user?.first_name + " " + user.last_name}
            </Typography>
            <Typography color="text.secondary">{user?.email_id}</Typography>
          </Box>
        </>
      )}
      {loadingPosts && <SkeletonCard />}
      {!loadingPosts && (
        <>
          <Tabs
            value={tab}
            onChange={(_e, v) => setTab(v)}
            centered
            sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
          >
            <Tab label="Details" />
            <Tab label="Posts" />
          </Tabs>

          {tab === 0 && (
            <Box textAlign="left">
              <InfoRow
                label="Username"
                value={user?.first_name + " " + user.last_name}
              />
              <InfoRow label="Email" value={user?.email_id} />
              <InfoRow
                label="Join Date"
                value={new Date(user?.created_at).toLocaleDateString()}
              />
            </Box>
          )}

          {tab === 1 && (
            <Box>
              {loadingPosts && <SkeletonCard />}
              {!loadingPosts && (
                <PostCards posts={posts} setReloadPosts={setReloadPosts} />
              )}
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      py: 1,
    }}
  >
    <Typography fontWeight={500}>{label}</Typography>
    <Typography>{value}</Typography>
  </Box>
);
