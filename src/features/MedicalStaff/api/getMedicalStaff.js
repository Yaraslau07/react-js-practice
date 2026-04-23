import { dummyApi } from "../../../api/dummyAPi";

const specializations = [
  'Cardiologist', 'Therapist', 'Pediatrician', 'Neurologist', 
  'Dermatologist', 'Orthopedist', 'Psychiatrist', 'Allergist'
];

const working_hours = [
  '08:00 - 16:00', '09:00 - 17:00', '10:00 - 18:00', 
  '07:00 - 15:00', '12:00 - 20:00', '14:00 - 22:00'
];

const languages = [
  ['English', 'German'], ['French', 'English'], 
  ['Italian', 'English'], ['Russian', 'English'],
  ['Uzbek', 'English'], ['Greek', 'Jewish']
];

const getRandomItem = (arr) => {
    const index = Math.floor(Math.random() * arr.length)
    return arr[index]
}

export const medicalStaffApi = dummyApi.injectEndpoints({
    endpoints: (builder) => ({
        getMedicalStaff: builder.query({
            query: ({ limit = 10, skip = 0}) => `users?limit=${limit}&skip=${skip}`,

            transformResponse: (response) => {
                return {
                    total: response.total,
                    skip: response.skip,
                    limit: response.limit,
                    staff: response.users.map((user) => ({
                        id: user.id,
                        fullname: `${user.firstName} ${user.lastName}`,
                        city: user.address?.city || 'Tashkent',
                        country: user.address?.country || 'Uzbekistan',
                        specialization: getRandomItem(specializations),
                        languages: getRandomItem(languages),
                        availableHours: getRandomItem(working_hours),
                    }))
                }
            }
        })
    })
})

export const { useGetMedicalStaffQuery } = medicalStaffApi