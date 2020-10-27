import React from 'react';
import '../Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
        Top Ranked, Unbelievably Easy-to-Use
        </p>
        <p className='footer-subscription-text'>
        CocoEvent was independently ranked a Top Event Management Software .
        </p>
      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h5>About Us</h5>
            <Link to='/AboutUs'>How it works</Link>
            <Link to='/AboutUs'>why CocoEvent</Link>
            <Link to='/AboutUs'>Team of Service</Link>
          </div>
          <div class='footer-link-items'>
            <h5>Contact Us</h5>
            <Link to='/ContactUs'>Contact</Link>
            <Link to='/ContactUs'>Support</Link>
            <Link to='/ContactUs'>Destinations</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h5>Events</h5>
            <Link to='/Events'>Create Events</Link>
            <Link to='/Events'>Participate in Events</Link>
            <Link to='/Events'>comment events</Link>
            <Link to='/Events'>show events</Link>
          </div>
          <div className='footer-link-items'>
            <h5>Social Media</h5>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
            <img
              src="/cocoE.jpg"
              alt="COCO PARTY"
              width="150px"
              height="70px"
              style={{
                marginRight: "10px",
                
              }}
              />
            </Link>
          </div>
          <small className='website-rights'>Coco © 2020</small>
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
              <i class='fab fa-twitter' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
