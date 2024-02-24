import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';  
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import "./todo.css"
import { MyContext } from '../contexts/todocontext';
import { useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useState } from 'react';
import TextField from '@mui/material/TextField';



export default function Todo ({todo}) {
    const [dialogdelete,setdialogdelete]=useState(false)
    const [dialogedit,setdialogedite]=useState(false)
    const {todos,settodos}=useContext(MyContext)
    const [editform,seteditform]=useState({title:"",details:""})

    function handelcheck (id) {
        const neww=todos.map((el)=>{
            if(el.id===id) {
                const com=!el.completed
                return ({...el,completed:com})
            } else {
                return el
            }
        })
        settodos(neww)
    }
    function handeldelete() {
        setdialogdelete(true)
    }
    function yesdelete(id) {
        const neww=todos.filter((el)=>{
            return (
                el.id!==id
            )
        })
        settodos(neww)
        localStorage.setItem("todo",JSON.stringify(neww))
    }
    function nodelete() {
        setdialogdelete(false)
    }
    function handeldeleteclose () {
        setdialogdelete(false)
    }
    function handleditClose () {
        setdialogedite(false)
    }
    function handeledit() {
        setdialogedite(true)
    }
    function noedit() {
        setdialogedite(false)
    }
    function yesedit(id) {
        const neww=todos.map((todo)=>{
            if(todo.id===id) {
                return ({...todo,title:editform.title,details:editform.details})
            }else {
                return todo
            }
        })
        setdialogedite(false)
        settodos(neww)
        localStorage.setItem("todo",JSON.stringify(neww))
    }
    return (
        <>
            <Dialog
            open={dialogedit}
            onClose={handleditClose}
            >
            <DialogTitle>تعديل المهمة</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="email"
                label="تعديل العنوان"
                type="email"
                value={editform.title}
                onChange={(e)=>{seteditform({...editform,title:e.target.value})}}
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="email"
                value={editform.details}
                onChange={(e)=>{seteditform({...editform,details:e.target.value})}}
                label="تعديل التفاصيل"
                type="email"
                fullWidth
                variant="standard"
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>{yesedit(todo.id)}}>تاكيد</Button>
            <Button type="submit" onClick={noedit}>الغاء التعديل</Button>
            </DialogActions>
        </Dialog>
            <Dialog
                open={dialogdelete}
                onClose={handeldeleteclose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"هل انت متاكد من رغبتك بحذف المهمة؟"}
                </DialogTitle>
                <DialogContent>
                
                <DialogContentText id="alert-dialog-description">
                    اذا قمت بالحذف لا يمكنك التراجع
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={nodelete}>تراجع</Button>
                <Button  autoFocus onClick={()=>{yesdelete(todo.id)}}>
                    نعم,حذف
                </Button>
                </DialogActions>
            </Dialog>
            <Card className='card' sx={{ minWidth: 275 }} style={{borderLine:"none",marginBottom:"20px",backgroundColor:"#283593",color:"white"}}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography variant='h5'>
                                {todo.title}
                            </Typography>
                            <Typography variant='h6'>
                                {todo.details}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                            <IconButton onClick={()=>{handelcheck(todo.id)}} aria-label="delete" className='icon' style={{color:todo.completed?"white":"green",borderRadius:"50%",backgroundColor:todo.completed?"green":"white",border:"green 3px solid"}}>
                                <CheckIcon />
                            </IconButton> 
                            <IconButton onClick={handeledit} aria-label="delete" className='icon' style={{color:"#283593",borderRadius:"50%",backgroundColor:"white",border:"#283593 3px solid"}}>
                                <EditIcon />
                            </IconButton> 
                            <IconButton onClick={()=>{handeldelete(todo.id)}} aria-label="delete" className='icon' style={{color:"red",borderRadius:"50%",backgroundColor:"white",border:"red 3px solid"}}>
                                <DeleteIcon />
                            </IconButton> 
                        </Grid>
                    </Grid>
                </CardContent>  
            </Card>
        </>
    )
}