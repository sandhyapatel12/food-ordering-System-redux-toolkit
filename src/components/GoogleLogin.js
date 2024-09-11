import React, { useEffect } from 'react';
import auth0 from 'auth0-js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserApi, saveUserData, loginUser } from '../slices/clientSlice/authSlice';

const webAuth = new auth0.WebAuth({
    domain: 'dev-r8pctvhfuf7h3kaa.us.auth0.com',  // Replace with your Auth0 domain
    clientID: 'l60rxmPsyKbcQCVgD2vdgfgzICe0GHjO',  // Replace with your Auth0 clientID
    redirectUri: window.location.origin,           //define our location  port on which our website running('http://localhost:3000')
    responseType: 'token id_token',
    scope: 'openid profile email',
});

const GoogleLogin = () => {

    const dispatch = useDispatch();

    const { isAuthenticated, alreadyLoggedIn } = useSelector((state) => state.auth);

    const userInfo = useSelector((state) => state.auth.user);
    // console.log("google userInfo......", userInfo);
    

    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        if (isAuthenticated) {
            alert('You are already logged in.');
            navigate('/home');
            return;
        }

        webAuth.authorize({
            connection: 'google-oauth2',
        });
    };

    useEffect(() => {
        webAuth.parseHash(async (err, authResult) => {
            if (authResult && authResult.idToken) {
                const profile = authResult.idTokenPayload;
                const { email, name, picture } = profile;
                const password = 'defaultPassword'; // You can add logic to generate or request password.

                // Check if the user already exists
                const existingUser = await getUserApi(email);
                if (existingUser?.length > 0) {
                    alert('You are already logged in.');
                    dispatch(loginUser(existingUser[0]));
                    navigate('/home');
                    return;
                }

                // Save user data to the fake API and dispatch loginUser
                const userData = await saveUserData({ email, name, picture, password });
                dispatch(loginUser(userData));
                navigate('/home');
            }
        });
    }, [dispatch, navigate]);

    return (
        <>
            {/* //--------login with google button-------------------------- */}

         {   <button
                type='submit'
                className='flex w-full items-center justify-center bg-gray-300 mt-3 rounded-full text-black font-bold py-2 hover:bg-gray-400'
                onClick={handleGoogleLogin}
            >

                <img
                    className='h-8 w-16'
                    src='google-icon.png' />

                <h1>Continue with Google</h1>

            </button>}
        </>
    );
};

export default GoogleLogin;
