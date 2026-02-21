import { useRouteError } from "react-router";

function ErrorPage() {
    const error = useRouteError();
    console.log("[ErrorPage]", error?.message ?? error?.statusText ?? error);

    return (
        <div className="flex justify-center mt-8">
            <div className="flex flex-col items-center gap-3 border border-slate-400 rounded-lg p-4 md:w-[40%]">
                <h1 className="font-bold text-xl">Something went wrong</h1>
                <p className="text-slate-600">
                    {error?.status && <span>{error.status} </span>}
                    {error?.statusText || error?.message || "An unexpected error occurred."}
                </p>
            </div>
        </div>
    );
}

export default ErrorPage;
