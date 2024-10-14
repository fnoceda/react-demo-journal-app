import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "../../../src/auth/pages";
import { Provider, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../../src/store/auth";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../../src/store/auth/thunks";

import { MemoryRouter } from "react-router-dom";
import { notAuthenticatedState } from "../../fixtures/authFixtures";


const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn, 
    startLoginWithEmailPassword: ({email, password}) => {
        return () => mockStartLoginWithEmailPassword({email, password});
    }, 
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'), 
    useDispatch: () => (fn) => fn(), 
}));



const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }, 
    preloadedState: {
        auth: notAuthenticatedState
    }
});


describe('Tests on <LoginPage>', () => { 

    beforeEach(() => jest.clearAllMocks());


    test('should to show the component properly', () => { 
        render(
            <Provider store={ store }>
                    <MemoryRouter>
                        <LoginPage />
                    </MemoryRouter>
                </Provider>
        );
        // screen.debug();
        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);
     });

     test('should to call startGoogleSignIn', () => { 
        render(
            <Provider store={ store }>
                    <MemoryRouter>
                        <LoginPage />
                    </MemoryRouter>
                </Provider>
        );
        // console.log(store.getState());
        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click(googleBtn);
        // console.log(store.getState());
        expect(mockStartGoogleSignIn).toHaveBeenCalled();
      });

      test('Submit should call starLoginWithEmailPassword', () => { 

        const email = 'fnoceda@gmail.com';
        const password = '123456';


        render(
            <Provider store={ store }>
                    <MemoryRouter>
                        <LoginPage />
                    </MemoryRouter>
                </Provider>
        );

        const emailField = screen.getByRole('textbox', {name: 'Correo'});
        fireEvent.change(emailField, { target: { name: 'email', value: email } });
        // screen.debug();
        const passwordField = screen.getByTestId('password');
        fireEvent.change(passwordField, { target: { name: 'password', value: password } });

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit( loginForm );


        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({
            email: email, 
            password: password
        });


       });

 }) 