
// import { Component } from 'react';
// import {authenticationService} from "../api/axios";
// import jwt from '../libs/jwtService';

// export default new class UserRecordServices extends Component {
//     constructor() {
//         super();
//         this.token = jwt.GetUserToken();
//     }

//     getUser = async() => {
//         try {
//             const request = await authenticationService.get('/user/profile', {
//                  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`, },
//                 credentials: 'include',
//             });
//             return request;
//         } catch (error) { 
//             return error;
//         }
//     } 

//     updateUserProfile = async (imageUpload,) => {
//         const formData = new FormData();
//         imageUpload.profile ? formData.append('profile', imageUpload.profile) : '';
//         try {
//             const response = await fetch('http://localhost:8293/api/v1/user/settings/update/user', {
//                 method: 'POST',
//                 body: formData,
//                 headers: {
//                     'Authorization': `Bearer ${this.token}`,
//                 }
//             });
//             if (response.status ==200) {
//                 return response
//             } else {
//                 return response
//             }
//          } catch (error) {
//             return error;
//         }
//     }

//     update2FA = async (data) => {
//        try {
//             const request = await authenticationService.post("/user/settings/enable-twofactor", JSON.stringify(data), {
//                 headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`, },
//                 credentials: 'include',
//             });
//             return request;
//         } catch (error) { 
//             return error;
//         }
//     }

//     changePassword = async (data) => {
//         try {
//             const newData  = {"oldPassword":data.currentPassword, 'password':data.newPassword, 'confirmPassword':data.confirmPassword }
//             const request = await authenticationService.post("/user/settings/updatepassword", newData, {
//                 headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`, },
//                 credentials: 'include',
//             });
//             return request;
//         } catch (error) { 
//             return error;
//         }
        
//     }

//     UpdateUsername = async (data) => {
//         try {
//             const request = await authenticationService.post('/user/update/username', JSON.stringify(data), {
//                 headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt.GetUserToken()}`, },
//                 credentials: 'include',
//             });
//             return request;
//         } catch (error) { 
//             return error;
//         }
//     } 
    
//     UpdateEmail = async (data) => {
//         try {
//             const request = await authenticationService.post('/user/update/email', JSON.stringify(data), {
//                 headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt.GetUserToken()}`, },
//                 credentials: 'include',
//             });
//             return request;
//         } catch (error) { 
//             return error;
//         }
//     }
// }