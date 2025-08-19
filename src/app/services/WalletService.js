// import { Component } from 'react';
// import {withdrawService,walletService} from "../api/axios";
// import refactors from '../libs/WalletComponent';
// import jwt from '../libs/jwtService';

// export default new class WalletService extends Component{
    
//     constructor() {
//         super();
//         this.token = jwt.GetUserToken();
//     }
    
//     loadUserWalletBalance = async () => {
//         try {
//             const request = await walletService.get('/all/assets/balance', {
//                 headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`, },
//                 credentials: 'include',
//             });
//             return request;
//         } catch (error) {
//             console.log(error);
//             refactors.setUserDetails("", "", "", "");
//             localStorage.removeItem('data');
//             sessionStorage.removeItem('data');
//             document.cookie = `data=; path=/; secure; samesite=strict`;
//             window.location.replace('/');
//         }
//     }

//     makeTransfer = async ({ ...data }) => {
//         try {
//             const cleanedStr = data.amount.replace(/,/g, '');
//             const decimalNumber = parseFloat(cleanedStr);
//             const formattedNumber = decimalNumber.toFixed(2);
//             const newData = { fromUser: data.fromUser, toUser: data.toUser, amount: formattedNumber };

//             const request = await withdrawService.post('/wallet/send', newData, {
//                 headers: { 
//                     'Content-Type': 'application/json', 
//                     'Authorization': `Bearer ${this.token}`, 
//                 },
//                 credentials: 'include',
//             });
//             return request;
//         } catch (error) { 
//             return error;
//         }
//     }

//     sendMoneyToUserWithUsername = async ({ ...data }) => {
//         try {
            
//             const cleanedStr = data.amount.replace(/,/g, '');
//             const decimalNumber = parseFloat(cleanedStr);
//             const formattedNumber = decimalNumber.toFixed(2);
//             const newData = { fromUser: data.senderId, toUser: data.receiverId, amount: formattedNumber, decription:data.description, transferpin:data.transferpin, currencyType:data.currencyType, region: data.region };
            
//             const request = await withdrawService.post('/transfer/platform/user/send', newData, {
//                 headers: { 
//                     'Content-Type': 'application/json', 
//                     'Authorization': `Bearer ${this.token}`, 
//                 },
//                 credentials: 'include',
//             });
//             return request;
//         } catch (error) { 
//             return error;
//         }
//     }

//     makeExternalUserTransfer = async (data) => {
//         try {
            
//             const cleanedStr = data.amount.replace(/,/g, '');
//             const decimalNumber = parseFloat(cleanedStr);
//             const formattedNumber = decimalNumber.toFixed(2);
//             const newData = { transferpin:data.transferpin, accountNumber: data.accountNumber, bankcode: data.bankcode, amount: formattedNumber, description: data.description, fromUser: data.fromUser };
            
//             const request = await withdrawService.post('/wallet/external/send', newData, {
//                 headers: { 
//                     'Content-Type': 'application/json', 
//                     'Authorization': `Bearer ${this.token}`, 
//                 },
//                 credentials: 'include',
//             });
//             return request;
//         } catch (error) { 
//             return error;
//         }
//     }

//     createTransferPin = async({...data}) => {
//         try {
//             const request = await walletService.post('/set/pin', data, {
//                 headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt.GetUserToken()}`, },
//                 credentials: 'include',
//             });
//             return request;
//         } catch (error) { 
//             return error;
//         }
//     }
    
// }

