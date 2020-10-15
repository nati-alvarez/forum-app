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