import { useState, useEffect } from "react";
import { convertMessagesTimeFormat } from "../utils";

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
        <div className="flex justify-center mt-8">
            {
                posts ?
                (
                    posts.length > 0 ?
                    posts.map(post => 
                        <Card 
                            key={post.id}
                            id={post.id}
                            postTitle={post.postTitle}
                            postContent={post.postContent}
                            createdAt={convertMessagesTimeFormat(post)}
                            isPublished={post.isPublished}
                            comments={post.comments}
                        />):                    
                        <div>No posts to display</div>
                ):
                <div className="flex flex-col items-center gap-3">Loading Posts</div>

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
        <div className="flex flex-col items-left gap-3 border-1 border-slate-400 rounded-lg p-4 md:w-[40%] ">
            <div className="font-bold text-xl">{postTitle}</div>
            <div className="mt-3">{postContent}</div>
            <div className="flex justify-end gap-4 text-sm mt-6" >
                <div>{createdAt}</div>
                <div>Post Comments: {comments.length}</div>
            </div>
        </div>
    )
}

export default Posts;