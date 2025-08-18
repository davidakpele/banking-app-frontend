import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react';
import { Grid, Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import service from '../services/BankServices'
import $ from 'jquery';
import Navbar from './../../components/Navbar';
import "./AddBank.css"
import FiatModal from '../../components/modal/FiatModal';

const AddBank = () => {
  const navigate = useNavigate();
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedFiat, setSelectedFiat] = useState(null);
  const [verify, setVerify] = useState(false);
  const [options, setOptions] = useState([]);
  const [accountExist, setAccountExist] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiatModalOpen, setIsFiatModalOpen] = useState(false); 
  const [banks, setBanks] = useState([]);
  const [fiat, setFiat] = useState([]);
  const [accountDetails, setAccountDetails] = useState({
    account_holder_name: '',
    accountNumber: '',
    bankCode: '',
    bankName:'',
  })
  const [message, setMessage] = useState({
      message:''
  });
   
  const [formData, setFormData] = useState({
    bankdetails: {},
    bank:'',
    accountNumber: '',
    accountHolderName: '',
    bankName:'',
  });

  const [error, setErrors] = useState({
    bankdetails: {},
    bank:'',
    accountNumber: '',
    accountHolderName: '',
    bankName:'',
  });

  useEffect(() => {
    
    const fetchBankList = async () => {
      try {
        const response = await service.getAllBankList();
        if (response && response.status) {
          const options = response.data.map(bank => ({
            value: bank.code,
            label: bank.name
          }));
          setOptions(options);
        } else {
          console.warning('Error fetching bank list:', response.message);
        }
      } catch (error) {
        console.warning('Error fetching bank list:', error);
      }
    };

    fetchBankList();
  }, []); 
  
  const handlePreviousPage = () => {
    navigate(-1);
  }
  
  const handleBankChange = (selectedOption) => {
    setSelectedBank(selectedOption);
    setFormData({
      ...formData,
      bank: selectedOption.value,
      bankName: selectedOption.label,
      bankdetails: selectedOption ? selectedOption : '',
    });
    setErrors({
      ...error,
      bank: '',
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'accountNumber' && !/^\d{0,12}$/.test(value)) {
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...error,
      [name]: '',
    });
  };

  const validate = () => {
    let tempErrors = {
      bankdetails: {},
      bank:'',
      accountNumber: '',
      accountHolderName: '',
      bankName: '',
    };
    let isValid = true;
    if (!selectedBank) {
      tempErrors.bank = 'Please select your bank.';
      isValid = false;
    }
    if (!formData.accountNumber.trim()) {
      tempErrors.accountNumber = 'Account number is required';
      isValid = false;
    } 
    setMessage("")
    setErrors(tempErrors);
    return isValid;
  }
  
  const handleSubmitForm = async(e) => {
    e.preventDefault(0);
    if (validate()) { 
      $('.search_bank_details').text("Processing...");
      let tempErrors = {message: ''};
      tempErrors.message = 'Valid Account Number';
      tempErrors.accountNumber = 'Invalid Account Details.';
      service.getUserBanks(formData).then(async (result) => {
        console.log(result.data.data);
        
        if (result.data != null && result.status == 200) {
          setVerify(true)
          setErrors("")
          setMessage(tempErrors)
          setAccountDetails({
            ...accountDetails,
            account_holder_name: result.data.data.account_name,
            accountNumber: result.data.data.account_number,
            bankCode: formData.bank,
            bankName:formData.bankName,
          })
        } else if (result.data != null && result.data.status == false) {
          $('.search_bank_details').text("Search");
          setVerify(false)
          setMessage("")
         
          setErrors({
            ...setErrors,
            accountNumber:'Invalid Account Details.'
          });
          console.error("Invalid Account Details.")
        }else if (result.response != null) {
          $('.search_bank_details').text("Search");
          setVerify(false)
          setMessage("")
          tempErrors.accountNumber = result.response.data.message
          setErrors(tempErrors);
          console.error(result.response.data.message)
        }
      }).catch((err) => {
        console.warning(err);
      });
    }
  }

  const handleCancelBankCreation = (e) => {
     e.preventDefault(0);
    setAccountDetails({
      ...accountDetails,
      account_holder_name: '',
      accountNumber: '',
      bankCode: '',
      bankName: '',
    });
    setFormData({
      ...formData,
      bank: '',
      bankName: '',
      bankdetails: '',
      accountNumber:'',
    });
    setSelectedBank(null);
    setErrors({
      ...error,
      accountNumber: '',
      bank:''
    })
    setMessage({
      ...message,
      message:''
    })
    setVerify(false)
  }

  const handleAddBank = async (e) => {
    e.preventDefault(0);
      $('.add_new_bank_to_list').text("Processing saving...");
      await service.addNewBank(accountDetails).then((result) => {
      if (result.data != null && result.status == 201) {
        setErrors({
          ...error,
            accountNumber:''
        });
        setAccountExist(false)
        console.success("New bank details succesfully saved.")
        setInterval(() => {
          navigate("/user/deposit");
        }, 5000);
        
      } else {
        let tempErrors = {
          accountNumber: '',
        };
        tempErrors.accountNumber = result.response.data.message;
        setErrors(tempErrors);
        setAccountExist(true)
        $('.add_new_bank_to_list').text("Add Bank Account");
      }
    });
  }

  const getBank = async () => {
    try {
      const response = await service.getBankList();
      if (response.status) {
        setTimeout(() => {
          const updatedBanks = response.data.map(bank => ({
            ...bank,
            amount: ''
          }));
          setBanks(Array.isArray(updatedBanks) ? updatedBanks : []);
        }, 2000);
        
      }
      
    } catch (error) {
      console.error('Error fetching bank data:', error);
      setBanks([]); 
    }
  }

  const handleSelectClick = () => {
    setIsModalOpen(true);
    setBanks([]); 
    setSearchQuery('')
    getBank();
  };
  
  const handleSelectFiat = () => {
    setIsFiatModalOpen(true);
    setFiat([]);
  }
 
  return (
    <>
      <Navbar />
      <div className="deposit_items">
         {isFiatModalOpen && (
        <Suspense fallback={<div>Loading modal...</div>}>
          <FiatModal show={isFiatModalOpen}  onClose={() => setIsFiatModalOpen(false)}
          />
        </Suspense>
      )}
          <div className="mini_container login_widget mb-5">
            <div className="container_card">
              <div className="back-arrow" onClick={handlePreviousPage}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26"><g data-name="Layer 2"><path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z" data-name="arrow-ios-back"></path></g></svg>    
                  <div className="mt-1">Back</div>
                </div>
                <div className="justify-content-center">
                  <h4 className="deposit_card_title">Add New Bank Account</h4>
                  <div className="deposit_fill mb-4">
                    <b>NOTE:</b> Accounts added here are solely for deposits and not for withdrawals. Make sure it is your own account and the account name matches Alan Bola
                  </div>
                  <form method="post" onSubmit={handleSubmitForm} autoComplete='off'>
                     {verify ? (<>
                     <div className='container'>
                      <div className="currency1 mb-3">
                        <div className="currency1__img-block">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67 67" width="30" height="30"><path d="M7.722 57.657a.75.75 0 0 0-.75.75V64.5c0 .414.336.75.75.75h51.556a.75.75 0 0 0 .75-.75v-6.093a.75.75 0 0 0-.75-.75h-4.325V27.442h4.325a.75.75 0 0 0 .75-.75v-5.35a.75.75 0 0 0-.75-.75h-.187L33.94 1.899a.75.75 0 0 0-.895 0L7.91 20.593h-.187a.75.75 0 0 0-.75.75v5.349c0 .414.336.75.75.75h4.325v30.215H7.722zm50.806 6.093H8.472v-4.593h50.056v4.593zM24.214 27.442v30.215h-5.761V27.442h5.761zm12.167 0v30.215H30.62V27.442h5.761zm12.166 0v30.215h-5.761V27.442h5.761zm-7.261 30.215H37.88V27.442h3.405v30.215zm-12.166 0h-3.406V27.442h3.406v30.215zm24.333 0h-3.406V27.442h3.406v30.215zM33.493 3.435l23.083 17.158H10.423l23.07-17.158zM8.474 22.098h50.055v3.844H8.472v-3.844zm5.074 5.344h3.406v30.215h-3.406V27.442z"></path><path d="M33.5 12.448a1.167 1.167 0 0 1-1.166-1.166c0-.653.512-1.165 1.166-1.165.642 0 1.166.523 1.166 1.165a.75.75 0 0 0 1.5 0 2.66 2.66 0 0 0-1.916-2.544v-.415a.75.75 0 0 0-1.5 0v.415a2.66 2.66 0 0 0-1.916 2.544 2.668 2.668 0 0 0 2.666 2.666c.642 0 1.166.523 1.166 1.165s-.524 1.166-1.166 1.166-1.166-.523-1.166-1.166a.75.75 0 0 0-1.5 0 2.66 2.66 0 0 0 1.916 2.545v.477a.75.75 0 0 0 1.5 0v-.477a2.66 2.66 0 0 0 1.916-2.545 2.669 2.669 0 0 0-2.666-2.665z"></path></svg>
                        </div>
                        <div className="currency1__main">
                          <span className="currency1__abbr">{accountDetails.bankName}</span>
                          <div className="d-flex justify-content-between">
                            <span className="currency1__name ">{accountDetails.account_holder_name}</span>   
                            verified
                          </div>
                          <span className="currency1__name">{accountDetails.accountNumber}</span>
                        </div>
                        <span className="currency1__check">{verify ?'✔️':''} </span>
                      </div>
                      <span className="form-bottom-label text-invalid-account"  style={{ display: error.accountNumber ? 'block' : 'none' }}>
                        <div className="d-flex gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" imageRendering="optimizeQuality" shapeRendering="geometricPrecision" textRendering="geometricPrecision" version="1.0" viewBox="0 0 8.346 8.346" width="10" height="10"><rect width="8.346" height="8.346" fill="none"></rect><path fill="#e2311d" fillRule="nonzero" d="M8.28 6.905l-3.766 -5.9c-0.039,-0.061 -0.088,-0.108 -0.145,-0.139l-0.001 0c-0.056,-0.031 -0.122,-0.047 -0.195,-0.047 -0.073,0 -0.14,0.016 -0.195,0.047l-0.002 0c-0.056,0.031 -0.105,0.078 -0.144,0.139l-0.659 1.032 -3.107 4.868c-0.041,0.065 -0.064,0.135 -0.066,0.204 -0.002,0.069 0.015,0.14 0.053,0.208l0 0.001c0.036,0.067 0.087,0.119 0.147,0.155 0.059,0.035 0.129,0.054 0.207,0.054l2.575 0 4.957 0c0.078,0 0.148,-0.019 0.207,-0.054 0.06,-0.036 0.11,-0.088 0.147,-0.155l0 -0.001c0.037,-0.068 0.055,-0.139 0.053,-0.208 -0.003,-0.069 -0.025,-0.139 -0.066,-0.204zm-4.107 -0.299l0 0c-0.177,0 -0.32,-0.143 -0.32,-0.32 0,-0.177 0.143,-0.32 0.32,-0.32 0.177,0 0.32,0.143 0.32,0.32 0,0.177 -0.143,0.32 -0.32,0.32zm0.318 -1.309l0 0c-0.009,0.189 -0.153,0.286 -0.302,0.29 -0.003,0 -0.007,0 -0.01,0 -0.02,0 -0.039,-0.006 -0.058,-0.009 -0.017,-0.003 -0.033,-0.003 -0.049,-0.008 -0.021,-0.007 -0.04,-0.02 -0.059,-0.031 -0.013,-0.008 -0.028,-0.013 -0.04,-0.023 -0.02,-0.016 -0.034,-0.038 -0.049,-0.059 -0.007,-0.011 -0.018,-0.019 -0.024,-0.031 -0.018,-0.036 -0.03,-0.079 -0.032,-0.128l-0.094 -1.841c0,-0.041 0.003,-0.08 0.009,-0.116 0.004,-0.021 0.01,-0.04 0.015,-0.06 0.004,-0.013 0.006,-0.028 0.011,-0.041 0.006,-0.018 0.015,-0.033 0.023,-0.05 0.005,-0.011 0.01,-0.024 0.016,-0.034 0.008,-0.015 0.019,-0.026 0.028,-0.039 0.008,-0.01 0.014,-0.022 0.023,-0.031 0.011,-0.012 0.023,-0.021 0.035,-0.031 0.008,-0.008 0.016,-0.016 0.025,-0.023 0.014,-0.01 0.029,-0.017 0.043,-0.024 0.008,-0.005 0.016,-0.01 0.024,-0.014 0.014,-0.006 0.028,-0.009 0.042,-0.013 0.01,-0.003 0.02,-0.008 0.03,-0.01 0.011,-0.002 0.023,-0.002 0.034,-0.004 0.013,-0.001 0.027,-0.004 0.04,-0.004 0,0 0,0 0,0 0.011,0 0.022,0.003 0.033,0.004 0.014,0.001 0.028,0.001 0.042,0.004 0.01,0.002 0.02,0.007 0.03,0.01 0.014,0.004 0.028,0.007 0.042,0.013 0.01,0.005 0.019,0.011 0.028,0.017 0.013,0.007 0.027,0.013 0.039,0.022 0.008,0.005 0.014,0.013 0.021,0.018 0.014,0.012 0.027,0.023 0.04,0.036 0.005,0.006 0.009,0.014 0.014,0.02 0.013,0.016 0.026,0.031 0.037,0.05 0.008,0.012 0.013,0.028 0.02,0.042 0.006,0.014 0.014,0.027 0.019,0.042 0.008,0.023 0.013,0.048 0.019,0.074 0.002,0.009 0.005,0.017 0.007,0.026 0.005,0.036 0.009,0.075 0.009,0.116l-0.081 1.84z" className="colore2311d svgShape"></path></svg>
                          <span className="invalid_user_bank_name">{error.accountNumber}</span>
                        </div>
                      </span>
                    </div>
                  
                </>) : (<>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12}>
                          <Form.Label htmlFor='Fiat' className='required'>Fiat</Form.Label>
                          <div onClick={handleSelectFiat} className="form-control customSelect">
                            <span className="spanText">{selectedFiat ? selectedFiat.name : 'Select Fiat'}</span>
                          </div>
                          <span className="form-bottom-label text-success mt-2" style={{ display: error.bank ? 'block' : 'none' }}>
                            <div className="d-flex gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" imageRendering="optimizeQuality" shapeRendering="geometricPrecision" textRendering="geometricPrecision" version="1.0" viewBox="0 0 8.346 8.346" width="10" height="10"><rect width="8.346" height="8.346" fill="none"></rect><path fill="#e2311d" fillRule="nonzero" d="M8.28 6.905l-3.766 -5.9c-0.039,-0.061 -0.088,-0.108 -0.145,-0.139l-0.001 0c-0.056,-0.031 -0.122,-0.047 -0.195,-0.047 -0.073,0 -0.14,0.016 -0.195,0.047l-0.002 0c-0.056,0.031 -0.105,0.078 -0.144,0.139l-0.659 1.032 -3.107 4.868c-0.041,0.065 -0.064,0.135 -0.066,0.204 -0.002,0.069 0.015,0.14 0.053,0.208l0 0.001c0.036,0.067 0.087,0.119 0.147,0.155 0.059,0.035 0.129,0.054 0.207,0.054l2.575 0 4.957 0c0.078,0 0.148,-0.019 0.207,-0.054 0.06,-0.036 0.11,-0.088 0.147,-0.155l0 -0.001c0.037,-0.068 0.055,-0.139 0.053,-0.208 -0.003,-0.069 -0.025,-0.139 -0.066,-0.204zm-4.107 -0.299l0 0c-0.177,0 -0.32,-0.143 -0.32,-0.32 0,-0.177 0.143,-0.32 0.32,-0.32 0.177,0 0.32,0.143 0.32,0.32 0,0.177 -0.143,0.32 -0.32,0.32zm0.318 -1.309l0 0c-0.009,0.189 -0.153,0.286 -0.302,0.29 -0.003,0 -0.007,0 -0.01,0 -0.02,0 -0.039,-0.006 -0.058,-0.009 -0.017,-0.003 -0.033,-0.003 -0.049,-0.008 -0.021,-0.007 -0.04,-0.02 -0.059,-0.031 -0.013,-0.008 -0.028,-0.013 -0.04,-0.023 -0.02,-0.016 -0.034,-0.038 -0.049,-0.059 -0.007,-0.011 -0.018,-0.019 -0.024,-0.031 -0.018,-0.036 -0.03,-0.079 -0.032,-0.128l-0.094 -1.841c0,-0.041 0.003,-0.08 0.009,-0.116 0.004,-0.021 0.01,-0.04 0.015,-0.06 0.004,-0.013 0.006,-0.028 0.011,-0.041 0.006,-0.018 0.015,-0.033 0.023,-0.05 0.005,-0.011 0.01,-0.024 0.016,-0.034 0.008,-0.015 0.019,-0.026 0.028,-0.039 0.008,-0.01 0.014,-0.022 0.023,-0.031 0.011,-0.012 0.023,-0.021 0.035,-0.031 0.008,-0.008 0.016,-0.016 0.025,-0.023 0.014,-0.01 0.029,-0.017 0.043,-0.024 0.008,-0.005 0.016,-0.01 0.024,-0.014 0.014,-0.006 0.028,-0.009 0.042,-0.013 0.01,-0.003 0.02,-0.008 0.03,-0.01 0.011,-0.002 0.023,-0.002 0.034,-0.004 0.013,-0.001 0.027,-0.004 0.04,-0.004 0,0 0,0 0,0 0.011,0 0.022,0.003 0.033,0.004 0.014,0.001 0.028,0.001 0.042,0.004 0.01,0.002 0.02,0.007 0.03,0.01 0.014,0.004 0.028,0.007 0.042,0.013 0.01,0.005 0.019,0.011 0.028,0.017 0.013,0.007 0.027,0.013 0.039,0.022 0.008,0.005 0.014,0.013 0.021,0.018 0.014,0.012 0.027,0.023 0.04,0.036 0.005,0.006 0.009,0.014 0.014,0.02 0.013,0.016 0.026,0.031 0.037,0.05 0.008,0.012 0.013,0.028 0.02,0.042 0.006,0.014 0.014,0.027 0.019,0.042 0.008,0.023 0.013,0.048 0.019,0.074 0.002,0.009 0.005,0.017 0.007,0.026 0.005,0.036 0.009,0.075 0.009,0.116l-0.081 1.84z" className="colore2311d svgShape"></path></svg>
                              <span className="invalid_user_bank_name">{error.bank}</span>
                            </div>
                          </span>
                      </Grid>
                      <Grid item xs={12} md={12}>
                          <Form.Label htmlFor='banks' className='required'>Bank</Form.Label>
                          <div onClick={handleSelectClick} className="form-control customSelect">
                            <span className="spanText">{selectedBank ? selectedBank.name : 'Select Bank'}</span>
                          </div>
                          <span className="form-bottom-label text-success mt-2" style={{ display: error.bank ? 'block' : 'none' }}>
                            <div className="d-flex gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" imageRendering="optimizeQuality" shapeRendering="geometricPrecision" textRendering="geometricPrecision" version="1.0" viewBox="0 0 8.346 8.346" width="10" height="10"><rect width="8.346" height="8.346" fill="none"></rect><path fill="#e2311d" fillRule="nonzero" d="M8.28 6.905l-3.766 -5.9c-0.039,-0.061 -0.088,-0.108 -0.145,-0.139l-0.001 0c-0.056,-0.031 -0.122,-0.047 -0.195,-0.047 -0.073,0 -0.14,0.016 -0.195,0.047l-0.002 0c-0.056,0.031 -0.105,0.078 -0.144,0.139l-0.659 1.032 -3.107 4.868c-0.041,0.065 -0.064,0.135 -0.066,0.204 -0.002,0.069 0.015,0.14 0.053,0.208l0 0.001c0.036,0.067 0.087,0.119 0.147,0.155 0.059,0.035 0.129,0.054 0.207,0.054l2.575 0 4.957 0c0.078,0 0.148,-0.019 0.207,-0.054 0.06,-0.036 0.11,-0.088 0.147,-0.155l0 -0.001c0.037,-0.068 0.055,-0.139 0.053,-0.208 -0.003,-0.069 -0.025,-0.139 -0.066,-0.204zm-4.107 -0.299l0 0c-0.177,0 -0.32,-0.143 -0.32,-0.32 0,-0.177 0.143,-0.32 0.32,-0.32 0.177,0 0.32,0.143 0.32,0.32 0,0.177 -0.143,0.32 -0.32,0.32zm0.318 -1.309l0 0c-0.009,0.189 -0.153,0.286 -0.302,0.29 -0.003,0 -0.007,0 -0.01,0 -0.02,0 -0.039,-0.006 -0.058,-0.009 -0.017,-0.003 -0.033,-0.003 -0.049,-0.008 -0.021,-0.007 -0.04,-0.02 -0.059,-0.031 -0.013,-0.008 -0.028,-0.013 -0.04,-0.023 -0.02,-0.016 -0.034,-0.038 -0.049,-0.059 -0.007,-0.011 -0.018,-0.019 -0.024,-0.031 -0.018,-0.036 -0.03,-0.079 -0.032,-0.128l-0.094 -1.841c0,-0.041 0.003,-0.08 0.009,-0.116 0.004,-0.021 0.01,-0.04 0.015,-0.06 0.004,-0.013 0.006,-0.028 0.011,-0.041 0.006,-0.018 0.015,-0.033 0.023,-0.05 0.005,-0.011 0.01,-0.024 0.016,-0.034 0.008,-0.015 0.019,-0.026 0.028,-0.039 0.008,-0.01 0.014,-0.022 0.023,-0.031 0.011,-0.012 0.023,-0.021 0.035,-0.031 0.008,-0.008 0.016,-0.016 0.025,-0.023 0.014,-0.01 0.029,-0.017 0.043,-0.024 0.008,-0.005 0.016,-0.01 0.024,-0.014 0.014,-0.006 0.028,-0.009 0.042,-0.013 0.01,-0.003 0.02,-0.008 0.03,-0.01 0.011,-0.002 0.023,-0.002 0.034,-0.004 0.013,-0.001 0.027,-0.004 0.04,-0.004 0,0 0,0 0,0 0.011,0 0.022,0.003 0.033,0.004 0.014,0.001 0.028,0.001 0.042,0.004 0.01,0.002 0.02,0.007 0.03,0.01 0.014,0.004 0.028,0.007 0.042,0.013 0.01,0.005 0.019,0.011 0.028,0.017 0.013,0.007 0.027,0.013 0.039,0.022 0.008,0.005 0.014,0.013 0.021,0.018 0.014,0.012 0.027,0.023 0.04,0.036 0.005,0.006 0.009,0.014 0.014,0.02 0.013,0.016 0.026,0.031 0.037,0.05 0.008,0.012 0.013,0.028 0.02,0.042 0.006,0.014 0.014,0.027 0.019,0.042 0.008,0.023 0.013,0.048 0.019,0.074 0.002,0.009 0.005,0.017 0.007,0.026 0.005,0.036 0.009,0.075 0.009,0.116l-0.081 1.84z" className="colore2311d svgShape"></path></svg>
                              <span className="invalid_user_bank_name">{error.bank}</span>
                            </div>
                          </span>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <div className="form-group mt-2">
                          <Form.Label htmlFor='accountName' className='required'>Account Number</Form.Label>
                          <Form.Control type="text" placeholder="Enter account number" name="accountNumber" aria-label="secondary" value={formData.accountNumber} onChange={handleChange} style={{height:"50px"}} />
                        </div> 
                        <span className="form-bottom-label text-success" style={{ display: message.message ? 'block' : 'none' }}>
                          <div className="d-flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="10" height="10"><circle cx="32" cy="32" r="32" fill="#4aad60" className="color4aad60 svgShape"></circle><circle cx="32" cy="32" r="26.75" fill="#efefef" transform="rotate(-61.328 32 32)" className="colorefefef svgShape"></circle><path fill="#4aad60" d="M27.72 43.18c-.71 0-1.42-.27-1.97-.81l-8.24-8.24a2.77 2.77 0 0 1 0-3.93 2.77 2.77 0 0 1 3.93 0l6.27 6.27 14.83-14.83a2.77 2.77 0 0 1 3.93 0 2.77 2.77 0 0 1 0 3.93l-16.8 16.8c-.53.54-1.24.81-1.95.81z" className="color4aad60 svgShape"></path></svg>
                            <span className="success_user_bank_name">{message.message}</span>
                          </div>
                        </span>
                      </Grid>
                    </Grid>
                  
                    
                      {/* <Select options={options} onChange={handleBankChange}/> */}
                       
                     
                      <span className="form-bottom-label text-invalid-account"  style={{ display: error.accountNumber ? 'block' : 'none' }}>
                        <div className="d-flex gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" imageRendering="optimizeQuality" shapeRendering="geometricPrecision" textRendering="geometricPrecision" version="1.0" viewBox="0 0 8.346 8.346" width="10" height="10"><rect width="8.346" height="8.346" fill="none"></rect><path fill="#e2311d" fillRule="nonzero" d="M8.28 6.905l-3.766 -5.9c-0.039,-0.061 -0.088,-0.108 -0.145,-0.139l-0.001 0c-0.056,-0.031 -0.122,-0.047 -0.195,-0.047 -0.073,0 -0.14,0.016 -0.195,0.047l-0.002 0c-0.056,0.031 -0.105,0.078 -0.144,0.139l-0.659 1.032 -3.107 4.868c-0.041,0.065 -0.064,0.135 -0.066,0.204 -0.002,0.069 0.015,0.14 0.053,0.208l0 0.001c0.036,0.067 0.087,0.119 0.147,0.155 0.059,0.035 0.129,0.054 0.207,0.054l2.575 0 4.957 0c0.078,0 0.148,-0.019 0.207,-0.054 0.06,-0.036 0.11,-0.088 0.147,-0.155l0 -0.001c0.037,-0.068 0.055,-0.139 0.053,-0.208 -0.003,-0.069 -0.025,-0.139 -0.066,-0.204zm-4.107 -0.299l0 0c-0.177,0 -0.32,-0.143 -0.32,-0.32 0,-0.177 0.143,-0.32 0.32,-0.32 0.177,0 0.32,0.143 0.32,0.32 0,0.177 -0.143,0.32 -0.32,0.32zm0.318 -1.309l0 0c-0.009,0.189 -0.153,0.286 -0.302,0.29 -0.003,0 -0.007,0 -0.01,0 -0.02,0 -0.039,-0.006 -0.058,-0.009 -0.017,-0.003 -0.033,-0.003 -0.049,-0.008 -0.021,-0.007 -0.04,-0.02 -0.059,-0.031 -0.013,-0.008 -0.028,-0.013 -0.04,-0.023 -0.02,-0.016 -0.034,-0.038 -0.049,-0.059 -0.007,-0.011 -0.018,-0.019 -0.024,-0.031 -0.018,-0.036 -0.03,-0.079 -0.032,-0.128l-0.094 -1.841c0,-0.041 0.003,-0.08 0.009,-0.116 0.004,-0.021 0.01,-0.04 0.015,-0.06 0.004,-0.013 0.006,-0.028 0.011,-0.041 0.006,-0.018 0.015,-0.033 0.023,-0.05 0.005,-0.011 0.01,-0.024 0.016,-0.034 0.008,-0.015 0.019,-0.026 0.028,-0.039 0.008,-0.01 0.014,-0.022 0.023,-0.031 0.011,-0.012 0.023,-0.021 0.035,-0.031 0.008,-0.008 0.016,-0.016 0.025,-0.023 0.014,-0.01 0.029,-0.017 0.043,-0.024 0.008,-0.005 0.016,-0.01 0.024,-0.014 0.014,-0.006 0.028,-0.009 0.042,-0.013 0.01,-0.003 0.02,-0.008 0.03,-0.01 0.011,-0.002 0.023,-0.002 0.034,-0.004 0.013,-0.001 0.027,-0.004 0.04,-0.004 0,0 0,0 0,0 0.011,0 0.022,0.003 0.033,0.004 0.014,0.001 0.028,0.001 0.042,0.004 0.01,0.002 0.02,0.007 0.03,0.01 0.014,0.004 0.028,0.007 0.042,0.013 0.01,0.005 0.019,0.011 0.028,0.017 0.013,0.007 0.027,0.013 0.039,0.022 0.008,0.005 0.014,0.013 0.021,0.018 0.014,0.012 0.027,0.023 0.04,0.036 0.005,0.006 0.009,0.014 0.014,0.02 0.013,0.016 0.026,0.031 0.037,0.05 0.008,0.012 0.013,0.028 0.02,0.042 0.006,0.014 0.014,0.027 0.019,0.042 0.008,0.023 0.013,0.048 0.019,0.074 0.002,0.009 0.005,0.017 0.007,0.026 0.005,0.036 0.009,0.075 0.009,0.116l-0.081 1.84z" className="colore2311d svgShape"></path></svg>
                          <span className="invalid_user_bank_name">{error.accountNumber}</span>
                        </div>
                      </span>
                </>)}
                    {!verify ? (<>
                      <Button type='submit' onClick={handleSubmitForm} className="custom-btn w-100 mt-4 mb-4 search_bank_details">
                        Search
                      </Button>
                </>) : (<>
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-6">
                          {accountExist ? (<>
                            <Button variant='warning' type='submit' onClick={handlePreviousPage} className="btn-default w-100 mt-4 mb-4 pull-left">
                              Go back to deposit 
                          </Button>
                          </>) : (<>
                            <Button variant='' type='submit' onClick={handleCancelBankCreation} className="btn-default w-100 mt-4 mb-4 pull-left" style={{background:'#ccc', color:'#fff', border:'1px solid #ccc'}}>
                            Cancel 
                          </Button>
                          </>)}
                          
                        </div>
                        <div className="col-md-6">
                          <Button type='submit' onClick={handleAddBank} className="custom-btn w-100 mt-4 mb-4 pull-left add_new_bank_to_list">
                            Add Bank Account
                          </Button>
                        </div>
                      </div>
                    </div>
                        
                    </>)
                    }
                     
                  
              </form>
               {/* Lazy-loaded FiatModal */}
     
                </div>
          </div>
          
        </div>
        
    </div>
       
    </>
  )
}

export default AddBank