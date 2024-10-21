import React, { useState, useEffect } from 'react';
import { useUser } from "../../contexts/user-context";
import Navbar from "../../components/navbar";
import Spinner from '../../components/elements/spinner';

const IntersummitSummary = () =>{
    const { profileData, isLoggedIn, loading } = useUser();

    const [ isLoading, setIsLoading ] = useState(false);
};

export default IntersummitSummary;