import React, { Component } from 'react'
import CanvasJSReact from '../canvasjs.react';
import { CircularProgress } from '@material-ui/core';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export class Details extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
           dataPoints : [],
           recoveredDataPoints: [],
           deathDataPoints: [],
           countryCode: ""
        }
    }
   
    render() {
      const country=this.props.match.params.countryname
        if(this.state.dataPoints.length===0)
        return (<CircularProgress style={{flex:1,alignContent: 'center', justifyContent: 'center',alignItems: 'center'}}></CircularProgress>)
       // console.log(this.state.dataPoints)
        
       var options = {
			theme: "light2",
			title: {
				text: "Corona Graph"
			},
			axisY: {
                title: "Count",
                
			},
			data: [{
                type: "line",
                xValueFormatString: "YYYY MM DD ",
				dataPoints: this.state.dataPoints
			}]
    }
    
    var options1 = {
			theme: "light2",
			title: {
				text: "Recovered"
			},
			axisY: {
                title: "Recovering",
                
			},
			data: [{
                type: "line",
                xValueFormatString: "YYYY MM DD ",
				dataPoints: this.state.recoveredDataPoints
			}]
    }
    
    var options2 = {
			theme: "light2",
			title: {
				text: "Deaths"
			},
			axisY: {
                title: "deaths",
                
			},
			data: [{
                type: "line",
                xValueFormatString: "YYYY MM DD ",
				dataPoints: this.state.deathDataPoints
			}]
		}
      
        return (
            <div>
                <img src={"https://www.countryflags.io/"+country.toLowerCase()+"/shiny/64.png" } alt="countryFlag"></img>
                <CanvasJSChart options = {options} style={{marginTop:50}}></CanvasJSChart>
                <CanvasJSChart options = {options1}  ></CanvasJSChart>
                <CanvasJSChart options = {options2}  ></CanvasJSChart>
            </div>
        )
    }
    componentDidMount(){
        const axios = require('axios');
       // var chart = this.chart;
       
        // Make a request for a user with a given ID
        axios.get("https://api.covid19api.com/total/country/"+this.props.match.params.countryname)
          .then( (response) =>{
            // handle success
            console.log(response);
            var datapoints=[],recovereddatapoints=[],deathDataPoints=[];
            for (var i = 0; i < response.data.length; i++) {
				datapoints.push({
					label: response.data[i].Date.substr(0,10),
					y: response.data[i].Confirmed
				});
        recovereddatapoints.push({
					label: response.data[i].Date.substr(0,10),
					y: response.data[i].Recovered
        });
        
        deathDataPoints.push({
					label: response.data[i].Date.substr(0,10),
					y: response.data[i].Deaths
				});
      }
      
            this.setState({
                dataPoints:datapoints,
                recoveredDataPoints:recovereddatapoints,
                deathDataPoints:deathDataPoints,
            })
            
          })
          .catch( (error)=> {
            // handle error
            console.log(error);
          })
    }
}
export default Details
