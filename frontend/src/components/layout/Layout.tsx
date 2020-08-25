import React from 'react'
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import LinkURL from '@material-ui/core/Link';
import { withStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';


const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);

function Copyright() {
  return (
    <WhiteTextTypography variant="body2" color="textSecondary" align="center" >
      {'Copyright © '}
      <LinkURL href="https://github.com/rim31">
        https://rim31.github.io/
      </LinkURL>{' '}
      {new Date().getFullYear()}
    </WhiteTextTypography>
  );
}

export default function Layout(props: any) {
  return (
    <>
      {/* <nav className="navbar sticky-top  navbar-dark " style={{ backgroundColor: "#0fb9b1", display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        <button className="d-lg-none navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation"><span className="dark-blue-text"><i
            className="fas fa-bars fa-1x"></i></span></button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent1">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link style={{ color: 'white', textDecoration: 'inherit', paddingLeft: '15px' }} to="/" >Answer</Link>
            </li>
            <li>
              <Link style={{ color: 'white', textDecoration: 'inherit', paddingLeft: '15px' }} to="/question" >Add Questions</Link>
            </li>
            <li>
              <Link style={{ color: 'white', textDecoration: 'inherit', paddingLeft: '15px' }} to="/listquestions" >Lists Questions</Link>
            </li>
            <li>
              <Link style={{ color: 'white', textDecoration: 'inherit', paddingLeft: '15px' }} to="/review">Review</Link>
            </li>
          </ul>
        </div>

        <span className="d-none d-lg-block" style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}>
          <Link style={{ color: 'white', textDecoration: 'inherit', paddingLeft: '15px' }} to="/" >Answer</Link>
          <Link style={{ color: 'white', textDecoration: 'inherit', paddingLeft: '15px' }} to="/question" >Add Questions</Link>
          <Link style={{ color: 'white', textDecoration: 'inherit', paddingLeft: '15px' }} to="/listquestions" >Lists Questions</Link>
          <Link style={{ color: 'white', textDecoration: 'inherit', paddingLeft: '15px' }} to="/review">Review</Link>
        </span>
        <h1 style={{ color: "white", fontWeight: "bold" }}>Formula</h1>
        <span className="d-none d-lg-block">
        </span>
      </nav> */}


      {/* <nav className="navbar sticky-top navbar-dark navbar-expand-lg bg-secondary fixed-top" id="mainNav" style={{ backgroundColor: "#0fb9b1" }}> */}
      <nav className="navbar sticky-top  navbar-dark navbar-expand-lg" style={{ backgroundColor: "#0fb9b1", display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        <div className="container">
          <a className="navbar-brand js-scroll-trigger" href="#page-top">FORM</a>
          <button className="navbar-toggler navbar-toggler-right font-weight-bold bg-secondary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">Menu <i className="fas fa-bars"></i></button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mx-0 mx-lg-1 active"><Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" style={{ color: 'white', textDecoration: 'inherit', paddingLeft: '15px' }} to="/" >Answer</Link></li>
              <li className="nav-item mx-0 mx-lg-1"><Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" style={{ color: 'white', textDecoration: 'inherit', paddingLeft: '15px' }} to="/question" >Add Questions</Link></li>
              <li className="nav-item mx-0 mx-lg-1"><Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" style={{ color: 'white', textDecoration: 'inherit', paddingLeft: '15px' }} to="/listquestions" >Lists Questions</Link></li>
              <li className="nav-item mx-0 mx-lg-1"><Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" style={{ color: 'white', textDecoration: 'inherit', paddingLeft: '15px' }} to="/review">Review</Link></li>
            </ul>
          </div>
        </div>
      </nav>


      {props.children}
      <Box pt={4} style={{ bottom: 0, position: 'fixed', right: 0 }}>
        <Copyright />
      </Box>
    </ >
  )
}
