import React from 'react';
import "../bootstrap.scss"
import "../ContactModel.css"

const ContactModel = () => {
    return (
        <div className="use-bootstrap">
            
      {/* <!-- Modal button --> */}
    <div class="popup-icon">
      <button id="modBtn" class="modal-btn"><img className="img-home" src="/contact-icon.png" alt=""/></button>
    </div>  

    {/* <!-- Modal --> */}
    <div id="modal" class="modal">
      {/* <!-- Modal Content --> */}
      <div class="modal-content">
        {/* <!-- Modal Header --> */}
        <div class="modal-header">
          <h3 class="header-title">Say hello to <em>Highway</em></h3>
          <div class="close-btn"><img src="/close_contact.png" alt=""/></div>    
        </div>
        {/* <!-- Modal Body --> */}
        <div class="modal-body">
          <div class="col-md-6 col-md-offset-3">
            <form id="contact" action="" method="post">
                <div class="row">
                    <div class="col-md-12">
                      <fieldset>
                        <input name="name" type="text" class="form-control" id="name" placeholder="Your name..." required/>
                      </fieldset>
                    </div>
                    <div class="col-md-12">
                      <fieldset>
                        <input name="email" type="email" class="form-control" id="email" placeholder="Your email..." required/>
                      </fieldset>
                    </div>
                    <div class="col-md-12">
                      <fieldset>
                        <textarea name="message" rows="6" class="form-control" id="message" placeholder="Your message..." required></textarea>
                      </fieldset>
                    </div>
                    <div class="col-md-12">
                      <fieldset>
                        <button type="submit" id="form-submit" class="btn">Send Message Now</button>
                      </fieldset>
                    </div>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
        </div>
    );
};

export default ContactModel;