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