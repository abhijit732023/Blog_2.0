import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import authService from "../appwrite/auth";

export default function Post() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const [user,setuser]=useState({})
  const [auther,setauther]=useState(false)
  const navigate = useNavigate();
  
  



  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {   
        console.log(slug);
             
        try {
          const post = await appwriteService.getPost(slug);
          if (post) {
            setPost(post);
            setauther(true)
          } else {
            navigate("/");
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        navigate("/");
      }
    };
    fetchPost();
    
    authService.getCurrentUser().then(user=>{
      if(user) {
        setuser(user.$id)
      }
      
      
    }
      
    )
  }, [setauther]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredimage);
        navigate("/");
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return post ? (
    <div className="py-5 relative h-full">
      <Container className="absolute flex flex-col justify-center items-center">
        <div className="bg-yellow-100 mb-4 border rounded-xl p-2" style={{ height: "40%" }}>
          <img
            src={appwriteService.getFilePreview(post.featuredimage)}
            alt={post.title}
            className="rounded-xl w-30 h-80"
          />

          {post.userId===user&&(
            <div className="relative top-1 text-center">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3" style={{ width: "40%" }}>
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" style={{ width: "40%" }} onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold border-white border-2">{post.title}</h1>
        </div>
        <div className="browser-css h-10 overflow-y-scroll text-white border-white border-2">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}