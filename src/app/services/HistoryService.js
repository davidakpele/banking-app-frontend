// import { Component } from 'react';
// import xhrClient from "../api/xhrClient"
// import jwt from '../libs/jwtService';


// export default new class HistoryServices extends Component{

//     constructor() {
//         super();
//         this.token = jwt.GetUserToken();
//     }

//     FetchHistoryByCurrencyType = async (currencyType) => {
//         try {
//             const response = await xhrClient('http://localhost:8014/api/v1/history/currencyType='+currencyType, 'GET', {
//                 'Authorization': `Bearer ${this.token}`,
//                 'Content-Type': 'application/json',
//             });
//             return response;
//         } catch (error) {
//             return error;
//         }
//     }

//     FetchAllHistory  = async () => {
//         try {
//             const response = await xhrClient('http://localhost:8014/api/v1/history/all', 'GET', {
//                 'Authorization': `Bearer ${this.token}`,
//                 'Content-Type': 'application/json',
//             });
//             return response;
//         } catch (error) {
//             return error;
//         }
//     }
// }