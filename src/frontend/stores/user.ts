import { defineStore } from 'pinia'
import axios from 'axios';
import type { PublicUser, SignupRequestBody } from 'src/shared/types/User';
export const useUserStore = defineStore('user', {
    state: () => (<{
        userData: PublicUser | null
    }>{
        userData: null,
    }),
    actions: {
        async signup(signupRequestBody: SignupRequestBody) {
            try {
                this.userData = await axios.post('http://localhost:3001/api/signup', signupRequestBody)
            } catch (error) {
                // let the form component display the error
                return error
            }
        },
    },
})
