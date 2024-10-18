import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";
import authService from '../appwrite/auth';
import { easeInOut, motion } from 'framer-motion';

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    authService.getCurrentUser ().then(user => {
      const userId = user.$id;
      if (userId) {
        appwriteService.getPosts().then(posts => {
          if (posts) {
            const filteredPosts = posts.documents.filter(post => post.userId === userId);
            setPosts(filteredPosts);
          }
        });
      }
    });
  }, []);

  return posts.length > 0 ? (
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
  ) : <div>Create a post</div>;
}

export default AllPosts;