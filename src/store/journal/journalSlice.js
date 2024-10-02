import { createSlice } from '@reduxjs/toolkit';

   export const journalSlice = createSlice({
      name: 'journal',
      initialState: {
          isSaving: false, 
          messageSaved: '', 
          active: null, 
          notes: [], 
          imageUrls: []

        //   active: {
        //     id: 'ABC123', 
        //     title: '', 
        //     body: '', 
        //     date: 1234567, 
        //   }, 
      },
      reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        }, 
         addNewEmptyNote: (state, action  ) => { 
            state.notes.push( action.payload );
            state.isSaving = false;
            state.messageSaved = '';
         },
         setActiveNote: (state, action  ) => { 
            state.active = action.payload;
            state.messageSaved = '';
         },
         setNotes: (state, action  ) => { 
            state.notes = action.payload;
         },
         setSaving: (state  ) => { 
            state.isSaving = true;
            state.messageSaved = '';
         },
         updateNote: (state, action  ) => { 
            
            state.isSaving = false;
            state.notes = state.notes.map(note => {
               if(note.id == action.payload.id){
                  note.title = action.payload.title;
                  note.body = action.payload.body;
                  note.imageUrls = action.payload.imageUrls;

               }
               return note;
            });
            state.messageSaved = `${action.payload.title}, actualizada correctamente`;

         },
         deleteNoteById: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter((obj) => obj.id != action.payload);
         }, 
         setPhotosToActiveNote: (state, action) => {
            state.isSaving = false;
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
         }, 
         clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
         }
      }
   });


export const { 
                addNewEmptyNote, 
                clearNotesLogout, 
                deleteNoteById, 
                savingNewNote, 
                setActiveNote, 
                setNotes, 
                setPhotosToActiveNote, 
                setSaving, 
                updateNote, 
             } = journalSlice.actions;