import { doc, setDoc, collection } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from './journalSlice';
import { loadNotes } from '../../helpers';





export const startSavingNote = () => {
    return async(dispatch, getState) => {


        dispatch(setSaving());

        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');
        const { active:note } = getState().journal;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFirestore, {merge: true});


        dispatch( updateNote(note) );



    }
}



export const startAddNewNote = () => {

    return async( dispatch, getState ) => {
        console.log('Start new note');
        

        dispatch( savingNewNote() );

        const { uid } = getState().auth;

        const newNote = {
            title: '', 
            body: '', 
            date: new Date().getTime(), 
        };

        const newDoc = doc( collection(FirebaseDB, `${uid}/journal/notes` ) );
        const setDocResp = await setDoc(newDoc, newNote);
        newNote.id = newDoc.id;
        
        dispatch( addNewEmptyNote(newNote) );
        dispatch( setActiveNote(newNote) );

        // dispatch( addNewNote(newNote) );


    }

}


export const startLodingNotes = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}



