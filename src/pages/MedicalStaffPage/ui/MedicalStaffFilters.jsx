import "./medicalStaffFilters.scss";
import { useSearchParams } from "react-router";

const SPECIALIZATIONS = [
	"Cardiologist",
	"Therapist",
	"Pediatrician",
	"Neurologist",
	"Dermatologist",
	"Orthopedist",
	"Psychiatrist",
	"Allergist",
];

const LANGUAGES = [
	"English",
	"German",
	"French",
	"Italian",
	"Russian",
	"Uzbek",
	"Greek",
	"Jewish",
];

export function MedicalStaffFilters() {
	const [searchParams, setSearchParams] = useSearchParams();

	const activeSpecializations =
		searchParams.get("specializations")?.split("-") || [];
	const activeLanguages = searchParams.get("languages")?.split("-") || [];
	const hasActiveFilters =
		activeSpecializations.length > 0 || activeLanguages.length > 0;

	const handleToggle = (key, val) => {
		const newParams = new URLSearchParams(searchParams);
		const existingValues = newParams.get(key)?.split("-") || [];

		const updatedValues = existingValues.includes(val)
			? existingValues.filter((v) => v !== val)
			: [...existingValues, val];

		if (updatedValues.length > 0) {
			newParams.set(key, updatedValues.join("-"));
		} else {
			newParams.delete(key);
		}

		newParams.set("page", "1");

		setSearchParams(newParams);
	};

	const handleClear = () => {
		const newParams = new URLSearchParams(searchParams);
		newParams.delete("specializations");
		newParams.delete("languages");
		newParams.set("page", "1");
		setSearchParams(newParams);
	};

	return (
		<div className="inline-filters-panel">
			<div className="filters-content">
				<div className="filter-row">
					<span className="row-label">Specialization:</span>
					<div className="checkbox-group">
						{SPECIALIZATIONS.map((spec) => (
							<label key={spec} className="checkbox-label">
								<input
									type="checkbox"
									checked={activeSpecializations.includes(spec)}
									onChange={() => handleToggle("specializations", spec)}
								/>
								<span className="custom-checkbox"></span>
								<span className="label-text">{spec}</span>
							</label>
						))}
					</div>
				</div>

				<div className="filter-row">
					<span className="row-label">Languages:</span>
					<div className="checkbox-group">
						{LANGUAGES.map((lang) => (
							<label key={lang} className="checkbox-label">
								<input
									type="checkbox"
									checked={activeLanguages.includes(lang)}
									onChange={() => handleToggle("languages", lang)}
								/>
								<span className="custom-checkbox"></span>
								<span className="label-text">{lang}</span>
							</label>
						))}
					</div>
				</div>
			</div>
			{hasActiveFilters && (
				<div className="filters-actions">
					<button
						type="button"
						className="clear-all-btn"
						onClick={() => handleClear()}
					>
						Clear Filters
					</button>
				</div>
			)}
		</div>
	);
}
