const commentBox = document.querySelector("textarea");
let comment;
commentBox.addEventListener("keyup", e=>{
    comment = e.target.value.trim();
});

const commentForm = document.querySelector(".comment-form");
const statusContainer = document.querySelector(".comment-form .status");

commentForm.addEventListener("submit", e=>{
    statusContainer.innerHTML = "";
    e.preventDefault();
    if(!comment){
        statusContainer.innerHTML = `
            <p class="error">Comment can't be empty</p>
        `
    }
});

function submitComment(comment){
    return comment;
}

//creates view entry in db if user has not viewed this post before
function sendView(post_id){
    console.log(post_id);
}