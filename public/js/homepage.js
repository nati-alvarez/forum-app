let category = "Popular";
let keyword = "";
const requestStatus = new RequestStatus(".posts");

/**
 * Sets category of posts to render, and queries db with category filter
 * @param {Event}  e the event object
 * @param {String} value the post category
 */
async function setCategory(e, value){
    // prevents uncessary backend call
    //if tab is already active, there is no need to filter by category the
    //user is already in
    if(e.target.className === "active") return;

    //clears input when switching categories
    keyword = ""
    document.querySelector(".filter-posts .search input").value = "";

    setActiveTab(e)
    category = value;

    try{
        requestStatus.renderLoading();
        const res =  await getPosts(category, keyword);
        requestStatus.success();
        renderPosts(res.posts);
    }catch(err){
        console.log(typeof err);
        requestStatus.renderError(err.message);
    }
}

/**
 * Queries db for posts that match  the .filter-posts input's keyword
 * @param {Event} e the event object 
 */
async function searchPosts(e){
    //triggers on enter key press in input or if search button is clicked
    if(e.keyCode === 13 || e.currentTarget.nodeName === "BUTTON"){
        const keywordInput = document.querySelector(".filter-posts .search input");
        keyword = keywordInput.value;
        try {
            requestStatus.renderLoading();
            const res = await getPosts(category, keyword);
            requestStatus.success();
            renderPosts(res.posts);
        }catch(err){
            requestStatus.renderError(err.message)
        }
    }
}

/**
 * Renders .post-preview elements to .posts container on homepage
 * @param {Array} posts - array of posts from db
 */
function renderPosts(posts){
    const postsContainer = document.querySelector(".posts");
    postsContainer.innerHTML = "";
    posts.forEach(post => {
        const postPreview = createPostPreview(post);
        postsContainer.appendChild(postPreview);
    });
    postPreviewAnimations();
}

/**
 * Creates .post-preview html element from post db entry
 * @param {Object} post A post object
 */
function createPostPreview (post){
    const postPreview = document.createElement("div");
    postPreview.classList.add(["post-preview"]);
    postPreview.dataset.post_id = post.post_id;

    const community = document.createElement("div");
    community.classList.add("community");
    community.textContent = post.community_name;

    const content = document.createElement("div");
    content.classList.add("content");
    
    const author = document.createElement("div")
    author.classList.add("author");
    const authorPfp = document.createElement("img");
    
    authorPfp.src = post.author_pfp;
    authorPfp.width = "35";
    authorPfp.height = "35";
    const authorUsername = document.createTextNode(` ${post.author_username}`);
    author.append(authorPfp, authorUsername);

    const postTitle = document.createElement("h3");
    postTitle.textContent = post.post_title;

    content.append(author, postTitle);

    const stats = document.createElement("div")
    stats.classList.add("stats");

    const comments = document.createElement("div");
    comments.classList.add("comments")
    const commentCount = document.createTextNode(`${post.comments} `);
    const commentsIcon = document.createElement("i");
    commentsIcon.classList.add("typcn", "typcn-messages");
    comments.append(commentCount, commentsIcon);

    const views = document.createElement("div");
    views.classList.add("views");
    const viewCount = document.createTextNode(`${post.views} `);
    const viewsIcon = document.createElement("i");
    viewsIcon.classList.add("typcn", "typcn-eye");
    views.append(viewCount, viewsIcon);

    const likes = document.createElement("div");
    likes.classList.add("likes");
    const likeCount = document.createTextNode(`${post.likes} `);
    const likesIcon = document.createElement("i");
    likesIcon.classList.add("typcn", "typcn-thumbs-up");
    likes.append(likeCount, likesIcon);

    stats.append(comments, views, likes);

    postPreview.append(community, content, stats);
    return postPreview;
}