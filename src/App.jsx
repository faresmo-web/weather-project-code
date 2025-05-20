import { createTheme, ThemeProvider, } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import 'moment/min/locales'; // Import Arabic locale
moment.locale('ar'); // Set locale to Arabic (Egypt)
// === Imports === //
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import './App.css'
import { Description } from '@mui/icons-material';

// === Imports REDUX === //
import { useSelector, useDispatch } from 'react-redux'
import {changeResult} from './features/counter/counter.js'
import {featchWeather} from './features/counter/counter.js'


const theme = createTheme({
  typography: {
    fontFamily: ["IBM"]
  }
})

let cancelAxios = null

function App() {
  // === REDUX === //
  const dispatch = useDispatch()
  const  isLoading = useSelector((state)=>{
    return state.weather.isLoading
  })
  const temp = useSelector((state)=>{
    return state.weather.weather
  })
  const { t, i18n } = useTranslation();
    
  // const dateAndTime = moment().format('dddd YYYY-MM-DD  HH:mm:ss a')
  const [dateAndTime, setDateAndTime] = useState("")
  // console.log("الوقت التاريخ" + dateAndTime);
  const [locale, setLocale] = useState("ar")
  const direction = locale == "ar" ? "rtl" : "ltr"


  function handleLanguageClick(){
    if(locale == "en"){
      setLocale("ar")
      i18n.changeLanguage("ar")
      moment.locale('ar')
    }else{
      setLocale("en")
      i18n.changeLanguage("en")
      moment.locale('en')
    }
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm a"))
  }


  useEffect(()=>{
    // TRYING REDUX
    // dispatch(changeResult())
    console.log("dispatching");
    dispatch(featchWeather())

    i18n.changeLanguage(locale)
  },[])
  useEffect(()=>{
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm a")) 
  },[])


  return (
    <>
      <ThemeProvider theme={theme}>
          <Container maxWidth="sm">
            {/* CONTENT CONTAINER */}
            <div className='content-container'>
              {/* CARD */}
              <div className='card' dir={direction} style={{backgroundColor: "rgb(28, 52, 91 / 36%"}}>
                {/* CONTENT */}
                <div >
                  {/* CITY & TIME */}
                  <div className='city-time' dir={direction}>
                      <Typography variant="h2" className='time' style={{fontWeight: "600"}} >
                        {t("Cairo")}
                      </Typography>
                      <Typography variant="h5" className='time'>
                        {dateAndTime}
                      </Typography>
                  </div>
                  {/* // CITY & TIME // */}
                  <hr />
                  {/* CONTAINER OF DEGREE + CLOUD ICON */}
                  <div className='content'>
                    {/* DEGREE & DESCRIPTION */}
                    <div>
                      {/* TEMP */}
                      <div>
                        <Typography variant="h1" className='temp' >
                          {isLoading ? <CircularProgress  /> : ""}
                          
                          {temp.Number}°C
                        </Typography>
                        {/* todo:  api صورة بتعبر عن الجو */}
                      </div>
                      {/* // TEMP // */}
                      <Typography variant="h6">
                        {t(temp.Description)}
                      </Typography>
                      {/* MIN & MAX */}
                      <div className='min-max'>
                        <h5>{t("min")} : {temp.min}</h5>
                        <h4 style={{margin: "0px 5px"}}>|</h4>
                        <h5>{t("max")} : {temp.max}</h5>
                      </div>
                      {/* // MIN & MAX // */}
                    </div>
                    {/* // DEGREE & DESCRIPTION // */}
                    <div>
                      <img  src={temp.icon} alt="" style={{
                        width: "200px",
                        height: "200px",
                      }}/>
                    </div>
                  </div>
                  {/* CONTAINER OF DEGREE + CLOUD ICON */}
                </div>
                {/* // CONTENT // */}
              </div>
              {/* // CARD // */}
              {/* TRANSLATION CONTAINER */}
              <div className='translation-btn' dir={direction}>
                <Button variant="text" style={{color: "#fff", marginTop: "20px" }} onClick={handleLanguageClick}>{locale == "en" ? "Araboc" : "إنجليزي"}</Button>
              </div>
              {/* // TRANSLATION CONTAINER // */}
              
            </div>
            {/* // CONTENT CONTAINER // */}
          </Container>
      </ThemeProvider>  
    </>
  )
}

export default App
