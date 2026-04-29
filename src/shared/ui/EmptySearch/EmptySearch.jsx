import "./emptySearch.scss";

export function EmptySearch({ message, subMessage }) {
	return (
		<div className="empty-state-container">
			<div className="empty-state-icon">🔍</div>
			<h3 className="empty-state-title">{message}</h3>
			<p className="empty-state-description">{subMessage}</p>
		</div>
	);
}
