import { useContext, useEffect, useState } from "react";
import { Avatar, Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { BASE_URL, getToken, removeToken } from "../utils/auth";
import { PostCards } from "../components/PostCards";
import { SkeletonCard } from "../components/Skeleton";
import { AuthContext } from "../context/AuthContext";
import { ProfileSkeleton } from "../components/ProfileSkleton";
import { profileName } from "../utils/helper";

interface Iuser {
  first_name: string;
  last_name: string;
  email_id: string;
  created_date: string;
}

export const Profile = () => {
  const { setErrorToast } = useContext(AuthContext);
  const [tab, setTab] = useState(0);

  const [user, setUser] = useState<Iuser>({
    first_name: "",
    last_name: "",
    email_id: "",
    created_date: "",
  });
  const [posts, setPosts] = useState<any[]>([]);
  const [reloadPosts, setReloadPosts] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [userLoader, setUserLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setUserLoader(true);
      try {
        const headers = {
          Authorization: `Bearer ${getToken()}`,
        };

        const [userRes] = await Promise.all([
          fetch(`${BASE_URL}/user`, { headers }),
        ]);
        const userData = await userRes.json();
        if (!userRes.ok && userRes.status === 401) {
          removeToken();
          setErrorToast("Session expired");
        }
        setTimeout(() => {
          setUserLoader(false);
          setUser(userData);
        }, 1000);
      } catch (error) {
        setUserLoader(false);
        console.error("Error fetching data:", error);
        setErrorToast("Something went wrong. Please try again.");
      }
    };

    fetchData();
  }, [setErrorToast]);

  useEffect(() => {
    const fetchPostData = async () => {
      setLoadingPosts(true);
      try {
        const headers = {
          Authorization: `Bearer ${getToken()}`,
        };

        const [postsRes] = await Promise.all([
          fetch(`${BASE_URL}/user-posts`, { headers }),
        ]);

        const postsData = await postsRes.json();
        if (!postsRes.ok && postsRes.status === 401) {
          removeToken();
          setErrorToast("Session expired");
        }
        setTimeout(() => {
          setPosts(postsData);
          setReloadPosts(false);
          setLoadingPosts(false);
        }, 1000);
      } catch (error) {
        setLoadingPosts(false);
        console.error("Error fetching data:", error);
        setErrorToast("Something went wrong. Please try again.");
      }
    };
    if (reloadPosts) {
      fetchPostData();
    }
  }, [reloadPosts, setErrorToast]);

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
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Joined on {new Date(user?.created_date).toLocaleDateString()}
            </Typography>
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
                value={new Date(user?.created_date).toLocaleDateString()}
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
