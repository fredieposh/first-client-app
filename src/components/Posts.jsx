import { useState, useEffect, useRef } from "react";
import { convertMessagesTimeFormat } from "../utils";
import { Link, useParams, useOutletContext } from "react-router";
import { Editor } from "@tinymce/tinymce-react";
import DOMPurify from "dompurify";

function Posts(){
    const [posts, setPosts] = useState(null);
    const [showCommentEditor, setShowCommentEditor] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const { id } = useParams();
    const { user, isAuth } = useOutletContext(); 

    const toggleCommentEditor = () => {
        setShowCommentEditor(!showCommentEditor);
    };

    useEffect(() => {
        async function fetchData() {
            const response = id ? await fetch(`http://localhost:3000/posts/${id}`) : await fetch("http://localhost:3000/posts");
            const result = await response.json();

            if ( result.posts ) { setPosts(result.posts) };
            
            // console.log(`posts: ${JSON.stringify(result.posts)}`);
        };

        fetchData();
    },[showCommentEditor]);

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
                            isAuth={isAuth}
                            userId={user?.id}
                            toggleCommentEditor={toggleCommentEditor}
                            setShowCommentEditor={setShowCommentEditor}
                            showCommentEditor={showCommentEditor}
                            showComments={showComments}
                            setShowComments={setShowComments}
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
    showComments,
    setShowComments,
    postContent, 
    createdAt, 
    isPublished,
    setShowCommentEditor,
    comments,
    userId=null,
    isAuth = false,
    isFull = false,
    toggleCommentEditor,
    showCommentEditor
}) {
    console.log(showCommentEditor);
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
                {isFull && isAuth && <div><span className="font-bold hover:cursor-pointer hover:underline" onClick={toggleCommentEditor}>Add Comment</span></div>}
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
            {isAuth && showCommentEditor && (
                <CommentEditor 
                postId={id}
                userId={userId}
                setShowCommentEditor={setShowCommentEditor}/>
            )}
        </div>
    )
}

function Comment({ commentContent, createdAt, setShowCommentEditor }) {
    return (
        <div>
            <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: commentContent }}></div>
            <div className="text-sm text-slate-500"><span className="font-bold">Posted on:</span> {createdAt}</div>
        </div>        
    )
};

function CommentEditor({ postId, userId, setShowCommentEditor }) {
    const editorRef = useRef(null);

    const postComment = async() => {
        if (editorRef.current) {
            const comment = DOMPurify.sanitize(editorRef.current.getContent());
            if (!comment) {
                return;
            }
            const response = await fetch(`http://localhost:3000/users/${userId}/posts/${postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage?.token}`
                },
                body: JSON.stringify({ comment }),
            });
            const result = await response.json();
            console.log(`comment posted: ${JSON.stringify(result)}`);
            setShowCommentEditor(false);
        }
    };

    return (
        <>
            <Editor
                apiKey={import.meta.env.VITE_TINYMCE_API_URL}
                onInit={ (_evt, editor) => editorRef.current = editor }
                // initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                height: 500,
                menubar: false,
                auto_focus: true,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount',
                ],
                placeholder: 'Add a comment...',
                autofocus: true,
                toolbar: 'undo redo | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <button className="bg-slate-700 hover:cursor-pointer hover:bg-slate-500 transition-all duration-300 text-white px-4 py-2 rounded-md" onClick={postComment}>Add Comment</button>
        </>
    )
}

export default Posts;