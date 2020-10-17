//using and object for filters so I can pass them to the lastPostInView function by reference
//this way, it will always have access to the updated values and the event listener will only 
//need to be set once at the start and for rendering new posts
const filters = {
    category: "Popular",
    keyword: "",
}
let pageCounter = 0;

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
    filters.keyword = "";
    document.querySelector(".filter-posts .search input").value = "";

    setActiveTab(e)
    filters.category = value;

    try{
        requestStatus.renderLoading();
        const res =  await getPosts(filters.category, filters.keyword);
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
        filters.keyword = keywordInput.value;
        try {
            requestStatus.renderLoading();
            const res = await getPosts(filters.category, filters.keyword);
            requestStatus.success();
            renderPosts(res.posts);
        }catch(err){
            requestStatus.renderError(err.message)
        }
    }
}

/**
 * Sets event listener on window scroll to see if posts have been scrolled to the bottom,
 * If posts are scrolled to bottom it gets 20 more posts from db
 * @param {String} className the class name given to post elements
 * @param {Object} filters the filters that the user is browsing
 */
function lastPostInView(className, filters){
    const posts = document.querySelectorAll(className);
    const post = posts[posts.length - 1];
    const postCoords = getElementCoords(post);
    
    async function isInView(){
        if(window.scrollY >= (postCoords.top - post.clientHeight) - 165){
            window.removeEventListener("scroll", window.inViewEventHandler);
            const res = await getPosts(filters.category, filters.keyword, ++pageCounter);
            if (res.posts.length > 0) renderMorePosts(res.posts);
        }
    }

    if(!window.inViewEventHandler)
        window.inViewEventHandler = isInView;
    else {
        window.removeEventListener("scroll", window.inViewEventHandler);   
        window.inViewEventHandler = isInView;
    }

    window.addEventListener("scroll", window.inViewEventHandler);
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
    lastPostInView(".post-preview", filters);
}

/**
 * Renders additional posts gotten from db when user finishes scrolling to bottom 
 * @param {Array} posts newly loaded posts 
 */
function renderMorePosts(posts){
    const postsContainer = document.querySelector(".posts");
    posts.forEach(post=>{
        const postPreview = createPostPreview(post);
        postsContainer.appendChild(postPreview);
    });
    postPreviewAnimations();
    lastPostInView(".post-preview", filters);
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

lastPostInView(".post-preview", filters);