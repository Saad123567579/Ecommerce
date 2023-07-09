import React ,{useEffect,useState,useRef}from 'react'
import { useParams } from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux";
import {currentUser} from "./features/auth/authSlice";
import { useForm } from 'react-hook-form';



const Profile = () => {
    var user = useSelector(state=>state.user.currentUser);
    const ref = useRef();

 
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    const { image } = data;
  
  
    const reader = new FileReader();
    reader.onload = async() => {
      ref.current.src = reader.result;
      try {
        const response = await fetch(`http://localhost:8080/users/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...user,'image':reader.result}),
        });
    
        const data = await response.json();
        console.log('Updated user:', data);
        
      } catch (error) {
        console.error('Error updating profile picture:', error);
       
      }
      
    };
    reader.readAsDataURL(image[0]);

        
      

  };


  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={user.image} alt="Profile" id="img" ref={ref} />
          </div>
          <h3 className="ml-2 text-lg font-medium">{user.username}</h3>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Change Profile Picture</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="file"
        {...register('image', { required: true })}
        accept="image/*"
      />
      {errors.image && <p>Please select an image.</p>}

      <button type="submit">Submit</button>
    </form>
    
            
          
        </div>
      </div>
    </div>
  )
}

export default Profile
