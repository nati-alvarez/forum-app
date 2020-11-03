/**
 * Gets posts from backend with addition optional filters
 * @param {String} category the category of posts
 * @param {String} keyword  search query to filter posts by
 * @returns {Promise} promise of filtered posts
 * @returns {Error} error object
 */
async function getPosts(category, keyword, startFrom, communityName) {
    try{
        const res = await fetch(`/posts?category=${category}&keyword=${keyword}&startFrom=${startFrom}&communityName=${communityName}`);
        return res.json();
    }catch(err){
        console.log(err);
    }
}

/**
 * Gets the x and y position of an element
 * @param {HTMLElement} el the html element to get the coordinates of 
 */
function getElementCoords( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
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
        this.message = null
        this.statusContainer = document.querySelector(selector)
    }

    /**
     * Render the loading message
     */
    renderLoading(){
        this.loading = true;
        this.error = null;
        this.message = null;
        this.statusContainer.classList.remove("error", "success");
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
        this.statusContainer.classList.add("error");
    }

    /**
     * Clear loading status on a successful request
     */
    success(){
        this.loading = false;
        this.statusContainer.textContent = "";
    }

    /**
     * Show success message on a successful request then clear it
     */
    renderSuccessMessage(message){
        this.loading = false;
        this.message = message;
        this.statusContainer.textContent = this.message;
        this.statusContainer.classList.add("success");

        setTimeout(()=>{
            this.message = null;
            this.statusContainer.textContent = "";
            this.statusContainer.classList.remove("success");
        }, 5000);
    }

}