import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'
import { Divider } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Todo from './todo';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { MyContext } from '../contexts/todocontext';
import { useContext } from 'react';
import { useEffect,useMemo } from 'react';


let next=4;
export default function Todolist() {
    const [newadd,setnewadd]=useState("")
    const {todos,settodos}=useContext(MyContext)
    const [typebutton,settypebutton]=useState("all")

    const mongaz=useMemo(()=>{
        return todos.filter((el)=>{
            return (el.completed===true)
        })
    },[todos])
    
    
    const ghermongaz=useMemo(()=>{
        return todos.filter((el)=>{
            return (el.completed!==true)
        })
    },[todos])
    
    
    
    let todostoberender=todos

    if(typebutton==="comp") {
        todostoberender=mongaz
    }else if (typebutton=== "noncomp") {
        todostoberender=ghermongaz
    }else {
        todostoberender=todos
    }

    function changetype(e) {
        settypebutton(e.target.value)
    }

    const todoss=todostoberender.map((el)=>{
        return (
            <Todo key={el.id} todo={el}/>
        )
    })
    function handeladd () {
        if(newadd!=="") {
            const neww=([...todos,{id:next,title:newadd,details:"",completed:false}])
            settodos(neww)
            localStorage.setItem("todo",JSON.stringify(neww))
            next=next+1
        }
        setnewadd("")
    }
    useEffect(()=>{
        const neww=JSON.parse(localStorage.getItem("todo"))
        settodos(neww)
    }, [])
return (
    <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 ,maxHeight:"80vh",overflow:"scroll"}}>
            <CardContent>
                <Typography variant='h1' color="text.secondary" style={{textAlign:"center",color:"black"}}>
                    مهامى
                </Typography> 
                <Divider/>   
                <ToggleButtonGroup
                    value={typebutton}
                    onChange={changetype}
                    color="primary"
                    aria-label="Platform"
                    style={{display:"flex",justifyContent:"center",direction:"ltr",alignItems:"center",paddingTop:"20px",marginBottom:"20px"}}
                    >
                        <ToggleButton value="noncomp">غير المنجز</ToggleButton>
                        <ToggleButton value="comp">المنجز</ToggleButton>
                        <ToggleButton value="all">الكل</ToggleButton>
                </ToggleButtonGroup>    
                {todoss}
            </CardContent>
            <Grid container spacing={2} style={{marginBottom:"10px",padding:"10px"}}>
                    <Grid item xs={8}>
                        <input value={newadd} onChange={(event)=>setnewadd(event.target.value)} style={{width:"100%",height:"40px",borderRadius:"6px",padding:"10px"}}/>
                    </Grid>
                    <Grid item xs={4} style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                        <button onClick={handeladd} style={{width:"90%",height:"100%",backgroundColor:newadd.length===0?"gray":"green",fontWeight:"bold",borderRadius:"6px",color:"white"}}>Add</button>
                    </Grid>
                </Grid>
        </Card>
    </Container>
);
}