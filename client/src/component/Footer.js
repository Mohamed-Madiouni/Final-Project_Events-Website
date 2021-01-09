import React from 'react';
import '../Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription '>
        <p className='footer-subscription-heading footer-p'>
        Top Ranked, Unbelievably Easy-to-Use
        </p>
        <p className='footer-subscription-text footer-p'>
        CocoEvent was independently ranked a Top Event Management Website .
        </p>
      </section>
      {/* <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h5 className="footer-h5">About Us</h5>
            <Link className="footer-a" to='/AboutUs'>How it works</Link>
            <Link className="footer-a" to='/AboutUs'>Team of Service</Link>
            <Link className="footer-a" to='/AboutUs'>why CocoEvent</Link>

          </div>
          <div className='footer-link-items'>
            <h5 className="footer-h5">Contact Us</h5>
            <Link className="footer-a" to='/ContactUs'>Support</Link>
            <Link className="footer-a" to='/ContactUs'>Destinations</Link>
            <Link className="footer-a" to='/ContactUs'>Contact</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h5 className="footer-h5">Events</h5>
            <Link className="footer-a" to='/Events'>Participate in Events</Link>
            <Link className="footer-a" to='/Events'>comment events</Link>
            <Link className="footer-a" to='/Events'>Create Events</Link>
            <Link className="footer-a" to='/Events'>show events</Link>
          </div>
          <div className='footer-link-items'>
            <h5 className="footer-h5">Social Media</h5>
            <Link className="footer-a" to='/'>Instagram</Link>
            <Link className="footer-a" to='/'>Facebook</Link>
            <Link className="footer-a" to='/'>Youtube</Link>
            <Link className="footer-a" to='/'>Twitter</Link>
          </div>
        </div>
      </div> */}
      <div className ="container" style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
      <section className='social-media'>

            <div className='footer-link-wrapper' style={{display: "flex",  justifyContent:"space-between"}}>

          <div className='footer-logo'>
            <Link to='/' className='social-logo '>
            <img 
              src="/cocoE.jpg"
              alt="COCO PARTY"
              width="150px"
              height="70px"
              />
            </Link>
            </div>

            <Link to="/about" className='footer-link-items' >
            <h5 className="footer-h5">About</h5></Link>
            <Link to="/contact" className='footer-link-items'>
            <h5 className="footer-h5">Contact</h5></Link>
            <Link to="events" className='footer-link-items'>
            <h5 className="footer-h5">Events</h5></Link>
          </div>
          
          <div className='social-icons-container'>
          <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
            <Link
              className='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </Link>
          </div></div>
      </section>
      </div>
      <small className='website-rights'>Coco © 2020</small>

    </div>
  );
}

export default Footer;
