import React, {useEffect, useState} from 'react'
import {Container, BlogCard} from '../components'
import dataBaseSerivce from '../appwrite/database'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        dataBaseSerivce.getAllPost().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap gap-4 m-6'>
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

export default Home