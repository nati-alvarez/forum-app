const requestStatus = new RequestStatus(".status");


const nameInput = document.querySelector("input#name");
const descriptionInput = document.querySelector("textarea#description");
const bannerInput = document.querySelector("input#banner");
const iconInput = document.querySelector("input#icon");

function createCommunity(e){
    e.preventDefault();
    requestStatus.renderLoading();
    const formData = new FormData();
    
    if(!nameInput.value.trim()) return requestStatus.renderError("Name is required");
    formData.append("name", nameInput.value.trim());

    if(!descriptionInput.value.trim()) return requestStatus.renderError("Description is required");
    formData.append("description", nameInput.value.trim());

    const bannerImage = bannerInput.files[0] || null;
    const iconImage = iconInput.files[0] || null;
    formData.append("banner", bannerImage);
    formData.append("icon", iconImage);

}  