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

    postElement.append(title);
    return postElement;
}