/**
 * Gets posts from backend with addition optional filters
 * @param {String} category the category of posts
 * @param {String} keyword  search query to filter posts by
 * @returns {Promise} promise of filtered posts
 * @returns {Error} error object
 */
async function getPosts(category, keyword){
    try{
        const res = await fetch(`/posts?category=${category}&keyword=${keyword}`)
        return res.json();
    }catch(err){
        console.log(err);
    }
}

/**
 * Clears active class on .filter-posts category tabs and sets active class on clicked tab
 * @param {Event} e the event object 
 */
function setActiveTab (e){
    const tabs = document.querySelectorAll(".filter-posts .category div");
    tabs.forEach(tab=>{
        if(tab.className="active") tab.classList.remove("active");
    });

    e.target.classList.add("active");
}