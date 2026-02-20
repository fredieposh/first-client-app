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

function convertMessagesTimeFormat(post) {
    const rawDate = new Date(post?.createdAt);
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour12: false,
    })
        .format(rawDate)
        .replace(",", "");
    return formattedDate;
}

export { handleButtonClick, handleSubmit, convertMessagesTimeFormat };
