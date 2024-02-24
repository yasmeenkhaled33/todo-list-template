import './App.css';
import Todolist from './components/todolist';
import { createTheme,ThemeProvider} from "@mui/material/styles"
import { MyContext } from './contexts/todocontext';
import { useState } from 'react';


const theme = createTheme({
  typography: {
    fontFamily:[
      "Alec"
    ]
  },
  palette:{
    primary:{
      main:"#004d40"
    }
  }
});

let todolis=[
  {id:1,title:"المهة الاولى",details:"تفاصيل المهمة الاولى",completed:false},
  {id:2,title:"المهمة الثانية",details:"تفاصيل المهمة الثانية",completed:false},
  {id:3,title:"المهمة الثالثة",details:"تفاصيل المهمة الثالثة",completed:false}
]
function App() {
  const [todos,settodos]=useState(todolis)
  return (
    <>
    <ThemeProvider theme={theme}>
      <MyContext.Provider value={{todos,settodos}}>
        <div style={{display:"flex",direction:"rtl",justifyContent:"center",alignItems:"center",height:"100vh",backgroundColor:"teal"}}>
          <Todolist/> 
        </div>
      </MyContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
