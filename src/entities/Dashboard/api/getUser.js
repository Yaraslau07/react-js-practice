import { dummyApi } from "../../../shared/api/dummyAPi";

const randomUser = Math.floor(Math.random() * 100) + 50
export const getUserApi = dummyApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => `users?limit=1&skip=${randomUser}`,

            transformResponse: (response) => {
                return {  
                    user: response.users.map((user) => ({
                        id: user.id,
                        image: user.image,
                        contact_info: {
                            fullName: `${user.firstName} ${user.lastName}`,
                            phone: user.phone,
                            email: user.email,
                            address: `${user.address.address}, ${user.address.city}, ${user.address.stateCode}`,
                            homePhone: "-",
                        }, 
                        personal: {
                            gender: user.gender,
                            birthAndAge: `${user.birthDate} (${user.age})`,
                            nationality: user.address.country,
                            bloodGroup: user.bloodGroup,
                            height: user.height,
                            weight: user.weight,
                            maritalStatus: user.id % 2 === 1 ? "married" : "single",
                            emergencyContact: "+7 (495) 629-10-10",
                        },
                        insurance: {
                            provider: "Belgosstrakh",
                            memberId: "54223467897",
                        },
                        contact_preferences: {
                            email: true, 
                            phone: true,
                            mail: false,
                        }    
                    }))
                }
            }
        })
    })
})

export const { useGetUser } = getUserApi

