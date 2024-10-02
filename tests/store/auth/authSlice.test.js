import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Tests on authSlice', () => { 

    test('should return initial state', () => { 
        expect( authSlice.name ).toBe('auth');
        const state = authSlice.reducer(initialState, {});
        expect(state).toEqual(initialState);
     })

     test('Should call login', () => { 
        const state = authSlice.reducer(initialState, login( demoUser ));
        expect( state ).toEqual({
            status: 'authenticated', // checking, not-authenticated, authenticated
            uid: demoUser.uid, 
            email: demoUser.email, 
            displayName: demoUser.displayName, 
            photoURL: demoUser.photoURL,
            errorMessage: null,
        });
      })


      test('Should call logout and show and error', () => { 
        const error = 'Invalid credentials';
        const state = authSlice.reducer(authenticatedState, logout( {errorMessage: error} ));
        expect( state ).toEqual({
            status: 'not-authenticated', // checking, not-authenticated, authenticated
            uid: null, 
            email: null, 
            displayName: null, 
            photoURL: null,
            errorMessage: error,
        });
      })

      test('Should call logout without error', () => { 
        const state = authSlice.reducer(authenticatedState, logout( ));
        expect( state ).toEqual({
            status: 'not-authenticated', // checking, not-authenticated, authenticated
            uid: null, 
            email: null, 
            displayName: null, 
            photoURL: null,
            errorMessage: undefined,
        });
      })

      test('Should call checkingCredentials', () => { 
        const state = authSlice.reducer(authenticatedState, checkingCredentials( ));
        console.log(state)
        expect( state.status ).toBe('checking');
      })


 })
