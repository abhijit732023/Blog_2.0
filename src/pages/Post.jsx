import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { ID } from "appwrite";
import { comment } from "postcss";
import { motion } from "framer-motion";
import service from "../appwrite/config";



export default function Post() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [but, setbutt] = useState(false);
const { slug } = useParams();
  const [user, setuser] = useState({})
  const navigate = useNavigate();
  const { register, handleSubmit,setValue } = useForm()
  const[userData,setuserData]=useState("")
  const [comment, setComment] = useState('');
  const[commentsection,setcommentsection]=useState([])
  const [button ,setbutton]=useState()
  const userdata=useSelector(user=>user.auth.userData)

  
  





  useEffect(() => {
     appwriteService .getcomments().then(comment=>{
      
      if (comment) {
        setComment(comment)
        const filtercomment=comment.documents.filter(comment=>comment.postid===slug)
        setcommentsection(filtercomment)
        const deletefiilter=comment.documents.filter(comment=>comment.userid===user.$id)
        if(deletefiilter){
          console.log(filtercomment);
          
          setbutt(true)
        }else{
          setbutt(false)
        }


        
        
      }
      }

   
     
     )

    const fetchPost = async () => {
      if (slug) {      
        try {
          const post = await appwriteService.getPost(slug);
          
          if (post) {
            setPost(post);
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

    authService.getCurrentUser().then(user => {
      
      if (user) {
        console.log(user.$id);
        
        

        setuser(user)
      }


    }

    )
    if (userdata) {
      setuserData(userdata)
      
      
    }
  }, [setComment,setcommentsection,setuserData]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredimage);
        navigate("/");
      }
    });
  };

  const submit = async (data) => {
    if (data) {
      
      if (data.comment) {
        await appwriteService.commentDocument({userid:user?user.$id:'',comment:data.comment?data.comment:'',postid:slug?slug:'',username:user.name?user.name:''})
        setValue("comment",'');
        appwriteService.getcomments().then((comment) => {
          if (comment) {
            const filtercomment=comment.documents.filter(comment=>comment.postid===slug)
            setcommentsection(filtercomment)
          }
       
         });
      }
      
    }

  }
  
  const deletecomment=()=>{
    service.deleteComment(comment.$id).then(user=>user)
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return post ? (
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
       animate={{ opacity: 1, scale: 1 }}
       transition={{
         duration: 0.8,
         delay: 0.5,
         ease: [0, 0.71, 0.2, 1.01]
       }}
    className="relative h-full">
      <Container className=" flex justify-center items-center ">
        <div className=" flex  justify-around items-center px-3 rounded-xl " style={{ height: "95%",width:'70%',backgroundColor:'white' }}>
          {/* //////////////////////////// */}
          <div className="backdrop-blur-3xl bg-gray-100 gap-y-3 border rounded-xl  flex justify-center items-center" style={{ height: "94%", width: "44%", flexDirection: 'column' }}>
            <div className="backdrop-blur-3xl rounded-xl flex justify-around p-1 bg-white shadow-md items-center" style={{ height: '58%', width: '95%', flexDirection: 'column' }}>
              <img
                className=" flex  relative object-cover rounded-xl "
                style={{ height: '84%', width: "98%", borderRadius: '' }}
                src={appwriteService.getFilePreview(post.featuredimage)}
                alt={post.title}


              />

              {post.userId === user.$id && (
                <div className=" text-center w-full">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button bgColor="bg-green-500" className="mr-3" style={{ width: "47%" }}>
                      Edit
                    </Button>
                  </Link>
                  <Button bgColor="bg-red-500" style={{ width: "47%" }} onClick={deletePost}>
                    Delete
                  </Button>
                </div>
              )}</div>
            <div className="bg-white shadow-md rounded-xl p-2" style={{ height: '35%', width: '95%' }}>
              <form className='h-full w-full flex justify-between  bg-white items-center' style={{flexDirection:'column'}} onSubmit={handleSubmit(submit) }>
                <textarea className="rounded-lg p-3 shadow-xl" style={{ height: '80%', width: '100%' }} placeholder="comment limit is 255" {...register('comment')} maxLength={255} ></textarea>
                <div className="" style={{height:'16%',width:'100%'}}>
                <Button type="submit" className=" px-0 py-0 text-center flex justify-center items-center" style={{height:'100%',width:'100%'}}> save</Button>

                </div>

              </form>
            </div>
          </div>
          {/* //////////////////////////////////////////////////////////////////////////      */}

          <div className=" flex  bg-gray-100 rounded-xl justify-center items-center" style={{ width: '52%', height: '94%', flexDirection: 'column' }}>
            <div className="bg-white shadow-md gap-y-1 flex flex-col  rounded-xl p-8" style={{ height: '94%', width: '94%' }}>
              <div className=" mb-6" >
                <h1 className="text-2xl font-bold  text-black  w-full">Title : {post.title}</h1>
              </div>
              <div className="browser-css flex w-full h-10 overflow-y-scroll text-black border-white border-2">
              <h1 className="text-xl   text-black flex w-full">Description : {parse(post.content)}</h1>

              </div>
              <div className="border-2 border-gray-100 p-4 rounded-xl h-full" ><h1 className=" inline-block  " style={{fontSize:'20px'}}>comment section</h1>{commentsection.map((comment)=>(
                <div key={comment.$id} className=" flex justify-between border-b border-gray-100 pt-3 ">
                  <div className="flex gap-x-2" ><h1 className="text-blue-500" >@{comment.username} </h1>: {comment.comment}</div>
                 {comment.userid === user.$id ? <button onClick={deletecomment}  >delete</button>:null}    
                </div>
                ))}
            </div>
            </div>
         
          </div>
        </div>
      </Container>
    </motion.div>
  ) : null;
}