import { useState } from "react";
import { useGetMedicalStaffQuery } from "../../../entities/MedicalStaff/index.js";
import "./medicalStaffLayout.scss";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import { BookingModal } from "../../../features/BookAppointmentModal/index.js";
import { Pagination } from "../../../features/StaffPagination/index.js";
import { openBookingModal } from "../../../shared/model/uiSlice.js";
import { EmptySearch } from "../../../shared/ui/EmptySearch/EmptySearch.jsx";
import InlineError from "../../../shared/ui/InlineError/InlineError.jsx";
import { MedicalStaffFilters } from "./MedicalStaffFilters.jsx";

export function MedicalStaffLayout() {
	const [filtersOpened, setFiltersOpened] = useState(false);
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();
	const { isBookingModalOpened } = useSelector((state) => state.ui);

	const { data, error, isFetching, isError, refetch } =
		useGetMedicalStaffQuery();

	if (isFetching) return <div>Loading...</div>;

	const errorMessage = error?.data?.message || error?.error;

	const activeSpecializations =
		searchParams.get("specializations")?.split("-") || [];
	const activeLanguages = searchParams.get("languages")?.split("-") || [];
	const activePage = Number(searchParams.get("page")) || 1;
	const showAll =
		activeSpecializations.length === 0 && activeLanguages.length === 0;

	const filteredDoctors = showAll
		? data.staff
		: data.staff.filter((doctor) => {
				const matchSpecialization =
					activeSpecializations.length === 0 ||
					activeSpecializations.includes(doctor.specialization);

				const matchLanguages =
					activeLanguages.length === 0 ||
					activeLanguages.some((lang) => doctor.languages.includes(lang));

				return matchLanguages && matchSpecialization;
			});

	const startIndex = (activePage - 1) * 10;
	const endIndex = startIndex + 10;
	const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);

	const totalPages = Math.ceil(filteredDoctors.length / 10);

	const handleBooking = (doc) => {
		dispatch(openBookingModal(doc));
	};

	return (
		<div className="medical-staff-page">
			<div className="page-header">
				<h1 className="page-title">Medical Staff</h1>
				<button
					className={`filter-btn ${filtersOpened ? "active" : ""}`}
					type="button"
					onClick={() => setFiltersOpened(!filtersOpened)}
				>
					Filter
				</button>
			</div>
			{filtersOpened && <MedicalStaffFilters />}
			{isError ? (
				<InlineError message={errorMessage} onRetry={refetch} />
			) : !isFetching && filteredDoctors?.length === 0 ? (
				<EmptySearch
					message="No doctors match your criteria"
					subMessage="Try removing some filters to see more results."
				/>
			) : (
				<>
					<div
						className={`table-container ${isFetching ? "loading-overlay" : ""}`}
					>
						<table className="staff-table">
							<thead>
								<tr>
									<th>Name</th>
									<th>City/Country</th>
									<th>Available hours</th>
									<th>Schedule an appointment</th>
									<th>Languages</th>
								</tr>
							</thead>
							<tbody>
								{paginatedDoctors?.map((doctor) => (
									<tr key={doctor.id}>
										<td className="name-cell">
											<img
												src={`https://i.pravatar.cc/150?u=${doctor.id}`}
												alt={doctor.fullname}
												className="avatar"
											/>
											<div className="name-wrapper">
												<div className="full-name">{doctor.fullname}</div>
												<div className="clinic-info">Harmony Health</div>
												<div className="specialty-label">
													{doctor.specialization}
												</div>
											</div>
										</td>

										<td className="location-cell">
											<strong>
												{doctor.city}, {doctor.country}
											</strong>
										</td>

										<td className="hours-cell">{`${doctor.hoursFrom} - ${doctor.hoursTo}`}</td>

										<td className="booking-cell">
											<button
												className="book-link"
												type="button"
												onClick={() => handleBooking(doctor)}
											>
												<span className="calendar-icon">📅</span>
												Book date
											</button>
										</td>
										<td className="status-cell">{`${doctor.languages[0]}, ${doctor.languages[1]}`}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div>
						{totalPages > 1 && <Pagination totalPages={totalPages} />}
						{isBookingModalOpened && <BookingModal />}
					</div>
				</>
			)}
		</div>
	);
}
