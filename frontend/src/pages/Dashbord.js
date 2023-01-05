
import React from 'react'
import {Button, Stack, TextareaAutosize} from "@mui/material"

const Dashbord = ()=>{
    return(
        <div>
            
                <TextareaAutosize aria-label='caixa de texto vazia' placeholder='Como foi a sua experiencia hoje?' minRows={5} />
               
                <Button type="submit"> </Button>
            
        </div>
    )
}

export default Dashbord