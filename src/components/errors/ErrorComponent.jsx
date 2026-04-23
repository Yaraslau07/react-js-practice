import { useRouteError, isRouteErrorResponse } from "react-router";

export default function ErrorComponent() {
  const error = useRouteError();
  console.error(error);

  let title = "Oops! Something went wrong.";
  let message = "An unexpected error occured. Please try again later.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "Page Not Found";
      message = "The page you are looking for does not exist or has been moved.";
    } else {
      title = `Error ${error.status}`;
      message = error.statusText;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="error-container">
      <h1 className="error-title">{title}</h1>
      <p className="error-message">{message}</p>
      <button 
        type="button"
        className="error-button"
        onClick={() => window.location.href = '/'}
      >
        Back to Dashboard
      </button>
    </div>
  );
}