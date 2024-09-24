import { createSlice } from '@reduxjs/toolkit';

   export const journalSlice = createSlice({
      name: 'journal',
      initialState: {
          isSaving: false, 
          messageSaved: '', 
          active: null, 
          notes: [], 

        //   active: {
        //     id: 'ABC123', 
        //     title: '', 
        //     body: '', 
        //     date: 1234567, 
        //     imageUrls: []
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
            console.log(action.payload);
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
               }
               return note;
            });
            state.messageSaved = `${action.payload.title}, actualizada correctamente`;
         },
         deleteNoteById: (state, action) => {}, 
      }
   });


export const { 
                savingNewNote, 
                addNewEmptyNote, 
                setActiveNote, 
                setNotes, 
                setSaving, 
                updateNote, 
                deleteNoteById 
             } = journalSlice.actions;