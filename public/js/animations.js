//using a function so I can call this after dynamically rendering elements with js
//after an getting posts from the db asynchronously
const postPreviewAnimations = ()=> {
    document.querySelectorAll(".post-preview").forEach(postPreview=>{
        postPreview.onmouseenter = function(){
            this.classList.add("hover");
            this.classList.remove("out");
        }
        postPreview.onmouseleave = function(){
            this.classList.add("out");
            this.classList.remove("hover")
        }
    })
}

postPreviewAnimations();