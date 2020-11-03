const requestStatus = new RequestStatus(".status");


const nameInput = document.querySelector("input#name");
const descriptionInput = document.querySelector("textarea#description");
const bannerInput = document.querySelector("input#banner");
const iconInput = document.querySelector("input#icon");

async function createCommunity(e){
    e.preventDefault();
    requestStatus.renderLoading();
    const formData = new FormData();
    
    const name = nameInput.value.trim()
    if(!name) return requestStatus.renderError("Name is required");
    formData.append("name", name);

    const description = descriptionInput.value.trim();
    if(!description) return requestStatus.renderError("Description is required");
    formData.append("description", description);

    const bannerImage = bannerInput.files[0] || null;
    const iconImage = iconInput.files[0] || null;
    formData.append("banner", bannerImage);
    formData.append("icon", iconImage);

    const res = await fetch("/community/create", {
        method: "POST",
        body: formData
    });
    data = await res.json();
    if(res.status !== 201) requestStatus.renderError(data.err);
    else if(res.status === 201) window.location = `/community/${name}`
}  