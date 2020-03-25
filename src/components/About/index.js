import React from 'react'
import s from '../../assets/css/page.css'

let About = () => 
  <div className={s.container}>
      <h1>Welcome to Sickly</h1>
      <p>
       Sickly was built by <b>2</b> humans from <b>Dallas, TX</b>.<br/>
       Sickly helps you keep up to date with COVID-19 <i>in your community</i>.<br/>
       <a href="mailto:sickly@hideaddress.net?subject=Sickly&body=Hi">Click here to email us.</a><br/>
      </p>
      <p>
        The COVID-19 pandemic has shown us many things... we have seen people come together in times of uncertainty like in Italy where people are singing from their balconies to spread joy. We have seen business change dramatically to preserve jobs and allow employees to work online, but most importantly have seen where the systems that were put in place to protect us in times like these have fallen flat. 

We are a team of two people, dedicated to helping in the best way we know how…. through software! We developed Sickly after discovering the ALARMING lack of data out there. With our application, users are able to report their symptoms and interact with a live map which shows the effects of exponential growth on countries, states and CITIES near them. To add a cherry on top, we wanted to make our platform as clean as possible. We know how messy it can get to find accurate information when the whole internet is exploding, so we developed a section that does the research, so you don’t have to! 

We stand by the sentiment that knowledge is power! By using our application, you are not only educating yourself on the most recent updates regarding this pandemic, but you can also help researchers, because your anonymous reports get saved to our secured database! 

We are dedicated to perfecting this platform so it can be of use to not only COVID-19 but for all future outbreaks.

Stay informed with us, and watch out for future features coming soon. We look forward to presenting a cutting-edge application that notifies you if you’ve come in contact with someone who may be ill.

To stay updated on our project, subscribe to our email list here: 
      </p>
  </div>

export default () => <About />
