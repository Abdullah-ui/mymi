"use client"
import React, { useEffect, useState } from 'react'
import Introduction from './components/Introduction'
import Performance from './components/Performance'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../../../../firebase'

const page = ({ params }) => {
  const [id, setId] = useState(null);
  const [userData, setUserData] = useState(null);

  const getDataFromDatabase = async () => {
    const id = localStorage.getItem("sessionId");

    const docRef = doc(firestore, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setUserData(data)
    }
  }

  useEffect(() => {
    const id = localStorage.getItem("sessionId");
    
    if (!id) {
      redirect("/login");
    }

    getDataFromDatabase();
  }, []);

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    }
    fetchParams();
  }, [params]);

  return (
    <section>
      <Introduction userData={userData}/>
      <Performance userData={userData}/>
    </section>
  )
}

export default page