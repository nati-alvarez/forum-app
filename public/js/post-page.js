const commentBox = document.querySelector("textarea");
const commentsContainer = document.querySelector(".comments");
const commentCounter = document.querySelector(".comments h3 span");
commentFormBtn = document.querySelector(".comment-form form button");

let comment;
commentBox.addEventListener("keyup", e=>{
    comment = e.target.value.trim();
});

const commentForm = document.querySelector(".comment-form form");
const statusContainer = document.querySelector(".comment-form .status");

commentForm.addEventListener("submit", e=>{
    statusContainer.innerHTML = "";
    e.preventDefault();
    if(!comment){
        statusContainer.innerHTML = `
            <p class="error">Comment can't be empty</p>
        `
    }else {
        let postId = commentForm.dataset.postId;
        submitComment(comment, postId)
    }   
});

async function submitComment(comment, post_id){
    commentFormBtn.disabled = true;
    const res = await fetch("/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({post_id, body: comment})
    });
    const data = await res.json();
    renderNewComment(data);   
}

function renderNewComment(newComment){
    newComment = createCommentComponent(newComment);
    //if the user is posting the first comment, clear the placeholder message
    const commentPlaceholder = document.querySelector(".comments .no-comments");
    if(commentPlaceholder) commentsContainer.removeChild(commentPlaceholder);
    commentsContainer.appendChild(newComment);
    commentBox.value = "";
    comment = "";
    commentCounter.textContent = Number(commentCounter.textContent) + 1;
    newComment.scrollIntoView({behavior: 'smooth'});
    commentFormBtn.disabled = false;
}

function createCommentComponent(comment){
    const newComment = document.createElement("div");
    newComment.classList.add("comment");

    const author = document.createElement("div");
    author.classList.add("author");
    const box = document.createElement("div");
    box.classList.add("box");
    const pfp = document.createElement("img");
    pfp.width = "25";
    pfp.src = comment.author_pfp;
    const username = document.createElement("p");
    username.textContent = comment.author_username;
    box.append(pfp, username);
    author.appendChild(box);

    const body = document.createElement("div");
    body.classList.add("body");
    const text = document.createElement("p");
    text.textContent = comment.comment_body;
    body.appendChild(text);

    const stats = document.createElement("div");
    stats.classList.add("stats");
    const likes = document.createElement("div");
    likes.classList.add("likes");
    likes.innerHTML = `${comment.likes} <i class="typcn typcn-thumbs-up"></i>`;
    const dislikes = document.createElement("div");
    dislikes.classList.add("dislikes");
    dislikes.innerHTML = `${comment.dislikes} <i class="typcn typcn-thumbs-down"></i>`;
    const replies = document.createElement("div");
    replies.classList.add("reply-count");
    replies.innerHTML = `0 <i class="typcn typcn-message"></i>`;
    const addReply = document.createElement("div");
    addReply.classList.add("add-reply");
    addReply.innerHTML = 'Reply <i class="typcn typcn-arrow-back"></i>';
    stats.append(likes, dislikes, replies, addReply);

    newComment.append(author, body, stats);
    return newComment;

}

//creates view entry in db if user has not viewed this post before
async function sendView(post_id){
    const res = await fetch("/post-views", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({post_id})
    });
    data = await res.json();
    
    if(res.status === 201){
        console.log("view added");
        const viewCount = document.querySelector(".views");
        viewCount.innerHTML = (Number(viewCount.textContent) + 1) + " <i class='typcn typcn-eye'></i>";
    }else {
        console.log(data);
    }
}