import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux'
import { logout, login } from '../store/auth';
import { FirebaseAuth } from '../firebase/config';
import { startLodingNotes } from '../store/journal/thunks';

export const useCheckAuth = () => {
  
    
    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();
   
   
    useEffect(() => {
       onAuthStateChanged( FirebaseAuth, async( user ) => {
   
         if(!user) return dispatch( logout() );
   
         const { uid, email, displayName, photoURL } = user;
         dispatch( login({ uid, email, displayName, photoURL }) );
         dispatch( startLodingNotes() ); 
       } )
     
     
     }, [])

     return { status };

}
