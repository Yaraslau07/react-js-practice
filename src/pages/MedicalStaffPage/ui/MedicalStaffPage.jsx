import { useState } from "react";
import { useGetMedicalStaffQuery } from "../../../entities/MedicalStaff/index.js";
import './medicalStaffLayout.scss'
import InlineError from "../../../shared/ui/InlineError/InlineError.jsx";

export function MedicalStaffLayout(){
   const [currentPage, setCurrentPage] = useState(1) 
   const [filters, setFilters] = useState({showAll : true, specialization: [] , languages: []})
   
   const { data, error, isFetching, isError, refetch } = useGetMedicalStaffQuery()
   
   if (isFetching) return <div>Loading...</div>;

   const errorMessage = error?.data?.message || error?.error;
   console.log(data)
   const filteredDoctors = filters.showAll ? data.staff : data.staff.filter((doctor) => {
     
        const matchSpecialization = filters.specialization.length === 0 || filter.specialization.includes(doctor.specialization)
        
        const matchLanguages = filters.languages.length === 0 || filter.languages.some((lang) => doctor.languages.includes(lang))

        return matchLanguages && matchSpecialization
   })
   
   return(
    <div className="medical-staff-page">
      <div className="page-header">
        <h1 className="page-title">Medical Staff</h1>
        <button className="filter-btn" type="button">
          <span className="filter-icon">⊶</span> Filter
        </button>
      </div>
      {isError ? (
        <InlineError message={errorMessage} onRetry={refetch}/>
      ) : (
      <div className={`table-container ${isFetching ? "loading-overlay" : ""}`}>
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
            {filteredDoctors?.map((doctor) => (
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
                    <div className="specialty-label">{doctor.specialization}</div>
                  </div>
                </td>

                <td className="location-cell">
                  <strong>{doctor.city}, {doctor.country}</strong>
                </td>

                <td className="hours-cell">{doctor.availableHours}</td>

                <td className="booking-cell">
                  <button className="book-link" type="button">
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
    )} 
    {/*!isError && (
       
    )*/}
    </div> 
   )
}