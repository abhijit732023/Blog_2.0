import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import authService from '../appwrite/auth';
import { easeInOut, easeOut, motion } from 'framer-motion';
import { Link } from 'react-router-dom';


function Home() {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null)
    useEffect(() => {
        appwriteService.getPosts().then((post) => {
            if (post) {
                const filteredpost=post.documents.filter(posts=>posts.title!=="profilepicture")
                setPosts(filteredpost)
               
                
            }
        })
        authService.getCurrentUser().then((user)=>{
            if(user){
                setUser(user)
                
            }
        })
    }, [setPosts,setUser])
    const variants = {
        hover: { scale: 1.1 },
        tap: { scale: 0.5 },
        idle: { scale: 1 },
      };

  
    if (posts.length === 0 && !user) {
        return (
            <div className="w-full h-full py-8 mt-4 text-center relative">
                <Container className='h-full'>
                <div className='flex flex-wrap w-full ml-8 h-full'>
                        <div className="p-2 w-full h-full flex items-center justify-center">
                            <h1 className="text-7xl h-1/5 font-bold hover:text-gray-500">
                               <Link to={'/login'}> Login to read posts</Link>
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div
       
        className='w-full py-8  relative'>
            <Container>
                <motion.div 
              
                className='flex flex-wrap w-full ml-8 pt-5 '
                initial={{ opacity: 0, scale:0}}
                animate={{ opacity: 1, scale: 1 }}
                transition={
                  {
                    duration:2,
                    delay:1.5,
                    easeInOut
                  }
                }>
                    {posts.map((post) => (
                        <motion.div  key={post.$id} className=' w-1/4'
                        initial={{scale:1}}
                        transition={{ease:easeInOut,duration:0.3}}
                        whileHover={{scale:1.08}}
                        whileTap={{scale:0.96}}
                        layout 
                        style={{ height:"400px"}}
                        
                        >
                            <PostCard {...post} />
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </div>
    )
}

export default Home