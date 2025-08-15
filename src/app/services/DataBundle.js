import { Component } from 'react';
import xhrClient from "../api/xhrClient"
import axios from "axios"
import jwt from '../libs/jwtService';

export default new class DataBundle extends Component{
    
    getDataBundle = async(serviveType) => {
        try {
            const request = await axios.get('https://api-service.vtpass.com/api/service-variations?serviceID='+serviveType+'-data', {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            return request;
        } catch (error) { 
            return error;
        }
    }

    buyAirtime = async({...data}) => {
        try {
            const newdata = { "amount":data.formData.amount, "mobileNumber":data.formData.mobileNumber, "serviceProvider":data.formData.serviceProvider };
            const request = await xhrClient('/service/buy/airtime', 'POST', {
                'Authorization': `Bearer ${jwt.GetUserToken()}`,
                'Content-Type': 'application/json',
            }, newdata);
            return request;
        } catch (error) { 
            return error;
        }
    }

    buyDataBundle = async({...data}) => {
        try {
            const newdata = { "amount":data.formData.amount, "mobileNumber":data.formData.mobileNumber, "serviceProvider":data.formData.serviceProvider,"product":data.formData.product.label };
             const request = await xhrClient('/service/buy/databundle', 'POST', {
                'Authorization': `Bearer ${jwt.GetUserToken()}`,
                'Content-Type': 'application/json',
            }, newdata);
            return request;
        } catch (error) { 
            return error;
        }
    }

}
