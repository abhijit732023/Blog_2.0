import React,{useEffect,useState}from'react';
import appwriteService from"../appwrite/config";
import{Container,PostCard}from'../components';
import authService from'../appwrite/auth';
import{easeInOut,easeOut,motion}from'framer-motion';
import{Link}from'react-router-dom';

function Home(){
  const[posts,setPosts]=useState([]);
  const[user,setUser]=useState(null);
  useEffect(()=>{
    appwriteService.getPosts().then(post=>post&&setPosts(post.documents));
    authService.getCurrentUser().then(user=>user&&setUser(user));
  },[setPosts,setUser]);
  const variants={hover:{scale:1.1},tap:{scale:0.5},idle:{scale:1}};

  if(posts.length===0&&!user)return(
    <div className="w-full h-full py-8 text-center relative">
      <Container className='h-full'>
        <div className='flex flex-wrap w-full ml-8 h-full'>
          <div className="p-2 w-full h-full flex items-center justify-center overflow-hidden">
            <h1 className="text-7xl h-1/5 font-bold hover:text-gray-500">
              <Link to={'/login'}>Login to read Blog post</Link>
            </h1>
          </div>
        </div>
      </Container>
    </div>
  );
  return(
    <div className='w-full h-full flex items-center bg-yello-500'>
      <Container className='flex justify-center items-center'>
        <motion.div className='flex flex-wrap h-full overflow-y-scroll p-4 ml-10 left-0 right-0' style={{width:'90%'}}
          initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}}
          transition={{duration:2,delay:1,easeInOut}}
        >
          {posts.map(post=>(
            <motion.div key={post.$id} className='object-contain left-0 right-0'
              initial={{scale:1}} transition={{ease:easeInOut,duration:0.3}}
              whileHover={{scale:1.06}} whileTap={{scale:0.96}} layout
              style={{height:'50%',width:'25%'}}
            >
              <PostCard {...post}/>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>
  );
}

export default Home;