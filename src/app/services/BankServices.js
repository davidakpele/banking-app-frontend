
import { Component } from 'react';
import {bankApiService} from "../api/axios";
import jwt from '../libs/jwtService';

export default new class BankServices extends Component{

    getUserBanks = async ({...data}) => {
        try {
            const request = await bankApiService.get('/bank/verify-user-bank-details?accountNumber='+data.accountNumber+"&bankCode="+data.bank, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt.GetUserToken()}`, },
                credentials: 'include',
            });
            return request;
        } catch (error) { 
            return error;
        }
    }

    addNewBank = async ({ ...data }) => {
        try {
            const request = await bankApiService.post('/wallet/add-new-bank', JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt.GetUserToken()}`, },
                credentials: 'include',
            });
            return request;
        } catch (error) { 
            return error;
        }
    }

    getAllBankList = async () => {
        try {
            const request = await bankApiService.get('/bank/bank-list', {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt.GetUserToken()}`, },
                credentials: 'include',
            });
            return request;
        } catch (error) { 
            return error;
        }
    }

    deposit_user_wallet = async (data) => {
        try {
            const request = await bankApiService.post('/deposit/create', JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt.GetUserToken()}`, },
                credentials: 'include',
            });
            return request;
        } catch (error) { 
            return error;
        }
    }

    getPaystackHistory = async () => {
        try {
            const request = await bankApiService.get('/wallet/history/overview', {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt.GetUserToken()}`, },
                credentials: 'include',
            });
            return request;
        } catch (error) { 
            return error;
        }
    }

    getBankList = async () => {
        try {
            const request = await bankApiService.get('/bank/get-bank-list', {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt.GetUserToken()}`, },
                credentials: 'include',
            });
            return request;
        } catch (error) { 
            return error;
        }
    }
}
