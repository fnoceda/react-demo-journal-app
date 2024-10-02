export const emptyNote = { id: '123', title: '',  body: '', date: 1234567, imageUrls: []};
export const filledNote = { id: '124', title: 'this its a title',  body: 'this is the body', date: 1234567, imageUrls: []};

export const initialState = {
    isSaving: false,
    messageSaved: '',
    active: null,
    notes: [],
    imageUrls: []
};

export const savingNewNoteState = {
    isSaving: true,
    messageSaved: '',
    active: null,
    notes: [],
    imageUrls: []
};

export const addNewEmptyNoteState = {
    isSaving: false,
    messageSaved: '',
    active: null,
    notes: [emptyNote],
    imageUrls: []
};

export const setActiveNoteState = {
    isSaving: false,
    messageSaved: '',
    active: emptyNote,
    notes: [],
    imageUrls: []
}

export const setNotesState = {
    isSaving: false,
    messageSaved: '',
    active: null,
    notes: [ emptyNote, filledNote ],
    imageUrls: []
};

export const setSavingState = {
    isSaving: true,
    messageSaved: '',
    active: null,
    notes: [],
    imageUrls: []
};

export const updateNoteState = {
    isSaving: true,
    messageSaved: '',
    active: emptyNote,
    notes: [ emptyNote, filledNote ],
    imageUrls: []
};

export const deleteNoteByIdState = {
    active: null, 
    messageSaved: '',
    notes: [ emptyNote ],
    imageUrls: []

};

export const setPhotosToActiveNoteStatus = {
    isSaving: false, 
    messageSaved: '',
    active: { id: '124', title: '',  body: '', date: 1234567, imageUrls: ['https://demo.jpg']},
    notes: [ emptyNote, filledNote ],
    imageUrls: []

};

export const clearNotesLogoutState = {
    isSaving : false, 
    messageSaved: '', 
    notes: [], 
    active: null, 
    imageUrls: []
}