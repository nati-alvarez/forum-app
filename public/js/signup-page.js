const requestStatus = new RequestStatus(".status");

async function signup(e){
    e.preventDefault();
    const username = document.querySelector("input#username").value.trim();
    const bio = document.querySelector("textarea#bio").value.trim();
    const pfp = document.querySelector("input#pfp").files[0];
    const password = document.querySelector("input#password").value.trim();
    const public = document.querySelector("input#public").checked;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("bio", bio);
    if(pfp) formData.append("pfp", pfp, pfp.name);
    formData.append("password", password);
    formData.append("public", public);

    try {
        requestStatus.renderLoading();
        const res = await fetch("/signup", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        
        if(data.err) return requestStatus.renderError(data.err);
        window.location = "/";
    }catch(err){
        console.log(err);
        requestStatus.renderError(err.message);
    }
}