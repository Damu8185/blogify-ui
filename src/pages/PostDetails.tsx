import { useEffect, useState } from "react";
import { PostCards } from "../components/PostCards";
import { fetchPostById } from "../services/postService";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";

export const PostDetails = () => {
  const [post, setPost] = useState([]);
  // const [] = useState()
  const { post_id } = useParams();
  console.log("post_id", post_id);

  useEffect(() => {
    fetchPostById(post_id).then((res) => {
      setPost([res]);
    });
  }, []);

  return (
    <>
      <Avatar>DE</Avatar>
    </>
  );
};
