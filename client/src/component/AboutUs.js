import React from 'react';
import '../AboutUs.css';
import {Button}from './Button'
import Navbar from "./Navbar"
import Footer from "./Footer"
import "../bootstrap.scss"
function AboutUs() {
  return (
    <>
    <Navbar/>
    <section id="PageCoverHeader-2" data-vc-full-width="true" data-vc-full-width-init="true"
         className="vc_section about-us vc_custom_1489707920796 vc_section-has-fill">
          <div className="vc_row_a wpb_row vc_row-fluid">
            <div className="wpb_column vc_column_container vc_col-sm-12">
              <div className="vc_column-inner">
                  <div className="wpb_text_column wpb_content_element  page-header">
                    <div className="wpb_wrapper">
                      <h1 className="h1-about">
                        <span className="span-about " >Welcome to CocoEvent
</span>
                        </h1>
                        <hr/><h3 className="h3-about">
                          <span className="span-about " >CocoEvent is an all-in-one platform to create the best events in the world! Join us and get listed among the industry leaders in the world of event createur.</span>
                          </h3>
                          </div></div></div></div></div></section>
    <div className="use-bootstrap">
    <div className="jumbotron jumbotron-simple-new jumbotron-simple-new-dark" style={{marginTop:"50px"}}>
    <div className="exp1 container">
    <div className="row-2 row text-center">
      <div className="col-md-12 col-md-offset-1">
		<h1 className="title-1">Why CocoEvent</h1> 
		<p className="lead"> Here are the top 9 reasons event planners choose CocoEvent</p>
      </div>
    </div>
  </div>
</div>
{/*---***************the 9 reasons******************---*/}
<div className="exp1 container ">
<div className="row row-2 ">
	<div className="col-md-12 coll-1">
		<div className="row-2 row text-center icon-block">
			<div className="col-md-4  icon-4">
				<i className="icon icon-egg-timer"></i>				
				<h5 className="about-h5">Save time</h5> 
				<p className="para-1"> Create and manage your events in seconds</p>
			</div>
			<div className="col-md-4  icon-4">
				<i className="icon icon-lock"></i>							
				<h5 className="about-h5">Safe and secure</h5> 
				<p className="para-1"> Your personal information are secure and will not be shared with a third party</p>
			</div>	
			<div className="col-md-4 icon-4">
				<i className="icon icon-photo"></i>							
				<h5 className="about-h5">Highly moderated</h5> 
				<p className="para-1"> Every activity is verified by our moderators, and they can intervene if needed</p>
			</div>				
		</div>
		<div className="row-2 row text-center icon-block">
			<div className="col-md-4 icon-4">
				<i className="icon icon-money-withdrawal"></i>				
				<h5 className="about-h5">Real time chat</h5> 
				<p className="para-1">Our chat system allow you to chat in real time with any other member including moderators and the administrator</p>
			</div>
			<div className="col-md-4 icon-4">
				<i className="icon icon-users"></i>							
				<h5 className="about-h5">Rating system</h5> 
				<p className="para-1"> Our rating system for events is simple and allow participants to give their feedback once the event ends</p>
			</div>
			<div className="col-md-4 icon-4">
				<i className="icon icon-megaphone"></i>							
				<h5 className="about-h5">Localisation via google map</h5> 
				<p className="para-1"> We use google map API to make easier for users to find the exact place of any event</p>
			</div>	
		</div>
		<div className="row-2 row text-center icon-block">			
			<div className="col-md-4 icon-4">
				<i className="icon icon-database"></i>							
				<h5 className="about-h5">Notifications</h5> 
				<p className="para-1"> With our homemade notification center you will not miss any activity related to your account</p>
			</div>		
			<div className="col-md-4 icon-4">
				<i className="icon icon-ban"></i>							
				<h5 className="about-h5">Follow any organisator</h5> 
				<p className="para-1"> You have the possibility to follow organisators and then be informed about any activity related to them</p>
			</div>	
			<div className="col-md-4 icon-4">
				<i className="icon icon-power-mobile"></i>							
				<h5 className="about-h5">Mobile-friendly design</h5> 
				<p className="para-1"> Fully mobile and tablet friendly</p>
			</div>		
		</div>
	</div>
</div>
</div>
{/*---*******************how it work**************---*/}

<div className="jumbotron jumbotron-simple-new jumbotron-simple-new-dark">
  <div className="exp1 container">
    <div className="row-2 row text-center">
      <div className="col-md-12 coll-1 col-md-offset-1">
        <h1 className="title-1">How CocoEvent Works </h1>
        <p className="lead">Here's how CocoEvent works.
         It's simple, 
         yet powerful, 
         with many easy-to use features.
          Whether you're planning a small get-together or a large festival, 
          CocoEvent is perfect for events of any size or any occassion. </p>
      </div>
    </div>
  </div>
</div>
{/*---****************1*****************---

<div className="page-section page-section-theme ">
        <div className="exp1 container">
            <div className="row-2 row">
                <div className="col-md-6 col-padding-right"
                style={{ marginTop:110}}
                >
                    <div className="number">1</div>
                    <h3 className="about-h33"> Build your Event Website </h3>
                    <p style={{color:"#fff"}}className="lead"> Instant setup. </p>
                    <p className="para-1" style={{color:"#fff"}}> CocoEvent makes it easy to a beautiful,
                       professional event in minutes using CocoEvent’s easy-to-use Event createur.
                        Get started by choosing one of CocoEvent's event . 
                        From there, you can quickly add content, 
                        import images, and modify the Event . 
                        And don't worry. no server setup is needed. It's that easy </p>


                    <div className="form-group"
                      style={{ marginTop:20}}>
                        <button className=" btn-1 btn--secondary btn--light"
                         href="/login">Continue
                         </button>
                  

                    </div>
                 </div>
                <div className=" img-about-1 col-md-6">
                    <img src="/mess.png"
                     style={{width: "100%",

                     maxWidth: "114%",
                     float: "left",
                     marginLeft: "60px"
                     }}/>
                </div>
            </div>
        </div>
    </div>
    <div className="page-section page-section-builder ">
    <div className="exp1 container">
        <div className="row-2 row">

            <div className="col-md-6"> 

                <img src="/photo.png" alt="" className="img-responsive" 

                style={{width: "100%",
                maxWidth: "100%",
                float: "right",
                marginRight: "58px"}}/>
            </div>


            <div className="col-md-6 col-padding-right"
             style={{ marginTop:50}}> 
                <div className="number">2</div>
                <h3 className="about-h33"> Collect Event Registrations and Track Attendees</h3>
                <p className="lead"> All the tools you need, creat-in.</p>
                <p className="para-1"> Whether your event is a conference with thousands of attendees or a small party with friends,
                   CocoEvent gives you the power to create your event registration process.
                     quickly tweak your registration form by adding unlimited custom questions (like “Are you bringing a guest?”). 
                     CocoEvent's powerful analytics allow you to easily track and manage your attendees in one place. 
                     We take analytics seriously, giving you unprecendented power to understand your event performance.
                     CocoEvent also help, influencers and learn more about who is attending your events.</p>


                <div className="form-group"
                style={{ marginTop:20}}>
                    <button className="btn-2 btn--secondary btn--light"  href="/login">
                    Continue</button>
                </div>
            </div>
        </div>
    </div>
</div>
*/}
{/* //------------------the team---------------// 
<div className="jumbotron jumbotron-simple-new jumbotron-simple-new-dark">
  <div className="exp1 container">
    <div className="row-2 row text-center">
      <div className="col-md-12 coll-1 col-md-offset-1">
        <h1 className="title-1"> CocoEvent Team</h1>
        <p className="lead">
            Met our exceptionally talented team, ready to harness the force for good <br/>
             “Together, we can make waves.”

          </p>
      </div>
    </div>
  </div>
</div>




<section id="team">
        <div className="container">
            <div className="row">
                <div className=" col-md-4 profile-pic text-center">

                    <div className="img-box1">
                    <img className="image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHitPEzAyyl85mJu94hAoo4OqUZxW4Vp_8NRkd7f1ZGFkVAhvX&usqp=CAU" />
                    <ul id="u1">
                        <a className="faa" herf="#">
                            <li className="fa1"><i className="fa fa-facebook" aria-hidden="true"></i></li>
                        </a>
                        <a className="faa" herf="#">
                            <li className="fa1"><i className="fa fa-twitter" aria-hidden="true"></i></li>
                        </a>
                        <a className="faa" herf="#">
                            <li className="fa1"><i className="fa fa-linkedin" aria-hidden="true"></i></li>
                        </a>
                    </ul>
                    </div>
                    <h2 className="about-h2" >Akshay Kumar</h2>
                    <h3 className="about-h3">Founder/CEO</h3>
                    <p className="para-1">We succeed by pursuing our vision and goals with tenacity and unwavering resolve</p>
                </div>
                <div className=" col-md-4 profile-pic text-center">

                    <div className="img-box1">
                    <img className="image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQYsC5n8Dib3nag0Uyf0XUE0MagznOU1_adXKCvhgl6ICvl7Dn8&usqp=CAU" />

                    <ul id="u1">
                        <a className="faa" herf="#">
                            <li className="fa1"><i className="fa fa-facebook" aria-hidden="true"></i></li>
                        </a>
                        <a className="faa" herf="#">
                            <li className="fa1"><i className="fa fa-twitter" aria-hidden="true"></i></li>
                        </a>
                        <a className="faa" herf="#">
                            <li className="fa1"><i className="fa fa-linkedin" aria-hidden="true"></i></li>
                        </a>
                    </ul>
                    </div>
                    <h2 className="about-h2">Arjun Kapur</h2>
                    <h3 className="about-h3">UI Designer</h3>
                    <p className="para-1">They reflect our common aspiration to build a sustainable business to bring long-term values to our shareholders, our customers and our employees.</p>
                </div>
                <div className=" col-md-4 profile-pic text-center">

                    <div className="img-box1">
                    <img className="image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRUNfNzNQuI3hs2yjNVE3kK5mvroZDoCv6a7oi_GIIYjmpnAiV2&usqp=CAU" />

                    <ul id="u1">
                        <a className="faa" herf="#">
                            <li className="fa1"><i className="fa fa-facebook" aria-hidden="true"></i></li>
                        </a>
                        <a  className="faa" herf="#">
                            <li className="fa1"><i className="fa fa-twitter" aria-hidden="true"></i></li>
                        </a>
                        <a className="faa" herf="#">
                            <li className="fa1"><i className="fa fa-linkedin" aria-hidden="true"></i></li>
                        </a>
                    </ul>
                    </div>
                    <h2 className="about-h2">Alia Bhatt</h2>
                    <h3 className="about-h3">Marketing Head</h3>
                    <p className="para-1">The creativity and innovation of our people and hence our products & services set us apart.</p>
                </div>
                
            </div>
        </div>
    </section>
    */}
    </div>
{/* <Footer/> */}
    </>
  );
}

export default AboutUs;
