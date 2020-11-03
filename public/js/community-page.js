/***** TODO *****
 * Much of this code is not very DRY, most of the functions are copies of the functions
 * from homepage.js with minor changes.
 * 
 * I plan to put them into helpers.js and make them work for both
*/

const requestStatus = new RequestStatus(".status");
const filters = {
    category: "Popular",
    keyword: "",
}
let pageCounter = 1;
const communityName = window.location.pathname.slice(window.location.pathname.indexOf("/community/") + 11);

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
    pageCounter = 0;
    
    try{
        requestStatus.renderLoading();
        const res =  await getPosts(filters.category, filters.keyword, pageCounter, communityName);
        pageCounter += 1;
        console.log(res);
        requestStatus.success();
        renderPosts(res.posts);
    }catch(err){
        console.log(err);
        requestStatus.renderError(err.message);
    }
}

function renderPosts(posts){
    const postsContainer = document.querySelector(".posts-container");
    postsContainer.innerHTML = "";
    posts.forEach(post=>{
        const postElement = createPostElement(post);
        postsContainer.append(postElement);
    });
    lastPostInView("article.post", filters);
}

/**
 * Renders additional posts gotten from db when user finishes scrolling to bottom 
 * @param {Array} posts newly loaded posts 
 */
function renderMorePosts(posts){
    const postsContainer = document.querySelector(".posts-container");
    posts.forEach(post=>{
        const postElement = createPostElement(post);
        postsContainer.appendChild(postElement);
    });
    postPreviewAnimations();
    lastPostInView("article.post", filters);
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
        pageCounter = 0;

        try {
            requestStatus.renderLoading();
            const res =  await getPosts(filters.category, filters.keyword, pageCounter, communityName);
            requestStatus.success();
            renderPosts(res.posts);
            pageCounter += 1;
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
        if(window.scrollY >= (postCoords.top - post.clientHeight) - 500){
            window.removeEventListener("scroll", window.inViewEventHandler);
            const res =  await getPosts(filters.category, filters.keyword, pageCounter, communityName);
            if (res.posts.length > 0) renderMorePosts(res.posts);
            pageCounter += 1;
        }
    }

    if(!window.inViewEventHandler)
        window.inViewEventHandler = isInView;
    else {
        window.removeEventListener("scroll", window.inViewEventHandler);   
        window.inViewEventHandler = isInView;
    }
    //don't add event listener if there aren't any posts
    if(post) window.addEventListener("scroll", window.inViewEventHandler);
}

function createPostElement(post){
    const postElement = document.createElement("article");
    postElement.classList.add("post");

    const title = document.createElement("div");
    title.classList.add('title');

    const titleH3 = document.createElement("h3");
    titleH3.textContent = post.post_title;
    const author = document.createElement("div");
    author.classList.add('author');

    const authorPfp = document.createElement("img");
    authorPfp.classList.add("rounded");
    authorPfp.src= post.author_pfp;
    authorPfp.width = 25;
    authorPfp.height = 25;
    authorUsername = document.createElement("p");
    authorUsername.textContent = post.author_username;

    author.append(authorPfp, authorUsername);

    title.append(titleH3, author);

    const postBody = document.createElement("p");
    postBody.classList.add("post-body")
    postBody.textContent = post.post_body;

    const stats = document.createElement("div");
    stats.classList.add("stats");

    const comments = document.createElement("div");
    comments.classList.add("comments");
    comments.innerHTML = `${post.comments} <i class="typcn typcn-messages"></i>`;

    const views = document.createElement("div");
    views.classList.add("views");
    views.innerHTML = `${post.views} <i class="typcn typcn-eye"></i>`;

    const likes = document.createElement("div");
    likes.classList.add("likes");
    likes.innerHTML = `${post.likes} <i class="typcn typcn-thumbs-up"></i>`;

    const dislikes = document.createElement("div");
    dislikes.classList.add("dislikes");
    dislikes.innerHTML = `${post.dislikes} <i class="typcn typcn-thumbs-down"></i>`;

    stats.append(comments, views, likes, dislikes);

    const postLink = document.createElement("a");
    postLink.href = `/posts/${post.post_id}`;

    const readPostBtn = document.createElement("button");
    readPostBtn.classList.add("secondary");
    readPostBtn.textContent = "Read Post";

    postLink.appendChild(readPostBtn);

    postElement.append(title, postBody, stats, postLink);
    return postElement;
}

lastPostInView("article.post", filters);