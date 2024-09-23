import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"
import { AddOutlined } from "@mui/icons-material"
 
export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography variant=''>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam fugit at eos quis quas quo dolorum beatae, fugiat rem ex corrupti repellat necessitatibus et? Velit possimus doloremque illum quam veniam!
      </Typography> */}

      <NothingSelectedView />

      <NoteView />
    
        <IconButton
          size="large"
          sx={{ 
            color: 'white', 
            backgroundColor: 'error.main', 
            ':hover': { backgroundColor: 'error.main', opacity: 0.6 },
            position: 'fixed',
            right:50, 
            bottom: 50,
          }}
        >
          <AddOutlined sx={{ fontSize:30 }} />
        </IconButton>


    </JournalLayout>
  )
}
