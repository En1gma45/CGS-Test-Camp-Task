import React from 'react';
import '../index.css';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

const Home = () => {


    return (
        <div className="home-wrapper">
            <form className="home-form">
                <Link to="/login" style={{ textDecoration: 'none' }} >
                <Button className="form-btn" variant="contained" color="default">
                    LOGIN
                </Button>
                </Link>
                <Link to="/registration" style={{ textDecoration: 'none' }} >
                <Button className="form-btn" variant="contained" color="default">
                    REGISTRATION
                </Button>
                </Link>
            </form>
        </div>
    )
}

export default Home;