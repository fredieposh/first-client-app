import { useState, useEffect } from "react";
import { convertMessagesTimeFormat } from "../utils";
import { Link, useParams } from "react-router";

function Posts(){
    const [posts, setPosts] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            const response = id ? await fetch(`http://localhost:3000/posts/${id}`) : await fetch("http://localhost:3000/posts");
            const result = await response.json();

            if ( result.isAuth ) { setIsAuth(true) };
            if ( result.posts ) { setPosts(result.posts) };
            
            // console.log(`posts: ${JSON.stringify(result.posts)}`);
        };

        fetchData();
    },[]);

    return (
        <div className="flex justify-center mt-8 ">
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
                            isFull={id ? true : false}
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
    comments,
    isFull = false
}) {
    const [showComments, setShowComments] = useState(false);
    console.log(comments);
    return (
        <div className={`flex flex-col items-left gap-3 border-1 border-slate-400 bg-slate-100 rounded-lg p-4 w-[90%] md:w-[60%] ${isFull ? 'mb-3': ''}`}>
            <div className="font-bold text-xl hover:underline"><Link to={`/post/${id}`}>{postTitle}</Link></div>
            <div className={`mt-3 relative ${!isFull ? 'max-h-[14rem] overflow-hidden' : ''}`}>
                <div className="whitespace-pre-wrap">{postContent}</div>
                {!isFull && (
                <div 
                    className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none bg-gradient-to-t from-slate-100 to-transparent" 
                    aria-hidden="true"
                />
                )}
            </div>
            <div className="flex justify-end gap-4 text-sm mt-6" >
                <div><span className="font-bold">Posted on:</span> {createdAt}</div>
                <div><span className={`font-bold ${comments.length > 0 ? 'hover:cursor-pointer hover:underline' : ''}`} onClick={() => setShowComments(!showComments)}>Post Comments:</span> {comments.length}</div>
            </div>
            {showComments && (
                <>
                <div className="text-lg font-bold">Post Comments:</div>
                <div className="flex flex-col items-left gap-3 border-1 border-slate-400 bg-slate-100 rounded-lg p-4 w-[90%] md:w-[60%]">
                    {comments.map(comment => (
                        <Comment 
                        key={comment.id} 
                        commentContent={comment.commentContent} 
                        createdAt={convertMessagesTimeFormat(comment)} />
                    ))}
                </div>
                </>
            )}
        </div>
    )
}

function Comment({ commentContent, createdAt }) {
    return (
        <div>
            <div className="whitespace-pre-wrap">{commentContent}</div>
            <div className="text-sm text-slate-500"><span className="font-bold">Posted on:</span> {createdAt}</div>
        </div>        
    )
};

export default Posts;