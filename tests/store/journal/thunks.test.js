import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { addNewEmptyNote, savingNewNote, setActiveNote, startAddNewNote } from "../../../src/store/journal";
import { emptyNote } from "../../fixtures/journalFixtures";
import { FirebaseDB } from "../../../src/firebase/config";

describe('Tests on jounal/thunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();
    const testUid = 'TEST-UID';
    beforeEach(() => jest.clearAllMocks());



    test('should create a new empty note', async () => {
        getState.mockReturnValue({ auth: { uid: testUid } });
        await startAddNewNote()(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            title: '',
            body: '',
            id: expect.any(String),
            date: expect.any(Number),
            imageUrls: [],
        }));
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            title: '',
            body: '',
            id: expect.any(String),
            date: expect.any(Number),
            imageUrls: [],
        }));
        //Remove from firebase
        const collectionRef = collection(FirebaseDB, `${testUid}/journal/notes`);
        const docs = await getDocs(collectionRef);
        const deletePromises = [];
        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) );
        await Promise.all( deletePromises );

    }, 20000);
})