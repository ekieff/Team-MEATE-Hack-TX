import react from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-dom'
require('dotenv').config()

function About(){
    console.log(process.env)
    return(
        
            <div>
                <h1>About Us</h1>
                    <h3>
                        Project Harvest is a web based application born of a need to connect to food services in a growing online platform. 
                        Receive fast updates on stocks and locations, and be able to find the aid you need.
                    </h3>
            </div>
        
    )
}

export default About;