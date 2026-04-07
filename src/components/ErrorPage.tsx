import { useRouteError, isRouteErrorResponse } from "react-router";

function ErrorPage() {
    const error = useRouteError();

    let status: number | undefined;
    let message: string;

    if (isRouteErrorResponse(error)) {
        status = error.status;
        message = error.statusText;
    } else if (error instanceof Error) {
        message = error.message;
    } else {
        message = "An unexpected error occurred.";
    }    
    console.log("[ErrorPage]", message);

    return (
        <div className="flex justify-center mt-8">
            <div className="flex flex-col items-center gap-3 border border-slate-400 rounded-lg p-4 md:w-[40%]">
                <h1 className="font-bold text-xl">Something went wrong</h1>
                <p className="text-slate-600">
                    {status && <span>{status} </span>}
                    {message}
                </p>
            </div>
        </div>
    );
}

export default ErrorPage;
