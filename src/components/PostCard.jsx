import React from 'react'
import appwriteService from "../appwrite/config"
import {Link, useParams} from 'react-router-dom'
import "./postcardstyle.css"

import parse from "html-react-parser";
function PostCard({$id, title, featuredimage,content}) {
  // const {slug}=useParams()
  
  
    
  return (
    <Link to={`/post/${$id}`}>
 
      <div className=' hello overflow-hidden backdrop-blur-3xl backdrop-contrast-100 rounded-xl border ' style={{borderColor:"white",height:'90%',width:'80%'}}>
       
        <div className='imagee justify-center  hover:h-2/3 ' style={{height:'100%'}}>
                <div className='hiiii flex justify-center items-center w-0 left-0 top-0 h-full bottom-0 backdrop-blur-md absolute transition-all'>
                  <div className='text  pl-6 pt-14 text left-0 top-0 opacity-0 h-full w-full '>
                    <h1 className='  head text-2xl text-white  opacity-0 ' style={{ width:"90%", overflowWrap: 'break-word', wordBreak: 'break-all' }}  > <b>Title : </b>{title}</h1>
                    <div className=' para pt-2 relative text-lg  text-white top-0 left-0  opacity-0 overflow-scroll overflow-y-scroll' style={{ width:"90%",height:"100%", overflowWrap: 'break-word', wordBreak: 'break-all' }}  ><b>Content : </b>{parse(content).length<=0?" Content Not Provided":parse(content)}</div>

                  </div>
                   
                </div>
                <img src={appwriteService.getFilePreview(featuredimage)} alt={title}
                className= 'heye rounded-xl h-full w-full object-cover ' />
            </div>
            {/* <div className='imgg h-full relative'>
            <h2
            className='text-2xl font-bold text-white relative' 
            >{title}</h2>
            </div> */}
        </div>
           
  

    
    </Link>
  )
}


export default PostCard