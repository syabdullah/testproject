import React from "react";
import PageHeader from "../PageHeader";
import PageFooter from "../PageFooter";
import { Link } from "react-router";

// import "./style.css";

class DataProcessingAddendum extends React.Component {
  componentWillMount() {
    window.location = "https://d3eyb8shadqthh.cloudfront.net/retailer/DataProcessingAddendum.pdf";
  }

  render() {
    if (false) {
      return (
        <div>
          <PageHeader title="Data Processing Addendum" />
          <div className="card s-panel mt-40">
            <div className="legal">
              <p>
                This Data Processing Addendum (
                <i>
                  "<strong>Addendum</strong>"
                </i>{" "}
                ), applies to agreements between Spocket Inc (
                <i>
                  "<strong>Spocket</strong>"
                </i>
                ), and entities who subscribe for Spocket’s services as a Retailerand who are subject to
                Applicable Law (
                <i>
                  "<strong>Retailer</strong>"
                </i>
                ) (collectively referred to as the{" "}
                <i>
                  "<strong>Parties</strong>"
                </i>
                ), sets forth the terms and conditions relating to the privacy, confidentiality and security
                of Personal Data (as defined below) associated with services to be rendered by Spocket to
                Retailer pursuant to the sign up form and Retailer <Link to="/terms">Terms</Link> entered into
                between the Parties (the{" "}
                <i>
                  "<strong>Agreement</strong>"
                </i>
                ).
              </p>
              <ol type="I">
                <li>
                  <p>
                    <strong>Definitions</strong>
                  </p>
                  <p>
                    Terms defined in the Retailer Terms shall have the same meaning in the Addendum. In
                    addition:
                  </p>
                  <ol type="A">
                    <li>
                      <p>
                        <strong>
                          <i>"Applicable Law"</i>
                        </strong>{" "}
                        means all applicable European Union (“EU”) or national laws and regulations relating
                        to the privacy, confidentiality, security and protection of Personal Data, including,
                        without limitation: the European Union (“EU”) General Data Protection Regulation
                        2016/679 (“GDPR”), with effect from 25 May 2018, and EU Member State laws
                        supplementing the GDPR; the EU Directive 2002/58/EC (“e-Privacy Directive”), as
                        replaced from time to time, and EU Member State laws implementing the e-Privacy
                        Directive, including laws regulating the use of cookies and other tracking means as
                        well as unsolicited e-mail communications.
                      </p>
                    </li>
                    <li>
                      <p>
                        <i>
                          <strong>"Data Controller"</strong>
                        </i>{" "}
                        means a person who alone or jointly with others determines the purposes and means of
                        the Processing of Personal Data.
                      </p>
                    </li>
                    <li>
                      <p>
                        <i>
                          <strong>"Data Processor"</strong>
                        </i>{" "}
                        means a person who Processes Personal Data on behalf of the Data Controller.
                      </p>
                    </li>
                    <li>
                      <p>
                        <i>
                          <strong>"Data Security Measures"</strong>
                        </i>{" "}
                        means technical and organisational measures that are aimed at ensuring a level of
                        security of Personal Data that is appropriate to the risk of the Processing, including
                        protecting Personal Data against accidental or unlawful loss, misuse, unauthorised
                        access, disclosure, alteration, destruction, and all other forms of unlawful
                        Processing, including measures to ensure the confidentiality of Personal Data.
                      </p>
                    </li>
                    <li>
                      <p>
                        <i>
                          <strong>"Data Subject"</strong>
                        </i>{" "}
                        means an identified or identifiable natural person to which the Personal Data pertain.
                      </p>
                    </li>
                    <li>
                      <p>
                        <i>
                          <strong>"Instructions"</strong>
                        </i>{" "}
                        means this Addendum and any further written agreement or documentation through which
                        the Data Controller instructs the Data Processor to perform specific Processing of
                        Personal Data.
                      </p>
                    </li>
                    <li>
                      <i>
                        <strong>"Personal Data"</strong>
                      </i>{" "}
                      means any information relating to an identified or identifiable natural person Processed
                      by Spocket in accordance with Retailer’s Instructions pursuant to this Addendum; an
                      identifiable natural person is one who can be identified, directly or indirectly, in
                      particular by reference to an identifier such as name, an identification number,
                      location data, an online identifier or to one or more factors specific to the physical,
                      physiological, genetic, mental, economic, cultural or social identity of that natural
                      person.
                    </li>
                    <li>
                      <i>
                        <strong>"Personal Data Breach"</strong>
                      </i>{" "}
                      a breach of security leading to the accidental or unlawful destruction, loss,
                      alteration, unauthorised disclosure of, or access to, Personal Data transmitted, stored
                      or otherwise Processed.
                    </li>
                    <li>
                      <p>
                        <i>
                          <strong>"Process"</strong>
                        </i>
                        ”,{" "}
                        <i>
                          <strong>"Processed"</strong>
                        </i>
                        , or{" "}
                        <i>
                          <strong>"Processing"</strong>
                        </i>{" "}
                        means any operation or set of operations performed upon Personal Data, whether or not
                        by automated means, such as collection, recording, organisation, structuring, storage,
                        adaptation or alteration, retrieval, consultation, use, disclosure by transmission,
                        dissemination or otherwise making available, alignment or combination, restriction,
                        erasure or destruction.
                      </p>
                    </li>
                    <li>
                      <p>
                        <i>
                          <strong>"Services"</strong>
                        </i>{" "}
                        means the services offered by Spocket and subscribed for by Retailer under the Master
                        Agreement.
                      </p>
                    </li>
                    <li>
                      <i>
                        <strong>"Sub-Processor"</strong>
                      </i>{" "}
                      means the entity engaged by the Data Processor or any further Sub-Processor to Process
                      Personal Data on behalf and under the authority of the Data Controller.
                    </li>
                  </ol>
                </li>
                <li>
                  <p>
                    <strong>Roles and Responsibilities of the Parties</strong>
                  </p>
                  <ol type="A">
                    <li>
                      The Parties acknowledge and agree that Retailer is acting as a Data Controller, and has
                      the sole and exclusive authority to determine the purposes and means of the Processing
                      of Personal Data Processed under this Addendum, and Spocket is acting as a Data
                      Processor on behalf and under the Instructions of Retailer.
                    </li>
                    <li>
                      Any Personal Data will at all times be and remain the sole property of Retailer and
                      Spocket will not have or obtain any rights therein.
                    </li>
                  </ol>
                </li>
                <li>
                  <p>
                    <strong>Obligation of the Spocket</strong>
                  </p>
                  <p>
                    Where Spocket acts as Data Processor on behalf of Retailer, Spocket agrees and warrants
                    to:
                  </p>
                  <ol type="A">
                    <li>
                      Process Personal Data disclosed to it by Retailer only on behalf of and in accordance
                      with the provision of the Services under the Sign-Up Form and Retailer Terms , unless
                      Spocket is otherwise required by Applicable Law, in which case Spocket shall inform
                      Retailer of that legal requirement before Processing the Personal Data, unless informing
                      the Retailer is prohibited by law on important grounds of public interest. Spocket shall
                      promptly inform Retailer if, in Spocket’s opinion, an Instruction provided infringes
                      Applicable Law.
                    </li>
                    <li>
                      Ensure that any person authorised by Spocket to Process Personal Data in the context of
                      the Services is only granted access to Personal Data on a need-to-know basis, is subject
                      to a duly enforceable contractual or statutory confidentiality obligation.
                    </li>
                    <li>
                      Spocket may stores and Processe data, including Personal Data, in Canada, the US or
                      other jurisdictions outside of the EEA. Spocket has and shall continue to enter into any
                      written agreements as are necessary (in its reasonable determination) to comply with
                      Applicable Law concerning any cross-border transfer of Personal Data, whether to or from
                      Spocket.
                    </li>
                    <li>
                      Inform Retailer promptly and without undue delay of any formal requests from Data
                      Subjects exercising their rights of access, correction or erasure of their Personal
                      Data, their right to restrict or to object to the Processing as well as their right to
                      data portability, and not respond to such requests, unless instructed by the Retailer in
                      writing to do so. Taking into account the nature of the Processing of Personal Data,
                      Spocket shall assist Retailer, by appropriate technical and organisational measures and
                      at Retailer’s cost, insofar as possible, in fulfilling Retailer’s obligations to respond
                      to a Data Subject’s request to exercise their rights with respect to their Personal
                      Data.
                    </li>
                    <li>
                      Notify Retailer immediately in writing of any subpoena or other judicial or
                      administrative order by a government authority or proceeding seeking access to or
                      disclosure of Personal Data. Retailer shall have the right to defend such action in lieu
                      of and on behalf of Spocket. Retailer may, if it so chooses, seek a protective order.
                      Spocket shall reasonably cooperate with Retailer in such defense.
                    </li>
                    <li>
                      Provide reasonable assistance to Retailer, at Retailer’s cost, in complying with
                      Retailer’s obligations under Applicable Law.
                    </li>
                    <li>
                      Maintain internal record(s) of Processing activities, copies of which shall be provided
                      to Retailer by Spocket or to supervisory authorities upon request.
                    </li>
                  </ol>
                </li>
                <li>
                  <p>
                    <strong>Transfer of Personal Information to Suppliers</strong>
                  </p>
                  <ol type="A">
                    <li>
                      Retailer expressly acknowledges that Spocket will be transferring Personal Data to
                      Suppliers on behalf of Retailer in the course of providing the Services. Suppliers are
                      not sub-contractors or sub-processors of Spocket, and it is the responsibility of
                      Retailer to ensure that it has entered into a separate, adequate data processing
                      agreement or addendum with such Supplier if so required by Applicable Law.
                    </li>
                  </ol>
                </li>
                <li>
                  <p>
                    <strong>Sub-Processing</strong>
                  </p>
                  <ol type="A">
                    <li>
                      Spocket shall not share, transfer, disclose, make available or otherwise provide access
                      to any Personal Data to any sub-conractor or sub-processor, or contract any of its
                      rights or obligations concerning Personal Data, unless Spocket has entered into a
                      written agreement with each such third party that imposes obligations on the third party
                      that are similar to those as those imposed on Spocket under this Addendum and are
                      otherwise in compliance with the requirements of Applicable Law. Spocket shall only
                      retain third parties that are capable of putting in place appropriate protection of the
                      privacy, confidentiality and security of the Personal Data in compliance with the
                      requirements of Applicable Law.
                    </li>
                  </ol>
                </li>
                <li>
                  <p>
                    <strong>Compliance with Applicable Laws</strong>
                  </p>
                  <ol type="A">
                    <li>
                      Each party covenants and undertakes to the other that it shall comply with all
                      Applicable Laws in the use of the Services.
                    </li>
                    <li>
                      Without limiting the above, Spocket is not responsible for determining the requirements
                      of laws applicable to Retailer’s business or that Spocket's provision of the Services
                      meet the requirements of such laws. As between the parties, Retailer is responsible for
                      the lawfulness of the Processing of the Retailer Personal Data. Retailer will not use
                      the Services in conjunction with Personal Data to the extent that doing so would violate
                      applicable Data Protection Laws.
                    </li>
                    <li>
                      If a Data Subject brings a claim directly against Spocket for a violation of their Data
                      Subject rights in breach of Applicable Laws and such claim does not arise from a breach
                      by Spocket of the terms of this Agreement, Retailer will indemnify Spocket for any cost,
                      charge, damages, expenses or loss arising from such a claim, to the extent that Spocket
                      has notified Retailer about the claim and given Retailer the opportunity to cooperate
                      with Spocket in the defense and settlement of the claim.
                    </li>
                  </ol>
                </li>
                <li>
                  <p>
                    <strong>Data Security</strong>
                  </p>
                  <ol type="A">
                    <li>
                      <p>
                        Spocket shall develop, maintain and implement a comprehensive written information
                        security program that complies with Applicable Law and good industry practice.
                        Spocket’s information security program shall include appropriate administrative,
                        technical, physical, organisational and operational safeguards and other security
                        measures designed to (i) ensure the security and confidentiality of Personal Data;
                        (ii) protect against any anticipated threats or hazards to the security and integrity
                        of Personal Data; and (iii) protect against any Personal Data Breach, including, as
                        appropriate:
                      </p>
                      <ol type="a">
                        <li>The encryption of the Personal Data;</li>
                        <li>
                          The ability to ensure the ongoing confidentiality, integrity, availability and
                          resilience of Processing systems and services;
                        </li>
                        <li>
                          The ability to restore the availability and access to the Personal Data in a timely
                          manner in the event of a physical or technical incident; and
                        </li>
                        <li>
                          A process for regularly testing, assessing and evaluating the effectiveness of
                          technical and organisational measures adopted pursuant to this provision for
                          ensuring the security of the Processing.
                        </li>
                      </ol>
                    </li>
                    <li>
                      Spocket shall supervise Spocket personnel to the extent required to maintain appropriate
                      privacy, confidentiality and security of Personal Data. Spocket shall provide training,
                      as appropriate, to all Spocket personnel who have access to Personal Data.
                    </li>
                    <li>
                      Promptly (and in any event within 90 days) following the expiration or earlier
                      termination of the Master Agreement, Spocket shall return to Retailer or its designee,
                      if so requested during such period, or if not so requested securely destroy or render
                      unreadable or undecipherable, each and every original and copy in every media of all
                      Personal Data in Spocket’s, its affiliates’ or their respective subcontractors’
                      possession, custody or control. In the event applicable law does not permit Spocket to
                      comply with the delivery or destruction of the Personal Data, Spocket warrants that it
                      shall ensure the confidentiality of the Personal Data and that it shall not use or
                      disclose any Personal Data after termination of this Addendum.
                    </li>
                  </ol>
                </li>
                <li>
                  <p>
                    <strong>Data Breach Notification</strong>
                  </p>
                  <ol type="A">
                    <li>
                      <p>
                        Spocket shall promptly inform Retailer in writing of any Personal Data Breach of which
                        Spocket becomes aware. The notification to Retailer shall include all available
                        information regarding such Personal Data Breach, including information on:
                      </p>
                      <ol type="a">
                        <li>
                          The nature of the Personal Data Breach including where possible, the categories and
                          approximate number of affected Data Subjects and the categories and approximate
                          number of affected Personal Data records;
                        </li>
                        <li>The likely consequences of the Personal Data Breach; and</li>
                        <li>
                          The measures taken or proposed to be taken to address the Personal Data Breach,
                          including, where appropriate, measures to mitigate its possible adverse effects.
                        </li>
                      </ol>
                      <p>
                        Spocket shall cooperate fully with Retailer in all reasonable and lawful efforts to
                        prevent, mitigate or rectify such Breach. Spocket shall provide such assistance as
                        required to enable Retailer to satisfy Retailer’s obligation to notify the relevant
                        supervisory authority and Data Subjects of a personal data breach under Articles 33
                        and 34 of the GDPR.
                      </p>
                    </li>
                  </ol>
                </li>
                <li>
                  <p>
                    <strong>Audit</strong>
                  </p>
                  <p>
                    Spocket shall on written request (but not more than once per year, other than in the event
                    of a breach) make available to Retailer all information necessary to demonstrate
                    compliance with the obligations set forth in this Addendum and, at the Retailer’s expense,
                    allow for and contribute to audits, including inspections, conducted by Retailer or
                    another auditor mandated by Retailer. Upon prior written request by Retailer (provided
                    that it shall be not more than once per year other than in the event of a breach), Spocket
                    agrees to cooperate and, within reasonable time, provide Retailer with: (a) audit reports
                    (if any) and all information necessary to demonstrate Spocket’s compliance with the
                    obligations laid down in this Addendum; and (b) confirmation that no audit, if conducted,
                    has revealed any material vulnerability in Spocket’s systems, or to the extent that any
                    such vulnerability was detected, that Spocket has fully remedied such vulnerability.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Governing Law</strong>
                  </p>
                  <p>
                    This Addendum shall be governed by the laws of the jurisdiction specified in the
                    Agreement.
                  </p>
                </li>
              </ol>
            </div>
          </div>
          <PageFooter />
        </div>
      );
    }
  }
}

export default DataProcessingAddendum;



// WEBPACK FOOTER //
// ./src/components/DataProcessingAddendum/index.js