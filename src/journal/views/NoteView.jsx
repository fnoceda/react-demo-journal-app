import { useEffect, useMemo, useRef } from 'react'

import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material' 
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

import { ImageGallery } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from '../../store/journal'

export const NoteView = () => {


    const dispatch = useDispatch();
    const { active:note, isSaving, messageSaved } = useSelector(state => state.journal);
    const { date, title, body, onInputChange, formState } = useForm(note);

    const dateString = useMemo(()=>{
        const newDate = new Date(date).toUTCString();
        return newDate;
    }, [date]);


    useEffect(() => {
       if(messageSaved.length > 0){
            Swal.fire('Nota actualizada', messageSaved, 'success');
       }
    }, [messageSaved])
    

    useEffect(() => {
        dispatch( setActiveNote(formState) )
    }, [formState])


    const fileInputRef = useRef();



    const onSaveNote = () => {
        dispatch( startSavingNote() );
    }

    const onFileInputChange = ({target}) => {
        if(target.files === 0) return;
        dispatch( startUploadingFiles( target.files ) );
    };

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

  return (
    <Grid container 
    direction='row' 
    justifyContent='space-between' 
    alignItems='center' 
    sx={ { mb:1 } }
    className="animate__animated animate__fadeIn animate__faster">
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>
                { dateString }
            </Typography>
        </Grid>
        <Grid item>


            <input 
                type="file" 
                multiple
                onChange={ onFileInputChange }
                style={{ display:'none' }}
                ref={ fileInputRef }
            />

            <IconButton
                color='primary'
                disabled={isSaving}
                onClick={ () => fileInputRef.current.click() }
            >
                <UploadOutlined />
            </IconButton>


            <Button 
            onClick={ onSaveNote }
            disabled={ isSaving  }
            color='primary' sx={{ padding: 2 }}>
                <SaveOutlined sx={ { fontSize:30, mr:1 } } />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type='text'
                variant='filled'
                fullWidth
                placeholder='Ingrese un título'
                label="Titulo"
                sx={ { border: "none", mb:1 } }
                name='title'
                value={ title }
                onChange={ onInputChange }
            />
            <TextField 
                type='text'
                variant='filled'
                fullWidth
                multiline
                minRows={ 5 }
                placeholder='Qué sucedió el día de hoy?'
                // label="Titulo"
                sx={ { border: "none", mb:1 } }
                name='body'
                value={ body }
                onChange={ onInputChange }
            />
        </Grid>

        <Grid container justifyContent='end'>
            <Button onClick={ onDelete } color='error'>
                Borrar
                <DeleteOutline  sx={ { fontSize: 20, mr: 1 } } />
            </Button>
        </Grid>

        {/* Gallery */}
        <ImageGallery images ={ note.imageUrls } />

    </Grid>
  )
}
