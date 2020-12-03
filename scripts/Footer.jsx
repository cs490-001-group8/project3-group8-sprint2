import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => (
    <footer className="footer-section">
        <div className="container">
            <div className="footer-content pt-3 pb-3">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 mb-50">
                        <div className="footer-widget">
                            <div className="footer-logo">
                                <a href="index.html">
                                    <img
                                      src="https://upload.wikimedia.org/wikipedia/en/thumb/3/30/NJIT_Highlanders_logo.svg/1200px-NJIT_Highlanders_logo.svg.png"
                                      className="img-fluid"
                                      alt="logo"
                                    />
                                </a>
                            </div>
                            <div className="footer-text">
                                <p>
                                    New Jersey Institute of Technology is a public research
                                    university in Newark, New Jersey
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                        <div className="footer-widget">
                            <div className="footer-widget-heading">
                                <h3>Useful Links</h3>
                            </div>
                            <ul>
                                <li><NavLink className="a" to="/">Home</NavLink></li>
                                <li><NavLink className="a" to="/Commuter">Commuter</NavLink></li>
                                <li><NavLink className="a" to="/Politics">Politics</NavLink></li>
                                <li><NavLink className="a" to="/Recreation">Recreation</NavLink></li>
                                <li><NavLink className="a" to="/Personal">Personal</NavLink></li>
                                <li><a href="/landing_page">About</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                        <div className="footer-widget">
                            <div className="row">
                                <div className="single-cta">
                                    <i className="fas fa-map-marker-alt" />
                                    <div className="cta-text">
                                        <h4>Find us</h4>
                                        <span>Newark, NJ 07102</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="single-cta">
                                    <i className="fas fa-phone" />
                                    <div className="cta-text">
                                        <h4>Call us</h4>
                                        <span>(973) 596-3000</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="single-cta">
                                    <i className="far fa-envelope-open" />
                                    <div className="cta-text">
                                        <h4>Mail us</h4>
                                        <span>mail@info.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
