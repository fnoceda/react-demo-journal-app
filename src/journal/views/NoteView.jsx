import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material' 
import React from 'react'
import { ImageGallery } from '../components'

export const NoteView = () => {
  return (
    <Grid container 
    direction='row' 
    justifyContent='space-between' 
    alignItems='center' 
    sx={ { mb:1 } }
    className="animate__animated animate__fadeIn animate__faster">
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>
                28 de agosto, 2024
            </Typography>
        </Grid>
        <Grid item>
            <Button color='primary' sx={{ padding: 2 }}>
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
            />
        </Grid>

        {/* Gallery */}
        <ImageGallery />

    </Grid>
  )
}
