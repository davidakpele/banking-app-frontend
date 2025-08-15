import { Component } from 'react';

export default new class WalletComponent extends Component{

    FetchBalanceByCurrency = (currency) => {
        // Retrieve data from localStorage
        const storedData = localStorage.getItem('data');
        if (!storedData) {
            return 'Data not found in localStorage.';
        }

        try {
            // Parse the stored JSON data
            const dataObject = JSON.parse(storedData);

            // Navigate to "app" > "walletData"
            const walletData = dataObject?.app?.walletData;
            if (!walletData) {
                return 'Wallet data not found in localStorage.';
            }
           
            // Find the balance for the given currency
            const walletBalances = walletData || [];
            const balance = walletBalances.find(balance => balance.currency_code == currency);
            return balance ? balance.balance+'.00' : `No balance found for ${currency}`;
        } catch (error) {
            return 'Error parsing localStorage data '+ error;
        }
    };


    FormatAmount = (value) => {
        let cleanedValue = value.replace(/[^0-9.]/g, '');

        const parts = cleanedValue.split('.');
        const integerPart = parts[0];
        let decimalPart = parts[1] || '';

        if (decimalPart.length > 2) {
        decimalPart = decimalPart.slice(0, 2);
        }

        const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return decimalPart !== '' ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
    }

    SetBalanceData=(balances)=> {
        const storedData = localStorage.getItem('data');
        let parsedData = {};
        if (storedData) {
            parsedData = JSON.parse(storedData);
            const appSection = parsedData.app;
            if (appSection) {
                parsedData.app.walletData = balances;
                const data = JSON.stringify(parsedData);
                localStorage.setItem('data', data);
                sessionStorage.setItem('data', data);
                document.cookie = `data=${data}; path=/; secure; samesite=strict`;
            }
        }
    }
    
    SetUserTransactionPinMode = (is_transfer_pin_set, action, set) => {
        const storedData = localStorage.getItem('data');
        let parsedData = {};
        if (storedData) {
            try {
                parsedData = JSON.parse(storedData);
                const appSection = parsedData.app;
                if (appSection) {
                    if (set =='action' && !action && !('transactionMode' in parsedData.app) && !('is_transfer_pin_set' in parsedData.app)) {
                        parsedData.app.transactionMode = false;
                    }else if (set =='action' && !action && 'transactionMode' in parsedData.app && parsedData.app.transactionMode == false && !('is_transfer_pin_set' in parsedData.app)) {
                        parsedData.app.transactionMode = false;
                    }else if (action && set == 'button' && 'transactionMode' in parsedData.app && parsedData.app.transactionMode == false && is_transfer_pin_set == true) {
                        parsedData.app.transactionMode = true;
                        parsedData.app.is_transfer_pin_set = true;
                    }else if (set =='button' && action ==false && is_transfer_pin_set ==false && ('transactionMode' in parsedData.app) && parsedData.app.transactionMode == false  && !('is_transfer_pin_set' in parsedData.app)) {
                        parsedData.app.transactionMode = false;
                        parsedData.app.is_transfer_pin_set = false;
                    }
                    if (set =='action' && action ==false && is_transfer_pin_set==true && ('transactionMode' in parsedData.app) &&  parsedData.app.transactionMode == false && !('is_transfer_pin_set' in parsedData.app)) {
                        parsedData.app.transactionMode = true;
                        parsedData.app.is_transfer_pin_set = true;
                    }
                    localStorage.setItem('data', JSON.stringify(parsedData));
                } else {
                    return false;
                }
            } catch (error) {
                console.error('Error parsing stored data:', error);
            }
        } else {
            console.error('No data found in localStorage.');
        }

    }
}