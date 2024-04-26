import React, {useState, useEffect} from 'react'
import { Container, BlogCard } from '../components'
import dataBaseSerivce from '../appwrite/database';

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])
    dataBaseSerivce.getAllPost([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <BlogCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts