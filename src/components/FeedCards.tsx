import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Container,
} from "@mui/material";
import { redirect, useNavigate } from "react-router-dom";

const blogPosts = [
  {
    title: "5 Tips to Improve Your Writing",
    date: "June 10, 2025",
    description:
      "Enhance your blog writing with these actionable tips for clarity, tone, and engagement.",
  },
  {
    title: "Understanding JavaScript Closures",
    date: "June 12, 2025",
    description:
      "A beginner-friendly explanation of closures and how they work in JavaScript.",
  },
  {
    title: "The Future of Web Development in 2025",
    date: "June 15, 2025",
    description:
      "Explore upcoming trends and technologies shaping the future of web development.",
  },
  {
    title: "Mastering React with Hooks",
    date: "May 30, 2025",
    description:
      "Learn how to build cleaner and more efficient React apps using hooks.",
  },
  {
    title: "Why You Should Start Blogging Today",
    date: "June 1, 2025",
    description:
      "Discover the benefits of blogging, whether for personal growth or professional branding.",
  },
];

const BlogCards = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ pb: 10 }}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" sx={{ my: 4 }}>
          Read our blog
        </Typography>

        <Grid container spacing={3}>
          {blogPosts.map((post, index) => (
            <Grid size={{ xs: 12, sm: 4 }} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Box
                    sx={{
                      width: "100%",
                      mb: 2,
                      borderRadius: 1,
                    }}
                  />
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {post.date}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                    {post.description}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    Want more?{" "}
                    <Typography
                      component="span"
                      color="primary"
                      onClick={() => navigate("/sign-in")}
                      sx={{ cursor: "pointer" }}
                    >
                      Sign in
                    </Typography>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BlogCards;
