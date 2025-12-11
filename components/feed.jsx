'use client'

import { useState, useEffect } from 'react'

import PromptCard from './promptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const fakePosts = [
  {
    _id: "fake1",
    creator: {
      username: "John Doe",
      email: "johndoe@example.com",
      image: "https://i.pravatar.cc/150?img=1"
    },
    prompt: "Gere exemplos de textos motivacionais sobre produtividade utilizando metáforas.",
    tag: ["motivação", "produtividade", "discurso"]
  },
  {
    _id: "fake2",
    creator: {
      username: "Anna Writer",
      email: "annawriter@example.com",
      image: "https://i.pravatar.cc/150?img=5"
    },
    prompt: "Crie uma descrição poética sobre o universo utilizando linguagem simples.",
    tag: ["poesia"]
  }
];

const Feed = () => {
  const [allPosts, setAllPosts] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState([])

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt')
    const data = await response.json()
    
    setAllPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value)
        setSearchedResults(searchResult)
      }, 500)
    )
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName)

    const searchResult = filterPrompts(tagName)
    setSearchedResults(searchResult)
  }

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, 'i') // 'i' para ignorar caixa alta

    return allPosts.filter(
      (item) => 
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    )
  }
  
  const extendedPosts = [...fakePosts, ...allPosts];
  const extendedSearchResults = [...fakePosts, ...searchedResults];

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='Pesquisar por tag ou usuário'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={extendedSearchResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList
          data={extendedPosts}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  )
}

export default Feed