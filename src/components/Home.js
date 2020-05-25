import React, { Component } from 'react'
import {CircularProgress,Grid, Typography} from '@material-ui/core'
import Header from '../partials/Header'
import Footer from '../partials/Footer'
import styles from '../Stylesheets/styles.module.css'
import {NavLink} from 'react-router-dom'
export class Home extends Component {
    constructor(props) {
        super(props)
    
        this.searchHandler=this.searchHandler.bind(this)
    }
    
    componentDidMount(){
        const axios = require('axios');
 
        // Make a request for a user with a given ID
        axios.get('https://api.covid19api.com/summary')
          .then( (response) =>{
            // handle success
            console.log(response);
            
            this.setState({
                countries: response.data.Countries
            })
          })
          .catch( (error)=> {
            // handle error
            console.log(error);
          })
          
    }

   searchHandler=(e)=>{
      //  console.log(e.key,e.target.value,e.target)
       
          
            const searchedCountry= this.state.countries.filter((country)=>country.Country.toLowerCase().indexOf(e.target.value.toLowerCase())!==-1)
            this.setState({
                searchedCountry: searchedCountry
            })
        
    }
    
    render() {
       
        if(!this.state) return (
            <div>
            <Header searchHandler={this.searchHandler}></Header>
            <CircularProgress style={{marginTop: 320,marginLeft: 100}}></CircularProgress>
            </div>
        )
      if(this.state.searchedCountry)
      {
          console.log(this.state.searchedCountry)
      }
        const countries=(this.state.searchedCountry && this.state.searchedCountry.length!==0)?this.state.searchedCountry:this.state.countries;
        const cardData=countries.map((country)=>{
            return (
            <Grid item lg={4} md={6} sm={12} xs={12} key={country.Country} className={styles.card} style={{ marginTop: 95,paddingTop: 10,  paddingBottom:30, height: 270,  paddingLeft: 20}}>
             <NavLink to={"/country/"+country.CountryCode} style={{textDecoration: 'none',color: 'black'}}>
            <img src={"https://www.countryflags.io/"+country.CountryCode.toLowerCase()+"/shiny/64.png" } alt={country.CountryCode}></img>
            <Typography variant="h3"> {country.Country}</Typography>
            <Typography variant="body1">New Confirmed: {country.NewConfirmed}</Typography>
            <Typography variant="body1">New Deaths: {country.NewDeaths}</Typography>
            <Typography variant="body1">New Recovered: {country.NewRecovered}</Typography>
            </NavLink>
              </Grid>

            )
                                   
        });
        return (
            
            <div>
                <Header searchHandler={this.searchHandler}></Header>
             <Grid container spacing={4}>
                {cardData}
             </Grid>
             <Footer></Footer>
            </div>
          
        )
    }
    
}

export default Home
