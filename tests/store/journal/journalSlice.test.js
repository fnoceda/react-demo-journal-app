import { journalSlice, savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, setPhotosToActiveNote, clearNotesLogout } from "../../../src/store/journal";
import {
    initialState, savingNewNoteState, addNewEmptyNoteState, emptyNote, filledNote, setActiveNoteState,
    setNotesState, setSavingState, updateNoteState,
    clearNotesLogoutState, 
} from "../../fixtures/journalFixtures";

describe('Tests on journalSlice', () => {

    test('should return the initial state', () => {
        expect(journalSlice.name).toBe('journal');
        const state = journalSlice.reducer(initialState, {});
        expect(state).toEqual(initialState);

    });

    test('should call savingNewNote', () => {
        const state = journalSlice.reducer(savingNewNoteState, savingNewNote());
        expect(state).toEqual(savingNewNoteState);
    });

    test('should call addNewEmptyNote', () => {
        const state = journalSlice.reducer(initialState, addNewEmptyNote(emptyNote));
        expect(state).toEqual(addNewEmptyNoteState);
    });

    test('should call setActiveNote', () => {
        const state = journalSlice.reducer(initialState, setActiveNote(emptyNote));
        expect(state).toEqual(setActiveNoteState);

    });

    test('should call setNotes', () => {
        const state = journalSlice.reducer(initialState, setNotes([emptyNote, filledNote]));
        expect(state).toEqual(setNotesState);
    });

    test('should call setSaving', () => {
        const state = journalSlice.reducer(initialState, setSaving());
        expect(state).toEqual(setSavingState);
    });

    test('should call updateNote', () => {
        const state = journalSlice.reducer(updateNoteState, updateNote({ id: '123', title: 'lala', body: '', imageUrls: [] }));
        expect(state.notes[0].title).toBe('lala');
    });

    test('should deleteNoteById', () => { 
        const state = journalSlice.reducer(updateNoteState, deleteNoteById('123') );
        expect(state.notes.length).toBe(1);
     }); 

     
     test('should deleteNoteById', () => { 
        const state = journalSlice.reducer(updateNoteState, setPhotosToActiveNote(['https://lala.jpg', 'https://lala.jpg']) );
        expect(state.active.imageUrls.length).toBe(2);
     }); 


     test('should call clearNotesLogout', () => { 
        const state = journalSlice.reducer(updateNoteState, clearNotesLogout() );
        expect(state).toEqual(clearNotesLogoutState);

      })




})