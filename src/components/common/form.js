import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from "./button";
import {CardContent, CardActions, Fab} from "@mui/material";
import {Link} from "react-router-dom";

export default function BasicTextFields({title, setPassword, setEmail, handleAction, googleHandleAction}) {
    return (
        <Box sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "primary.dark"
        }}>
            <Card>
                <CardContent>
                    <div className="heading-container">
                        <h3>
                            {title} Form
                        </h3>
                    </div>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                    >
                        <TextField margin="dense" fullWidth id="outlined-basic" label="Enter the Email"
                                   variant="outlined"
                                   onChange={(e) => setEmail(e.target.value)}/>
                        <TextField margin="dense" fullWidth id="password" label="Enter the Password" variant="outlined"
                                   onChange={(e) => setPassword(e.target.value)}/>
                    </Box>
                </CardContent>
                <CardActions sx={{position: "relative"}}>
                    <Button title={title} handleAction={handleAction}/>
                    {title === 'Login' && <Button title="Login with Google" handleAction={googleHandleAction}/>}
                    <Link to={title === 'Login' ? '/register' : '/login'}>
                        <Fab variant="extended" sx={{position: "absolute", right: "8px", bottom: "8px"}}
                             color="secondary" aria-label="add">
                            {title === 'Login' ? 'Sing Up' : 'Log In'}
                        </Fab>
                    </Link>
                </CardActions>
            </Card>
        </Box>
    );
}
