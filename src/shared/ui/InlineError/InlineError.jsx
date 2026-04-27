import './inlineError.scss';

export default function InlineError({ title = "Failed to load data", message, onRetry }) {
  return (
    <div className="inline-error-container">
      <div className="error-icon">
        ⚠️
      </div>
      
      <div className="error-content">
        <h3 className="error-title">{title}</h3>
        <p className="error-message">
          {message || "An unexpected error occurred while communicating with the server."}
        </p>
      </div>

      {onRetry && (
        <button className="retry-btn" onClick={onRetry} type='button'>
          Try Again
        </button>
      )}
    </div>
  );
}