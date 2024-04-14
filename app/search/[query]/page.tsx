import Chatbox from '@/app/components/chatbox'
import Header from '@/app/components/header'
import References from '@/app/components/references'
import React from 'react'

function SearchResultsPage() {
  return (
    <div>
      <Header />

      <div className='mt-8 max-w-6xl mx-auto flex flex-row items-start'>
        <Chatbox />

        <References />
      </div>
    </div>
  )
}

export default SearchResultsPage