import { doc, setDoc, collection, deleteDoc} from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote, } from './journalSlice';
import { fileUpload, loadNotes } from '../../helpers';

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe');
        const { active: note } = getState().journal;
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);
        dispatch(deleteNoteById(note.id));
    };
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch, getState) => {
        if (files.length === 0) throw new Error('El arreglo de archivos esta vacio!');
        dispatch(setSaving());

        // const url = await fileUpload( files[0] )
        // console.log(url)

        const fileUploadPromises = [];

        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }

        const photosUrl = await Promise.all(fileUploadPromises);

        dispatch(setPhotosToActiveNote(photosUrl));


    };
}


export const startSavingNote = () => {
    return async (dispatch, getState) => {


        dispatch(setSaving());

        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe');
        const { active: note } = getState().journal;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFirestore, { merge: true });

        dispatch(updateNote(note));



    }
}



export const startAddNewNote = () => {

    return async (dispatch, getState) => {
        console.log('Start new note');


        dispatch(savingNewNote());

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: [], 
        };

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        const setDocResp = await setDoc(newDoc, newNote);
        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));

        // dispatch( addNewNote(newNote) );


    }

}


export const startLodingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe');
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}



