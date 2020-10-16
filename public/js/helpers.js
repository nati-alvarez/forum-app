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

class RequestStatus {
    /**
     * Create an object to represent the status of an AJAX request
     * @param {String} selector the querySelector tag of the element the request status will be shown in
     */
    constructor(selector){
        this.loading = false,
        this.error = null
        this.statusContainer = document.querySelector(selector)
    }

    /**
     * Render the loading message
     */
    renderLoading(){
        this.loading = true;
        this.error = null;
        this.statusContainer.textContent = "";
        this.statusContainer.textContent = "loading..."
    }

    /**
     * Render the error message
     * @param {String} err the error message to be shown 
     */
    renderError(err){
        this.error = err;
        this.loading = false;
        this.statusContainer.textContent = "";
        this.statusContainer.textContent = this.error;
    }

    /**
     * Clear loading status on a successful request
     */
    success(){
        this.loading = false;
        this.statusContainer.textContent = "";
    }

}