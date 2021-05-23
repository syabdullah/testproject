// @flow
import React from "react";
import PageHeader from "../PageHeader";
import PageFooter from "../PageFooter";

import "./style.css";

class Privacy extends React.Component {
  componentWillMount() {
    window.location = "https://d3eyb8shadqthh.cloudfront.net/PrivacyPolicy.pdf";
  }

  render() {
    if (false) {
      return (
        <div>
          <PageHeader title="Privacy Policy" />
          <div className="card s-panel mt-40">
            <div className="legal">
              <div>
                <p>
                  Spocket, Inc. (<strong>"Spocket"/"we"/"us"/"our"</strong>) is committed to protecting your
                  privacy. We make the website, www.Spocket.com (the <strong>"Website"</strong>), and the
                  Shopify App “Spocket” (“App”) available together with the Spocket services available through
                  the Website and App(the
                  <strong>"Service"</strong>). As you use our services, we want you to be clear how we’re
                  using information and the ways in which you can protect your privacy.
                </p>
                <p>Our Privacy Policy explains:</p>
                <ul>
                  <li>What information we collect and why we collect it.</li>
                  <li>How we use that information and when we disclose it.</li>
                  <li>How to access and update your personal information.</li>
                </ul>
                <p>
                  Your privacy matters to us so please take the time to familiarize yourself with our
                  policies, and if you have any questions please contact us at{" "}
                  <a href="mailto:support@spocket.co">support@spocket.co</a>.
                </p>
                <ol class="mt-20">
                  <li>
                    <p>IMPORTANT INFORMATION AND WHO WE ARE</p>
                    <div>
                      <p>
                        <strong>Purpose of this Privacy Policy</strong>
                      </p>
                      <p>
                        This Privacy Policy aims to give you information on how Spocket collects and processes
                        your personal information through your use of the Website, App and the Services,
                        including any information you may provide when you sign up for a demo of our Services,
                        when you create an account and a profile with us, when you purchase or use our
                        Services, when you submit status updates, when you search our Website or App, when you
                        use our App, when you subscribe to our email alerts, when you contact our customer
                        service, when you participate in surveys, public forums, chats, or when you respond to
                        one of our requests for suggestions and other content.
                      </p>
                      <p>
                        Please note that neither the Website, App nor the Service is intended for children
                        under 16 years of age. No one under age 16 may provide any information to or on the
                        Website, App or through our Services. We do not knowingly collect personal information
                        from children under 16. If you are under 16, do not use or provide any information on
                        the Website, App or on or through any of its features, use any of the interactive or
                        public comment features of the Website or App or provide any information about
                        yourself to us, including your name, address, telephone number, email address, or any
                        screen name or user name you may use. If we learn we have collected or received
                        personal information from a child under 16 without verification of parental consent,
                        we will delete that information. If you believe we might have any information from or
                        about a child under 16, please contact us.
                      </p>
                      <p>
                        It is important that you read this Privacy Policy together with any other privacy
                        notice or fair processing notice we may provide on specific occasions when we are
                        collecting or processing personal information about you so that you are fully aware of
                        how and why we are using your information. This Privacy Policy supplements the other
                        notices and is not intended to override them.
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Controller or Processor</strong>
                      </p>
                      <p>
                        To the extent that Spocket holds information about you due to your use of our
                        Services, Spocket is the controller and responsible for your personal information. To
                        the extent that Spocket holds information about you due its presence in content
                        uploaded by Spocket customers, Spocket acts as a processor on behalf of such customers
                        and the terms of this Privacy Policy does not apply to such information.
                      </p>
                      <p>
                        If you have any questions about this Privacy Policy, including any requests to
                        exercise your legal rights, please contact us using the details set out below.
                      </p>
                      <p>
                        <strong>Contact Details</strong>
                      </p>
                      <p>Our full details are: </p>
                      <p>
                        Spocket Inc. <br />
                        Email address: <a href="mailto:support@spocket.co">Support@spocket.co</a>
                        <br />
                        Postal address: 555 Burrard St, Vancouver, BC V7X 1L4
                      </p>
                      <p>
                        If you are based in the European Union, you also have the right to make a complaint at
                        any time to your local supervisory authority for data protection issues. We would,
                        however, appreciate the chance to deal with your concerns before you approach the
                        regulator so please contact us at{" "}
                        <a href="mailto:support@spocket.co">Support@spocket.co</a> in the first instance.
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Changes to the Privacy Policy and your duty to inform us of changes</strong>
                      </p>
                      <p>This version was last updated on October 12th, 2018.</p>
                      <p>
                        We reserve the right to change the terms of this Privacy Policy at any time. When we
                        do, we will post the revised Privacy Policy to our Website (as linked within the App)
                        and the last revision date of revision will be updated so that you will always be able
                        to understand what information we collect, how we use your information, and under what
                        circumstances we may share your information with others.
                      </p>
                      <p>
                        It is important that the personal information we hold about you is accurate and
                        current. Please keep us informed if your personal information changes during your
                        relationship with us.
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Third-party Links</strong>
                      </p>
                      <p>
                        The Website or App may include links to third-party websites, plug-ins and
                        applications. Clicking on those links or enabling those connections may allow third
                        parties to collect or share information about you. We do not control these third-party
                        websites and are not responsible for their privacy statements. When you leave our
                        Website or App, we encourage you to read the privacy notice of every website you
                        visit.
                      </p>
                      <p />
                    </div>
                  </li>
                  <li>
                    <p>THE INFORMATION WE COLLECT ABOUT YOU</p>
                    <div>
                      <p>
                        Personal data, or personal information, means any information relating to an
                        identifiable person who can be directly or indirectly identified. It does not include
                        data which cannot be related to an identifiable person (anonymous data).
                      </p>
                      <p>
                        We may collect, use, store and transfer different kinds of personal information about
                        you which we have grouped together follows:
                      </p>
                      <div>
                        <ul>
                          <li>
                            Identity Data includes first name, last name, username or similar identifier.
                          </li>
                          <li>
                            Contact Data includes billing address, delivery address, email address and
                            telephone numbers.
                          </li>
                          <li>Financial Data includes payment card details. </li>
                          <li>
                            Transaction Data includes details about payments to and from you and other details
                            of services you ave purchased from us.
                          </li>
                          <li>
                            Technical Data includes internet protocol (IP) address, your mobile device’s
                            unique ID number, your login data, browser type and version, time zone setting and
                            location, browser plug-in types and versions, operating system and platform and
                            other technology on the devices you use to access the Website or on which the App
                            is installed and used.
                          </li>
                          <li>
                            Profile Data includes your username and password, purchases or orders made by you,
                            your location, preferences, feedback and survey responses.
                          </li>
                          <li>
                            Usage Data includes information about how you use our Website, App, other app(s)
                            and Services, such as the buttons, controls, products and ads you click on, pages
                            of our App or Website that you visit, the time spent on those pages, your search
                            queries, the dates and times of your visits or use, but also about the products
                            that you are tracking through the App and Service, how often you use those
                            products, and other related data regarding such usage by you.
                          </li>
                          <li>
                            Marketing and Communications Data includes your preferences in receiving marketing
                            from us and our third parties and your communication preferences.
                          </li>
                        </ul>
                      </div>
                      <p>
                        We also collect, use and share <strong>Aggregated Data</strong> such as statistical or
                        demographic data for any purpose. Aggregated Data may be derived from your personal
                        information but is not considered personal information in law as this information does
                        not directly or indirectly reveal your identity. For example, we may aggregate your
                        Usage Data to calculate the percentage of users accessing a specific Website feature.
                        However, if we combine or connect Aggregated Data with your personal information so
                        that it can directly or indirectly identify you, we treat the combined data as
                        personal information which will be used in accordance with this Privacy Policy.
                      </p>
                      <p>
                        We do not collect any <strong>Special Categories of Personal Data</strong>
                        about you (this includes details about your race or ethnicity, religious or
                        philosophical beliefs, sex life, sexual orientation, political opinions, trade union
                        membership, information about your health and genetic and biometric data). Nor do we
                        collect any information about criminal convictions and offences.
                      </p>
                      <p>
                        <strong>If you fail to provide personal information</strong>
                      </p>
                      <p>
                        Where we need to collect personal information by law, or under the terms of a contract
                        we have with you and you fail to provide that information when requested, we may not
                        be able to perform the contract we have or are trying to enter into with you (for
                        example, to provide you with our services). In this case, we may have to cancel a
                        service you have with us but we will notify you if this is the case at the time.
                      </p>
                    </div>
                  </li>
                  <li>
                    <p>HOW IS PERSONAL INFORMATION COLLECTED</p>
                    <div>
                      <p>
                        We use different methods to collect data from and about individuals including through:
                      </p>
                      <ul>
                        <li>
                          <strong>Direct interactions by you.</strong> You may give us Identity, Contact and
                          Financial Data by filling in forms, linking through your Shopify account or by
                          corresponding with us by post, phone, email or otherwise. This includes personal
                          data you provide or permit use to access when you :
                          <ul class="mt-10">
                            <li>sign up for a demo of our services;</li>
                            <li>create an account and profile with us;</li>
                            <li>purchase one of services;</li>
                            <li>subscribe to our email alerts;</li>
                            <li>complete one of our online forms to receive our reports and case studies;</li>
                            <li>download or otherwise access one of our e-books, magazines, videos;</li>
                            <li>contact our customer service;</li>
                            <li>request marketing to be sent to you; or</li>
                            <li>give us some feedback. </li>
                          </ul>
                        </li>
                        <li>
                          <strong>Automated technologies or interactions.</strong> As you interact with our
                          Site, we may automatically collect Technical Data about your equipment, browsing
                          actions and patterns. We collect this personal data by using cookies, server logs
                          and other similar technologies. We may also receive Technical Data and Usage Data
                          about you if you visit other websites employing our cookies..
                        </li>
                        <li>
                          <strong>Third parties or publicly available sources.</strong> We may receive
                          personal information about you from various third parties and public sources as set
                          out below :
                        </li>
                        <li>
                          <p>Technical Data from the following parties:</p>
                          <ol type="a">
                            <li>analytics providers such as Google Analytics based outside the EU;</li>
                            <li>
                              search information providers such as Google based inside or outside the EU.
                            </li>
                          </ol>
                        </li>
                        <li>
                          Contact, Financial and Transaction Data from providers of technical, payment and
                          delivery services such as Stripe based outside the EU.
                        </li>
                        <li>
                          Identity and Contact Data from our partners, data brokers or aggregators based
                          inside or outside the EU.
                        </li>
                        <li>
                          Identity and Contact Data from publicly available sources such as LinkedIn,
                          Instagram, and other social networking sites based outside the EU.
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <p>HOW WE USE YOUR PERSONAL INFORMATION</p>
                    <p>
                      We will only use your personal information when the law allows us to. Most commonly, we
                      will use your personal data in the following circumstances:
                    </p>
                    <div>
                      <ul>
                        <li>
                          Where we need to perform the contract we are about to enter into or have entered
                          into with you.
                        </li>
                        <li>
                          Where it is necessary for our legitimate interests (or those of a third party) and
                          your interests and fundamental rights do not override those interests.
                        </li>
                        <li>Where we need to comply with a legal or regulatory obligation.</li>
                      </ul>
                    </div>
                    <p>The types of lawful basis that we will rely on to process your personal data are:</p>
                    <p>
                      <strong>Legitimate Interest</strong> - this means the interest of our business in
                      conducting and managing our business to enable us to give you the best service and the
                      best and most secure experience. We make sure we consider and balance any potential
                      impact on you (both positive and negative) and your rights before we process your
                      personal information for our legitimate interests. We do not use your personal
                      information for activities where our interests are overridden by the impact on you
                      (unless we have your consent or are otherwise required or permitted to by law). You can
                      obtain further information about how we assess our legitimate interests against any
                      potential impact on you in respect of specific activities by contacting us.
                    </p>
                    <p>
                      <strong>Performance of Contract</strong> – this means processing your information where
                      it is necessary for the performance of a contract to which you are a party or to take
                      steps at your request before entering into such a contract.
                    </p>
                    <p>
                      <strong>Comply with a legal or regulatory obligation</strong> - this means processing
                      your personal information where it is necessary for compliance with a legal or
                      regulatory obligation that we are subject to.
                    </p>
                    <p>
                      <strong>Consent</strong> – this means you have consented to our use of data in this
                      manner. We may ask for your express consent for certain uses, and you are free to
                      withdraw that consent at any time.
                    </p>
                    <p>
                      Generally we do not rely on consent as a legal basis for processing your personal
                      information other than in relation to sending third party direct marketing
                      communications to you via email or text message. You have the right to withdraw consent
                      to marketing at any time by contacting us.
                    </p>
                    <p>
                      <strong>Purposes for which we will use your personal information</strong>
                    </p>
                    <p>
                      We have set out below, in a table format, a description of all the ways we plan to use
                      your personal information, and which of the legal bases we rely on to do so. We have
                      also identified what our legitimate interests are where appropriate.
                    </p>
                    <p>
                      Note that we may process your personal information for more than one lawful ground
                      depending on the specific purpose for which we are using your information. Please
                      contact us if you need details about the specific legal ground we are relying on to
                      process your personal information where more than one ground has been set out in the
                      table below.
                    </p>
                    <table>
                      <thead>
                        <tr>
                          <th>Purpose/Activity</th>
                          <th>Type of Data</th>
                          <th>Lawful basis for processing including basis of legitimate interest</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>To register you as a new customer</th>
                          <th>
                            <ol type="a">
                              <li>Identity</li>
                              <li>Contact</li>
                            </ol>
                          </th>
                          <th>Performance of a contract with you</th>
                        </tr>
                        <tr>
                          <th>To allow your use of the Service</th>
                          <th>
                            <ol type="a">
                              <li>Identity</li>
                              <li>Technical</li>
                              <li>Contact</li>
                              <li>Financial</li>
                              <li>Transaction</li>
                            </ol>
                          </th>
                          <th>Performance of a contract with you</th>
                        </tr>
                        <tr>
                          <th>
                            To process and deliver your order including:
                            <ol type="a">
                              <li>Manage payments, fees and charges</li>
                              <li>Collect and recover money owed to us</li>
                            </ol>
                          </th>
                          <th>
                            <ol type="a">
                              <li>Identity</li>
                              <li>Contact</li>
                              <li>Financial</li>
                              <li>Transaction</li>
                              <li>Marketing and Communications</li>
                            </ol>
                          </th>
                          <th>
                            <ol type="a">
                              <li>Performance of a contract with you</li>
                              <li>Necessary for our legitimate interests (to recover debts due to us)</li>
                            </ol>
                          </th>
                        </tr>
                        <tr>
                          <th>
                            To manage our relationship with you which will include:
                            <ol type="a">
                              <li>Notifying you about changes to our terms or Privacy Policy</li>
                              <li>Asking you to leave a review or take a survey</li>
                            </ol>
                          </th>
                          <th>
                            <ol type="a">
                              <li>Identity</li>
                              <li>Contact</li>
                              <li>Profile</li>
                              <li>Marketing and Communications</li>
                            </ol>
                          </th>
                          <th>
                            <ol type="a">
                              <li>Performance of a contract with you</li>
                              <li>Necessary to comply with a legal obligation</li>
                              <li>
                                Necessary for our legitimate interests (to keep our records updated and to
                                study how customers use our services)
                              </li>
                            </ol>
                          </th>
                        </tr>
                        <tr>
                          <th>To enable you to partake in a prize draw, competition or complete a survey</th>
                          <th>
                            <ol type="a">
                              <li>Identity</li>
                              <li>Contact</li>
                              <li>Profile</li>
                              <li>Usage</li>
                              <li>Marketing and Communications</li>
                            </ol>
                          </th>
                          <th>
                            <ol type="a">
                              <li>Performance of a contract with you</li>
                              <li>
                                Necessary for our legitimate interests (to study how customers use our
                                services, to develop them and grow our business)
                              </li>
                            </ol>
                          </th>
                        </tr>
                        <tr>
                          <th>
                            To administer and protect our business and this Website and Mobile App (including
                            troubleshooting, data analysis, testing, system maintenance, support, reporting
                            and hosting of data)
                          </th>
                          <th>
                            <ol type="a">
                              <li>Identity</li>
                              <li>Contact</li>
                              <li>Technical</li>
                            </ol>
                          </th>
                          <th>
                            <ol type="a">
                              <li>
                                Necessary for our legitimate interests (for running our business, provision of
                                administration and IT services, network security, to prevent fraud and in the
                                context of a business reorganization or group restructuring exercise)
                              </li>
                              <li>Necessary to comply with a legal obligation</li>
                            </ol>
                          </th>
                        </tr>
                        <tr>
                          <th>
                            To use data analytics to improve our website, services, customer relationships and
                            experiences
                          </th>
                          <th>
                            <ol type="a">
                              <li>Technical</li>
                              <li>Usage</li>
                            </ol>
                          </th>
                          <th>
                            Necessary for our legitimate interests (to define types of customers for our
                            services, to keep our Website and Mobile App updated and relevant, to develop our
                            business and to inform our strategy)
                          </th>
                        </tr>
                        <tr>
                          <th>
                            To make suggestions and recommendations to you about services that may be of
                            interest to you
                          </th>
                          <th>
                            <ol type="a">
                              <li>Identity</li>
                              <li>Contact</li>
                              <li>Technical</li>
                              <li>Usage</li>
                              <li>Profile</li>
                            </ol>
                          </th>
                          <th>
                            Necessary for our legitimate interests (to develop our services and grow our
                            business) or where have otherwise consented to such usage
                          </th>
                        </tr>
                      </tbody>
                    </table>
                    <br />
                    <p>
                      <strong>Marketing</strong>
                    </p>
                    <p>
                      We strive to provide you with choices regarding certain personal information uses,
                      particularly around marketing and advertising. You may elect to opt out of receiving any
                      further marketing or advertising emails from us through the mechanism provided in those
                      emails. We may send you targeted advertising through the Service on to you
                    </p>
                    <p>
                      <strong>Promotional offers from us</strong>
                    </p>
                    <p>
                      We may use your Identity, Contact, Technical, Usage and Profile Data to form a view on
                      what we think you may want or need, or what may be of interest to you. This is how we
                      decide which products, services and offers may be relevant for you.
                    </p>
                    <p>
                      You will receive marketing communications from us if you have requested information from
                      us or purchased services from us or if you provided us with your details when you
                      entered a competition or registered for a promotion and, in each case, you have not
                      opted out of receiving that marketing.
                    </p>
                    <p>
                      <strong>Third-party marketing</strong>
                    </p>
                    <p>
                      We will get your express opt-in consent before we share your personal information with
                      any company outside our company for marketing purposes, including service providers who
                      perform marketing services on our behalf, such as conducting surveys, sending
                      communications to you on our behalf, or serving advertisements to you.
                    </p>
                    <p>
                      <strong>Opting out</strong>
                    </p>
                    <p>
                      You can ask us or third parties to stop sending you marketing messages at any time by
                      contacting us at any time.
                    </p>
                    <p>
                      Where you opt out of receiving these marketing messages, this will not apply to personal
                      information provided to us as a result of a service purchase, service experience or
                      other transactions.
                    </p>
                    <p>
                      <strong>Cookies (website only)</strong>
                    </p>
                    <p>
                      You can set your browser to refuse all or some browser cookies, or to alert you when
                      websites set or access cookies. If you disable or refuse cookies, please note that some
                      parts of this Website may become inaccessible or not function properly.
                    </p>
                    <p>
                      <strong>Change of purpose</strong>
                    </p>
                    <p>
                      We will only use your personal information for the purposes for which we collected it,
                      unless we reasonably consider that we need to use it for another reason and that reason
                      is compatible with the original purpose. If you wish to get an explanation as to how the
                      processing for the new purpose is compatible with the original purpose, please contact
                      us at <a href="mailto:support@spocket.co">Support@spocket.co</a>
                    </p>
                    <p>
                      If we need to use your personal information for an unrelated purpose, we will notify you
                      and we will explain the legal basis which allows us to do so.
                    </p>
                    <p>
                      Please note that we may process your personal information without your knowledge or
                      consent, in compliance with the above rules, where this is required or permitted by law.
                    </p>
                  </li>
                  <li>
                    <p>DISCLOSURES OF YOUR PERSONAL INFORMATION BY US OUTSIDE OF THE SERVICES</p>
                    <p>
                      We may have to share your personal information with the parties set out below for the
                      purposes set out in the table in paragraph 4 above.
                    </p>
                    <ul>
                      <li>
                        <span>Third Party categories as set out below:</span>
                        <ul>
                          <li>Service providers who provide IT and system administration services.</li>
                          <li>Social networking sites to which you have linked your account.</li>
                          <li>
                            Professional advisers including lawyers, bankers, auditors and insurers based in
                            Canada and the United States who provide consultancy, banking, legal, insurance
                            and accounting services.
                          </li>
                          <li>
                            Regulators and other government authorities [acting as processors or joint
                            controllers based in Canada, the United States and in the EEA who require
                            reporting of processing activities in certain circumstances.
                          </li>
                        </ul>
                        <li>
                          <p>
                            Third parties to whom we may choose to sell, transfer, or merge parts of our
                            business or our assets. Alternatively, we may seek to acquire other businesses or
                            merge with them. If a change happens to our business, then the new owners may use
                            your personal information in the same way as set out in this Privacy Policy.
                          </p>
                          <p>
                            We require all third parties to respect the security of your personal information
                            and to treat it in accordance with the law. We do not allow our third-party
                            service providers to use your personal information for their own purposes and only
                            permit them to process your personal information for specified purposes and in
                            accordance with our instructions.
                          </p>
                        </li>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p>INTERNATIONAL TRANSFERS</p>
                    <p>
                      We share your personal information within our company and to our third party service
                      providers such as Amazon Web Services or other providers. This may involve transferring
                      your information internationally including without limitation, if you are based in the
                      European Union, transferring your data outside the European Economic Area{" "}
                      <strong>(EEA).</strong>
                    </p>
                    <p>
                      Many of our external third parties are also based outside the European Economic Area{" "}
                      <strong>(EEA)</strong> so their processing of your personal information will involve a
                      transfer of data outside the EEA.
                    </p>
                    <p>
                      If you are based in the European Union, whenever we transfer your personal information
                      out of the EEA, we ensure a similar degree of protection is afforded to it by ensuring
                      appropriate safeguards are implemented.
                    </p>
                    <p>
                      Please contact us if you want further information on the specific mechanism used by us
                      when transferring your personal data out of the EEA.
                    </p>
                  </li>
                  <li>
                    <p>DATA SECURITY</p>
                    <p>
                      We have put in place appropriate security measures to prevent your personal information
                      from being accidentally lost, used or accessed in an unauthorized way, altered or
                      disclosed. In addition, we limit access to your personal information to those employees,
                      agents, contractors and other third parties who have a business need to know. They will
                      only process your personal information on our instructions and they are subject to a
                      duty of confidentiality.
                    </p>
                    <p>
                      We have put in place procedures to deal with any suspected personal data breach and will
                      notify you and any applicable regulator of a breach where we are legally required to do
                      so.
                    </p>
                  </li>
                  <li>
                    <p>DATA RETENTION</p>
                    <p>
                      <strong>How long will you use my personal information for?</strong>
                    </p>
                    <p>
                      We will only retain your personal information for as long as necessary to fulfil the
                      purposes we collected it for, including for the purposes of satisfying any legal,
                      accounting, or reporting requirements.
                    </p>
                    <p>
                      To determine the appropriate retention period for personal information, we consider the
                      amount, nature, and sensitivity of the personal information, the potential risk of harm
                      from unauthorized use or disclosure of your personal information, the purposes for which
                      we process your personal information and whether we can achieve those purposes through
                      other means, and the applicable legal requirements.
                    </p>
                    <p>
                      By law we have to keep basic information about our customers (including Contact,
                      Identity, Financial and Transaction Data) for six years after they cease being customers
                      for tax and other legally required purposes.
                    </p>
                    <p>
                      In some circumstances you can ask us to delete your information: see Request erasure
                      below for further information.
                    </p>
                    <p>
                      In some circumstances we may anonymize your personal information (so that it can no
                      longer be associated with you) for research or statistical purposes in which case we may
                      use this information indefinitely without further notice to you.
                    </p>
                  </li>
                  <li>
                    <p>YOUR LEGAL RIGHTS</p>
                    <p>
                      Under certain circumstances, you have rights under data protection laws in relation to
                      your personal information. You may have the right to:
                    </p>
                    <ul>
                      <li>
                        <strong>Request access</strong> to your personal information (commonly known as a
                        “data subject access request”). This enables you to receive a copy of the personal
                        information we hold about you and to check that we are lawfully processing it.
                      </li>
                      <li>
                        <strong>Request correction</strong> of the personal information that we hold about
                        you. This enables you to have any incomplete or inaccurate information we hold about
                        you corrected, though we may need to verify the accuracy of the new information you
                        provide to us.
                      </li>
                      <li>
                        <strong>Request erasure</strong> of your personal information. This enables you to ask
                        us to delete or remove personal information where there is no good reason for us
                        continuing to process it. You also have the right to ask us to delete or remove your
                        personal information where you have successfully exercised your right to object to
                        processing (see below), where we may have processed your information unlawfully or
                        where we are required to erase your personal information to comply with local law.
                        Note, however, that we may not always be able to comply with your request of erasure
                        for specific legal reasons which will be notified to you, if applicable, at the time
                        of your request.
                      </li>
                      <li>
                        <strong>Object to processing</strong> of your personal information where we are
                        relying on a legitimate interest (or those of a third party) and there is something
                        about your particular situation which makes you want to object to processing on this
                        ground as you feel it impacts on your fundamental rights and freedoms. You also have
                        the right to object where we are processing your personal information for direct
                        marketing purposes. In some cases, we may demonstrate that we have compelling
                        legitimate grounds to process your information which override your rights and
                        freedoms.
                      </li>
                      <li>
                        <strong>Request restriction of processing</strong> of your personal information. This
                        enables you to ask us to suspend the processing of your personal information in the
                        following scenarios: (a) if you want us to establish the information’s accuracy; (b)
                        where our use of the information is unlawful but you do not want us to erase it; (c)
                        where you need us to hold the information even if we no longer require it as you need
                        it to establish, exercise or defend legal claims; or (d) you have objected to our use
                        of your information but we need to verify whether we have overriding legitimate
                        grounds to use it.
                      </li>
                      <li>
                        <strong>Request the transfer</strong> of your personal information to you or to a
                        third party. We will provide to you, or a third party you have chosen, your personal
                        information in a structured, commonly used, machine-readable format. Note that this
                        right only applies to automated information which you initially provided consent for
                        us to use or where we used the information to perform a contract with you.
                      </li>
                      <li>
                        <strong>Withdraw consent at any time</strong> where we are relying on consent to
                        process your personal information. However, this will not affect the lawfulness of any
                        processing carried out before you withdraw your consent. If you withdraw your consent,
                        we may not be able to provide certain services to you. We will advise you if this is
                        the case at the time you withdraw your consent.
                      </li>
                      <li>
                        If you wish to exercise any of the rights set out above, please contact us using the
                        details set out above.
                      </li>
                    </ul>
                    <p>
                      <strong>No fee usually required</strong>
                    </p>
                    <p>
                      You will not have to pay a fee to access your personal information (or to exercise any
                      of the other rights). However, we may charge a reasonable fee if your request is clearly
                      unfounded, repetitive or excessive. Alternatively, we may refuse to comply with your
                      request in these circumstances.
                    </p>
                    <p>
                      <strong>What we may need from you</strong>
                    </p>
                    <p>
                      We may need to request specific information from you to help us confirm your identity
                      and ensure your right to access your personal information (or to exercise any of your
                      other rights). This is a security measure to ensure that personal information is not
                      disclosed to any person who has no right to receive it. We may also contact you to ask
                      you for further information in relation to your request to speed up our response.
                    </p>
                    <p>
                      <strong>Time limit to respond</strong>
                    </p>
                    <p>
                      We try to respond to all legitimate requests within one month. Occasionally it may take
                      us longer than a month if your request is particularly complex or you have made a number
                      of requests. In this case, we will notify you and keep you updated.
                    </p>
                    <p class="mt-20">Effective date: October 12th, 2018</p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <PageFooter />
        </div>
      );
    }
  }
}

export default Privacy;



// WEBPACK FOOTER //
// ./src/components/Privacy/index.js