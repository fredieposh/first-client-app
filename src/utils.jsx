function handleButtonClick(event, route, navigate) {
    event.preventDefault();
    navigate(route);
}

async function handleSubmit(e, apiRoute, { userName, password, setResponseType, setResponseData, includeBody = true }) {
    e.preventDefault();
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    };
    if (includeBody) {
        fetchOptions.body = JSON.stringify({ username: userName, password });
    }
    const response = await fetch(apiRoute, fetchOptions);
    const result = await response.json();
    setResponseType(response.status);
    setResponseData(result);
}

export { handleButtonClick, handleSubmit };
