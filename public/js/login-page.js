const requestStatus = new RequestStatus(".status");

async function login(e){
    try{
        e.preventDefault();
        const submitButton = document.querySelector("button#submit");
        const username = document.querySelector("input#username").value;
        const password = document.querySelector("input#password").value;
        const requestBody = JSON.stringify({username, password});

        submitButton.disabled = true;
        requestStatus.renderLoading();
        const res = await fetch('/login',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: requestBody
            }
        );
        const data = await res.json();

        submitButton.disabled = false;
        if(data.err) return requestStatus.renderError(data.err);
        window.location = "/";
    }catch(err){
        requestStatus.renderError(err.message)
    }
}