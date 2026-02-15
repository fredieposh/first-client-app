import { useState, useEffect } from "react";

function Posts(){
    const [posts, setPosts] = useState(null);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:3000/posts");
            const result = await response.json();

            if ( result.isAuth ) { setIsAuth(true) };
            if ( result.posts ) { setPosts(result.posts) };
            
            console.log(`posts: ${JSON.stringify(result.posts)}`);
        };

        fetchData();
    },[]);

    return (
        <div className="mt-8">
            {
                posts ?
                posts.map(post => 
                    <Card 
                        key={post.id}
                        id={post.id}
                        postTitle={post.postTitle}
                        postContent={post.postContent}
                        createdAt={post.createdAt}
                        isPublished={post.isPublished}
                        comments={post.comments}
                    />):
                <div>No posts to display</div>
            }
        </div>
    )
}

function Card({
    id, 
    postTitle, 
    postContent, 
    createdAt, 
    isPublished, 
    comments
}) {

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="font-bold text-xl">{postTitle}</div>
            <div>{postContent}</div>
            <div className="flex">
                <div>{createdAt}</div>
                <div>Post Comments: {comments.length}</div>
            </div>
        </div>
    )
}

export default Posts;