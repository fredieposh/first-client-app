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

function handleLogout({ setUser, setIsAuth, navigate }) {
    setUser(null);
    setIsAuth(false);
    localStorage.removeItem("token");
    navigate("/");
}

function handleResponse({ result, setIsAuth, setUser, user, isAuth }) {
    if (result.isAuth && !isAuth) {
        setIsAuth(true);
    }
    if (result.user && !user) {
        setUser(result.user);
    }

    if (!result.isAuth && isAuth) {
        setIsAuth(false);
        setUser(null);
        localStorage.removeItem("token");
    }

};

export { handleButtonClick, handleSubmit, convertMessagesTimeFormat, handleResponse, handleLogout };
