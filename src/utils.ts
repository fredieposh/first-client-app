import { NavigateFunction } from "react-router";
import { API_URL } from "./config";
export type { User };

interface User {
    id: number;
    userName: string;
}

function handleButtonClick(
    event: React.MouseEvent<HTMLButtonElement>, 
    route: string, 
    navigate: NavigateFunction
) {
    event.preventDefault();
    navigate(route);
}

async function handleSubmit<T>(
    e:React.SubmitEvent<HTMLFormElement>, 
    apiRoute: string, 
    { userName, password, setResponseType, setResponseData, includeBody = true }: {
        userName: string;
        password: string;
        setResponseType: React.Dispatch<React.SetStateAction<number | null>>;
        setResponseData: React.Dispatch<React.SetStateAction<T>>
        includeBody?: boolean;
    }
) {
    e.preventDefault();
    const fetchOptions:RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    };
    if (includeBody) {
        fetchOptions.body = JSON.stringify({ username: userName, password });
    }
    const response = await fetch(apiRoute, fetchOptions);
    const result = await response.json();
    setResponseType(response.status);
    setResponseData(result);
}

function convertMessagesTimeFormat(post: { createdAt: string } ) {
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

async function handleLogout({ setUser, setIsAuth, navigate }: {
    setUser:    React.Dispatch<React.SetStateAction<User | null>>;
    setIsAuth:  React.Dispatch<React.SetStateAction<boolean>>;
    navigate:   NavigateFunction;    
}) {
    setUser(null);
    setIsAuth(false);
    localStorage.removeItem("token");
    
    const logoutResult = await fetch(`${API_URL}/logout`, { 
        method: 'POST',
        credentials: 'include',
    });

    console.log(`${logoutResult}`);
    navigate("/");
}

function handleResponse({ result, setIsAuth, setUser, user, isAuth }: {
    result: { isAuth: boolean; user?: User };
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    user: User | null;
    isAuth: boolean;    
}) {
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

function isContentJson(content: string):object | false {
    try {
        const parsed = JSON.parse(content);
        if (parsed?.type === "doc") return parsed;
    } catch {
        return false;
    }
    return false;
}

export { handleButtonClick, handleSubmit, convertMessagesTimeFormat, handleResponse, handleLogout, isContentJson };
