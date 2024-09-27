import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';
import authService from '../appwrite/auth';
import { delay, easeIn, motion } from 'framer-motion';
import { easeInOut, easeOut } from 'framer-motion/dom';
function AllPosts() {
  const [posts, setPosts] = useState([]);
  

  useEffect(() => {
    authService.getCurrentUser().then(
      (user) => {
        const userid=user.$id
        if (userid) {
          appwriteService.getPosts().then((posts)=>{
            if (posts) {//filter allow us to create a new array from a given array 
              /*In your code, you're trying to filter the posts.documents array to only include posts that match a certain condition. However, you haven't specified the condition yet. */
              // const filterPosts=posts.documents
              
              const filteredPosts = posts.documents.filter((post) => post.userId === userid);
          setPosts(filteredPosts);
          console.log(filteredPosts);
          

            }
          })
          
        }
      }
    )
    
  }, []);

  return posts? (
    <div className='w-full py-8 relative'>
      <Container>
      <motion.div 
              
              className='flex flex-wrap w-full ml-8 pt-5 '>
                  {posts.map((post) => (
                      <motion.div  key={post.$id} className=' w-1/4'
                      initial={{scale:1}}
                      transition={{ease:easeOut,duration:0.2}}
                      whileHover={{scale:1.05}}
                      whileTap={{scale:0.95}}
                      layout 
                      style={{ height:"400px"}}
                      >
                          <PostCard {...post} />
                      </motion.div>
                  ))}
              </motion.div>
      </Container>
    </div>
  ): <div>create a post</div>
}

export default AllPosts;