import React, { useState, useEffect } from 'react';
import authService from '../appwrite/auth';
import service from '../appwrite/config';
import { useForm } from 'react-hook-form';
import { Container, Input, LogoutBtn } from '../components';
import { motion } from 'framer-motion';


function Profile() {
  const [user, setUser] = useState({});
  const [post, setPost] = useState({});
  const [update, setUpdate] = useState(true);
  const [slug, setSlug] = useState(null);
  const [nocomment, setnocomment] = useState(0);
  const [nopost, setnopost] = useState(0);
  const { register, handleSubmit } = useForm();


  useEffect(() => {
    service.getPosts().then(posts => {
      if (posts) {
        const filteredPosts = posts.documents.filter(post => post.userId === user.$id);
        setnopost(filteredPosts.length);
      }
    });




    const fetchUserProfile = async () => {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        console.log(currentUser);

        setUser(currentUser);
        const profile = await service.getprofilepicture();
        if (profile) {
          const userProfile = profile.documents.find(data => data.userid === currentUser.$id);
          if (userProfile) {
            setPost(userProfile);
            setSlug(userProfile.$id);
          } else {
            service.createprofiledocument();
          }
        } else {
          setPost({});
          setSlug('');
        }
      }
    };
    fetchUserProfile();
    service.getcomments().then(com=>{
      console.log(com);
      
      if(com){
        const filteredcom = com.documents.filter(com=>com.userid===user.$id)
        setnocomment(filteredcom.length)
        console.log(filteredcom);
        
  }})
  }, []);

  const updateName = (name) => {
    authService.updateName(name);
    setUser(prev => ({ ...prev, name }));
  };

  const updateEmail = async (email, password) => {
    await authService.updateEmail(email, password);
    setUser(prev => ({ ...prev, email }));
  };

  const handleProfileUpdate = async (data) => {
    if (post) {
      if (data.Name) updateName(data.Name);
      const profilePic = data.profilepicture[0] ? await service.uploadprofile(data.profilepicture[0]) : null;
      if (profilePic) {
        service.deleteprofilepicture(post.profileid);
      }
      await service.updateProfilePicture(slug, { profileid: profilePic ? profilePic.$id : null });
    } else {
      const file = await service.uploadprofile(data.profilepicture[0]);
      if (file) {
        await service.createprofiledocument({ profileid: file.$id, userid: user.$id });
      }
    }
  };

  return update ? (
    <Container>
      <motion.div
        initial={{ scale: 0, rotate: 180 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 2,
          delay: 0.8
        }}
        className="relative min-h-full h-4/5 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md flex justify-between p-6" style={{ width: '59%', height: '74%' }}>
          <div className='min-h-full bg-gray-100 shadow-xl rounded-lg' style={{ width: '44%', display: 'flex', flexDirection: "column", justifyContent: 'space-around', alignItems: 'center' }}>
            <div className='bg-gray-500 rounded-md object-contain' style={{ height: "55%", width: "92%" }}>
              <img className='relative object-cover h-full w-full rounded-md' src={post&&post.profileid ? service.getProfileFilePreview(post.profileid) : ''} alt='profilepicture' />
            </div>
            <div className='bg-white font-mono p-7 rounded-md flex justify-between gap-1' style={{ height: '40%', width: "92%", flexDirection: 'column', }}>
              <h2 className='text-bold'><b>My profile</b></h2>
              <div className='flex  relative'>
                <span>Name: </span>
                <span> {user.name}</span>
              </div>
              <div className='flex '>Email: <span className='text-sm ' >{user.email}</span></div>
              <motion.div
              onClick={() => setUpdate(!update)} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                whileFocus={{ scale: 1.2 }}
                className='bg-green-600 text-sm font-thin h-8 w-full content-center flex justify-center items-center rounded-3xl'>
                <button type="button" className=''>Update Profile</button>
              </motion.div>
            </div>
          </div>
          <div className='min-h-full bg-gray-100 drop-shadow-md w-1/2 flex' style={{ height: '90%', width: '55%', flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
            <div className='p-8 font-mono flex bg-white justify-between rounded-lg' style={{ height: '96%', width: "95%", flexDirection: 'column' }}>
              <div className='grid h-4/6'><div >Last online: <span className='text-sm '><b>{new Date(user.accessedAt).toLocaleString()}</b></span></div>
                <div>Last Updated: <span className='text-sm '><b>{new Date(user.accessedAt).toLocaleString()}</b></span></div>
                <div>Registered: <span className='text-sm '><b>{new Date(user.registration).toLocaleString()}</b></span></div>
                <div>Number of Posts: <span className='text-sm '><b>{nopost}</b></span></div>
                <div>Number of Comments: <span className='text-sm '><b>{nocomment}</b></span></div>
              </div>
              <div className='p-2 flex justify-end bg-white rounded-lg' style={{}}>
                <LogoutBtn className='bg-red-800'>Logout</LogoutBtn>
              </div>

            </div>

          </div>
        </div>
      </motion.div>
    </Container>
  ) : (
    <Container>
      <div className="relative min-h-full h-4/5 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md flex justify-between p-6 h-4/5" style={{ width: '64%' }}>
          <div className='min-h-full bg-gray-100 drop-shadow-md' style={{ width: '54%', display: 'flex', flexDirection: "column", justifyContent: 'space-around', alignItems: 'center' }}>
            <div className='bg-white object-contain' style={{ height: "96%", width: "92%" }}>
              <img className='relative object-cover h-full w-full rounded-md' src={ service.getProfileFilePreview(post&&post.profileid&&post.profileid)} alt="Profile" />
            </div>
          </div>
          <div className='min-h-full bg-gray-100 drop-shadow-md w-1/2 flex' style={{ height: '90%', width: '45%', flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
            <div className='p-2 bg-gray-100 rounded-lg grid ' style={{ height: '97%', width: "95%" }}>
              <form className='flex justify-around p-5   ' style={{flexDirection:'column'}} onSubmit={handleSubmit(handleProfileUpdate)}>
                <div>Change Profile Picture: <Input type="file" {...register("profilepicture")} /></div>
                <div>Change Name: <Input {...register('Name')} /></div>
                <div>Change Email: <Input {...register('Email')} /></div>
                <div>Password required to Change Email: <Input {...register("Password")} /></div>
                <div className='w-full  flex justify-around'>
                <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                whileFocus={{ scale: 1.2 }}
                className='bg-green-400 text-md font-thin h-8  content-center font-mono flex justify-center items-center rounded-3xl' style={{width:'48%'}}>
                <button type="submit" className=''>save</button>
              </motion.div>
              <motion.div
              onClick={() => setUpdate(!update)} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                whileFocus={{ scale: 1.2 }}
                className='bg-blue-500 text-md  h-8  content-center font-mono   flex justify-center items-center rounded-3xl' style={{width:'48%'}}>
                <button type="button" className=''>back</button>
              </motion.div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Profile;
