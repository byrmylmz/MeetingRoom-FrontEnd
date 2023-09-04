import React, {useEffect, useState} from 'react';
import {Button} from "@chakra-ui/react";
import {CalendarIcon} from '@chakra-ui/icons'
import {useGetAllAzureQuery} from "../../services/calendarApi";

const Integration = () => {

    const {data,isSuccess}= useGetAllAzureQuery();
    console.log(data)

    const [state, setState] = useState()
    const [code, setCode] = useState()

    console.log(window.location.search)

    useEffect(()=> {
        if(window.location.search){
            let params:any = window.location.search.substring(1).split('&').reduce(function (result:any, item) {
                let parts = item.split('=');
                result[parts[0]] = parts[1];
                return result;
            }, {});
            setCode(params['code']);
            setState(params['state']);
        }
    },[])

    return (
        <div>
            <a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize?
                    client_id=469e5942-bf76-44f3-8c77-272988660c36
                    &response_type=code
                    &redirect_uri=http://localhost:3000/integration
                    &response_mode=query
                    &scope=openid%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2Fcalendars.read
                    &state=12345"  rel="noopener noreferrer">
                <Button leftIcon={<CalendarIcon/>} colorScheme='blue'>Calendar Integration</Button>
            </a>
            <p><b>Code From URL:</b> {code}</p>
            <p><b>State From URL:</b> {state}</p>
            <p><b>Access Token Return From Backend:</b> {isSuccess && data.response} </p>
        </div>
    );
};

export default Integration;
