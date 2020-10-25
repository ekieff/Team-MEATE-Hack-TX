import react from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-dom'
require('dotenv').config()

function About(){
    console.log(process.env)
    return(
        
            <div>
                <h1>Our about page</h1>
            </div>
        
    )
}

export default About;