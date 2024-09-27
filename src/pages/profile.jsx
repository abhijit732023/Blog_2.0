import React, { useState, useEffect } from 'react';
import authService from '../appwrite/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Container, PostCard } from '../components';
import { set, useForm } from 'react-hook-form';
import service from '../appwrite/config';


function Profile() {
  const [user, setuser] = useState({})
  const [post, setpost] = useState({})
  const [update, setupdate] = useState(true)
  const [username, setusername] = useState(user.name)
  const [profiledata, setprofiledata] = useState(true)
  /////
  useEffect(() => {
    authService.getCurrentUser().then(user => {
      if (user) {
        setuser(user)
       
        


      }

    })
    service.getprofilepicture().then(data => {
      setpost(data.documents[0]);

    }

    )

  }
    , [setuser, setpost, setupdate, setprofiledata, setusername])

  const name = (name) => {
    authService.updatename(name);
    setuser({ ...user, name });
  }
  return update ?
    <Container>
      <div className="relative min-h-full h-4/5 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md flex justify-between p-6 h-4/5" style={{ width: '65%', }}>
          <div className='min-h-full bg-gray-100 drop-shadow-md  ' style={{ width: '38%', display: 'flex', flexDirection: "column", justifyContent: 'space-around', alignItems: 'center' }}>
            <div className='bg-white    object-contain' style={{ height: "56%", width: "92%" }}>
              {post.profileid ? <img className='relative object-cover h-full w-full ' src={service.getProfileFilePreview(post.profileid)} /> : null}
            </div>
            <div className='bg-yellow-800 p-6 ' style={{ height: '40%', width: "92%", }}>
              My profile
              <div className='flex justify-between'>{profiledata ? <input className='bg-yellow-700 underline text-left pl-2' type="text" defaultValue={username} placeholder='Full Name' onChange={e => setusername(e.target.value)} /> : <div><h1>{user.name}</h1></div>}
                <button onClick={() => { name(username); setprofiledata(!profiledata) }}>update</button>
              </div>
              <div>Email:{user.email}</div>
              <div>Last online:{new Date(user.accessedAt).toDateString()}</div>
              <button onClick={() => { setupdate(!update) }}>update</button>
              <div></div>
            </div>

          </div>



          <div className='min-h-full  bg-gray-100 drop-shadow-md w-1/2 flex  ' style={{ height: '90%', width: '60%', flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
            <div className='  p-2 bg-white rounded-lg' style={{ height: '47%', width: "95%" }}>hello</div>
            <div className='  p-2 bg-white rounded-lg' style={{ height: "47%", width: "95%" }}>hello</div>
          </div>

        </div>
      </div>
    </Container>


    :
    <Container className='flex justify-center items-center'>
      <div className='backdrop-blur-3xl rounded-3xl' style={{ height: "70%", width: "60%" }}>

        <button onClick={() => setupdate(!update)}>save</button>

      </div>
    </Container>
}

export default Profile;
