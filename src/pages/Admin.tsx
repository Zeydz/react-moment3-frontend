import React, { useEffect } from 'react'
import { useAuth } from '../store/useAuth'

function Admin() {
    const { user, fetchMe} = useAuth();
    useEffect(() => {
        fetchMe();
    }, []);

    console.log(user);
  return (
    <>
        <h1 className="text-2xl font-bold mb-4">Admin sida</h1>
        <p>Inloggad som: {user?.username}</p>
        
    </>
  )
}

export default Admin