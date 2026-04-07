import { useState, useEffect, useRef, SetStateAction } from "react";
import { convertMessagesTimeFormat, isContentJson } from "../utils";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import { Link, useParams, useOutletContext, useLocation } from "react-router";
import { Editor } from "@tinymce/tinymce-react";
import DOMPurify from "dompurify";
import { User } from "../utils";

interface PostComment {
    id: number;
    commentContent: string;
    createdAt: string;
};

interface Post {
    id: number;
    postTitle: string;
    postContent: string;
    createdAt: string;
    isPublished: boolean;
    comments: PostComment[];
}

function Posts(){
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [commentEditorPostId, setCommentEditorPostId] = useState<number | null>(null);
    const [showCommentsPostId, setShowCommentsPostId] = useState<number | null>(null);
    const { id } = useParams();
    const { user, isAuth } = useOutletContext<{user: User | null, isAuth: boolean}>(); 
    const location = useLocation();

    useEffect(() => {
        async function fetchData() {
            const response = id ? 
                await fetch(`http://localhost:3000/posts/${id}`, {credentials: 'include'}) :
                await fetch("http://localhost:3000/posts", { credentials: 'include'});
            const result = await response.json();

            if ( result.posts ) { setPosts(result.posts) };
        };

        fetchData();
    },[commentEditorPostId, location.pathname]);

    return (
        <div className="flex flex-col items-center gap-6 mt-8">
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
                            isFull={!!id}
                            isAuth={isAuth}
                            userId={user?.id ?? null}
                            commentEditorPostId={commentEditorPostId}
                            setCommentEditorPostId={setCommentEditorPostId}
                            showCommentsPostId={showCommentsPostId}
                            setShowCommentsPostId={setShowCommentsPostId}
                        />):                    
                        <div>No posts to display</div>
                ):
                <div className="flex flex-col items-center gap-3">Loading Posts</div>

            }
        </div>
    )
};

interface PostCard {
    id: number;
    postTitle: string; 
    showCommentsPostId: number | null;
    setShowCommentsPostId: React.Dispatch<React.SetStateAction<number | null>>;
    postContent: string;
    createdAt: string;
    isPublished: boolean,
    setCommentEditorPostId: React.Dispatch<React.SetStateAction<number | null>>;
    comments: PostComment[],
    userId: number | null,
    isAuth : boolean;
    isFull : boolean;
    commentEditorPostId: number | null;
}

function Card({
    id, 
    postTitle, 
    showCommentsPostId,
    setShowCommentsPostId,
    postContent, 
    createdAt, 
    isPublished,
    setCommentEditorPostId,
    comments,
    userId=null,
    isAuth = false,
    isFull = false,
    commentEditorPostId,
}: PostCard) {
    const showCommentEditor = commentEditorPostId === id;
    const showComments = showCommentsPostId === id;

    const toggleCommentEditor = () => {
        setCommentEditorPostId(showCommentEditor ? null : id);
    };

    return (
        <div className={`flex flex-col items-left gap-3 border-1 border-slate-400 bg-slate-100 rounded-lg p-4 w-[90%] md:w-[60%] ${isFull ? 'mb-3': ''}`}>
            <div className="font-bold text-xl hover:underline"><Link to={`/post/${id}`}>{postTitle}</Link></div>
            <div className={`mt-3 relative ${!isFull ? 'max-h-[14rem] overflow-hidden' : ''}`}>
                {(() => {
                    const parsed = isContentJson(postContent);
                    if (parsed) {
                        const html = DOMPurify.sanitize(generateHTML(parsed, [StarterKit]));
                        return <div dangerouslySetInnerHTML={{ __html: html }} />;
                    }
                    return <div className="whitespace-pre-wrap">{postContent}</div>;
                })()}
                {!isFull && (
                <div 
                    className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none bg-gradient-to-t from-slate-100 to-transparent" 
                    aria-hidden="true"
                />
                )}
            </div>
            <div className="flex justify-end gap-4 text-sm mt-6" >
                <div><span className="font-bold">Posted on:</span> {createdAt}</div>
                <div><span className={`font-bold ${comments.length > 0 ? 'hover:cursor-pointer hover:underline' : ''}`} onClick={() => setShowCommentsPostId(showComments ? null : id)}>Post Comments:</span> {comments.length}</div>
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
                setShowCommentEditor={() => setCommentEditorPostId(null)}/>
            )}
        </div>
    )
}

interface CommentProps {
    key?: number;
    commentContent: string;
    createdAt: string;
}

function Comment({ commentContent, createdAt }: CommentProps) {
    return (
        <div>
            <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: commentContent }}></div>
            <div className="text-sm text-slate-500"><span className="font-bold">Posted on:</span> {createdAt}</div>
        </div>        
    )
};

interface CommentEditorProps {
    postId: number; 
    userId: number | null; 
    setShowCommentEditor: React.Dispatch<SetStateAction<boolean | null>>
}

function CommentEditor({ postId, userId, setShowCommentEditor }: CommentEditorProps ) {
    const editorRef = useRef<{getContent: () => string}>(null);

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
                credentials: 'include',
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