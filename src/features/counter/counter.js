import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



export const featchWeather = createAsyncThunk("weatherApi/fetchWeather",  async ()=>{
    console.log("calling the thunk function");
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=30.03&lon=31.23&appid=a8b99b35cced1126b22c9b97529b3901',
        // {
        //     cancelToken: new axios.CancelToken((c)=>{
        //         cancelAxios = c
        //     })
        // }
    )
    const responseTemp = Math.round(response.data.main.temp  -272.15)
    const min = Math.round(response.data.main.temp_min -272.15)
    const max = Math.round( response.data.main.temp_max -272.15)
    const description = response.data.weather[0].description
    const resopnseIcon = response.data.weather[0].icon
    console.log(response);
    // setTemp({
    //     Number: responseTemp,
    //     Description: description,
    //     min: min,
    //     max: max,
    //     icon:  `https://openweathermap.org/img/wn/${resopnseIcon}@2x.png`
    // })
    return{Number: responseTemp, Description: description, min, max, icon: `https://openweathermap.org/img/wn/${resopnseIcon}@2x.png`}
})



export const wearherSlice = createSlice({
    name: 'weatherApi',
    

    initialState: {
        result: "empty",
        weather: {},
        isLoading: false,
    },

    reducers: {
        changeResult: (state, action) => {
            state.result = "changed"
        }
    },
    extraReducers(builder) {
        builder.addCase(featchWeather.pending, (state, action) => {
            state.isLoading = true
        }).addCase(featchWeather.fulfilled, (state, action) => {
            state.isLoading = false
            state.weather = action.payload
            
        }).addCase(featchWeather.rejected, (state, action) => {
            state.isLoading = false
        })
    }
})

export const { changeResult } = wearherSlice.actions

export default wearherSlice.reducer