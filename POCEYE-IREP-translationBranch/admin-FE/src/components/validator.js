
import React, { useEffect, useState } from 'react';

function numberOnly(e){
    e.target.value = e.target.value.replace(/[^\0-9]/ig, "");
}

function ClearValidator(groupName){
    //fetch validation state from sessionstorage for the group
    const sessionKeys = Object.keys(sessionStorage);
    const groupValidatorKeys = sessionKeys.filter(s=> s.startsWith(`validator_${groupName}`));
    
    for(let dataKey of groupValidatorKeys){
        sessionStorage.removeItem(dataKey);
    }
    
}

function ValidateGroup(groupName){
    //fetch validation state from sessionstorage for the group
    const sessionKeys = Object.keys(sessionStorage);
    const groupValidatorKeys = sessionKeys.filter(s=> s.startsWith(`validator_${groupName}`));
    if(groupValidatorKeys.length <=0) return false;
    let validated = true;
    for(let dataKey of groupValidatorKeys){
        const savedState = JSON.parse(sessionStorage.getItem(dataKey));
        validated = validated && savedState.isValid;
    }
    
    return validated;
    
}

 function Validator({data, dataType, errorMessage, groupName, dataKey}) {
 
    //define validation functions accessed using dataType argument
    const validators = {
        email: (d)=>{
            setErrorMessage("Supply valid email");
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(d).toLowerCase());
        },
        number: (str)=>{
            setErrorMessage("Numeric value expected");
            if (str && (typeof str != "string")){
                str = str.toString();
            }
            if(!str && str != 0) return false;
            return !isNaN(str) && !isNaN(parseFloat(str));
        }
        
    }

    if(groupName && !dataKey){
        throw new Error("dataKey is required for group validators");
    }
    const [_errorMessage, setErrorMessage] = useState(null);
    const [isValid, setIsValid] = useState(true);

    useEffect(()=>{
       
        let _isValid = false;
        if(!dataType || !validators[dataType]){
            //validate data passed using default validation (not empty)
            if(data){
                _isValid = true;
            }else{
                _isValid = false;
            }
            
        }else{
            //validate data passed using validator
            _isValid = validators[dataType](data);
        }
        setIsValid(_isValid);
        //save validation state to session storage
        if(groupName && dataKey){
            sessionStorage.setItem(`validator_${groupName}_${dataKey}`, JSON.stringify({isValid: _isValid}));
        }
        
        

    }, [data]);
   

   
//render validation prompt based on validation result
    return !isValid && <span  className="invalid">{errorMessage || _errorMessage || "Invalid data in field"}</span>
}

export  {Validator, ValidateGroup, numberOnly, ClearValidator}