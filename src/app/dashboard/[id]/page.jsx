"use client"
import React, { useEffect, useState } from 'react'
import Introduction from './components/Introduction'
import Performance from './components/Performance'

const page = ({ params }) => {
  const [id, setId] = useState(null);

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    }
    fetchParams();
  }, [params]);

  return (
    <section>
      <Introduction/>
      <Performance/>
    </section>
  )
}

export default page