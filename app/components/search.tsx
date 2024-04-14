'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function Search() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = async function() {
    router.push(`/search/${encodeURIComponent(query)}`);
  }

  return (
    <div className='flex items-center gap-x-2 mt-8'>
        <input 
            type="text" 
            placeholder="搜些什么吧"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input input-bordered w-full w-3xl mx-auto" 
        />
        <button className='btn' onClick={handleSubmit}>搜索</button>
    </div>
  )
}

export default Search