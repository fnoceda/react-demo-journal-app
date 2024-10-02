import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');

const dispatch = jest.fn();

beforeEach(() => jest.clearAllMocks());

describe('Tests on Auth.Thunks', () => { 
    test('should call checkingCredentials', async() => { 
        const result = await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );

     });

     test('should call to checkingCredentials and login', async() => { 
        const loginData = {ok: true, ...demoUser};
        await signInWithGoogle.mockResolvedValue(loginData);
        //thunk
        await startGoogleSignIn()(dispatch);
        expect( dispatch ).toHaveBeenCalledWith(  checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith(  login( loginData ) );
      });

      test('should call to checkingCredentials and logout (error case)', async() => { 
        const loginData = {ok: false, errorMessage: 'Intentional error'};
        await signInWithGoogle.mockResolvedValue(loginData);
        //thunk
        await startGoogleSignIn()(dispatch);
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData ) );
      });

      test('startLoginWithEmailPassword should call to checkingCredentials and login', async() => { 
        const loginData = {ok: true, ...demoUser};
        const formData = {email: demoUser.email, password: '123456'};

        await loginWithEmailPassword.mockResolvedValue(loginData);
        await startLoginWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
       });

       test('startLoginWithEmailPassword should call to checkingCredentials and logout', async() => { 
        const loginData = {ok: false, errorMessage: 'Intentional error'};
        const formData = {email: demoUser.email, password: 'lala'};

        await loginWithEmailPassword.mockResolvedValue(loginData);
        await startLoginWithEmailPassword(formData)(dispatch);
        
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData ) );
       });

       test('should call logoutFirebase, clearNotes and logout', async() => { 
            await startLogout()(dispatch);

            expect(logoutFirebase).toHaveBeenCalled();
            expect(dispatch).toHaveBeenCalledWith( clearNotesLogout() );
            expect(dispatch).toHaveBeenCalledWith( logout() );

        });

        test('startCreatingUserWithEmailPassword should call to checkingCredentials and login', async() => { 
            const loginData = {ok: true, ...demoUser};
            const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName };

            await registerUserWithEmailPassword.mockResolvedValue(loginData);
            await startCreatingUserWithEmailPassword(formData)(dispatch);

            expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
            expect( dispatch ).toHaveBeenCalledWith( login( demoUser ) );

         });


         test('startCreatingUserWithEmailPassword should call to checkingCredentials and logout', async() => { 
            const loginData = {ok: false, errorMessage: 'Intentional error'};
            const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName };

            await registerUserWithEmailPassword.mockResolvedValue(loginData);
            await startCreatingUserWithEmailPassword(formData)(dispatch);

            expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
            expect( dispatch ).toHaveBeenCalledWith( logout( { errorMessage: 'Intentional error' } ) );

         });

 })