import './index.scss';

import React from "react";
import { useLocation } from 'react-router-dom';

import { Tabs, Paper } from 'components/layout';
import {FormattedMessage} from "react-intl";

const LegalPage = () => {

    const params = new URLSearchParams(useLocation().search);

    const activeTab = params.get('tab');

    const activeTabIndex = activeTab ?
        activeTab === 'policy' ? 0 : 1
        : 0;

    return (
        <div className={ 'page legal-page' }>
            <Paper>
                <Tabs items={ [ <FormattedMessage id={'words.common.privacy-policy'}/>, <FormattedMessage id={'words.common.terms-of-use'}/> ] } initialValue={ activeTabIndex }>
                    <div className={ 'legal-page__content' }>
                        <h1 id="contents">CONTENTS</h1>
                        <h3 id="clause">CLAUSE</h3>

                        <table width="100%">
                            <tr>
                                <td> 1. Interpretation</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td> 2. Introduction</td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td> 3. Scope</td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td> 4. Personal data protection principles</td>
                                <td>4</td>
                            </tr>
                            <tr>
                                <td> 5. Lawfulness, fairness, transparency</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td> 6. Consent</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td> 7. Transparency (notifying Data Subjects)</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td> 8. Purpose limitation</td>
                                <td>7</td>
                            </tr>
                            <tr>
                                <td> 9. Data minimisation</td>
                                <td>7</td>
                            </tr>
                            <tr>
                                <td> 10. Accuracy</td>
                                <td>7</td>
                            </tr>
                            <tr>
                                <td> 11. Storage limitation</td>
                                <td>7</td>
                            </tr>
                            <tr>
                                <td> 12. Security integrity and confidentiality</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td> 13. Reporting a Personal Data Breach</td>
                                <td>9</td>
                            </tr>
                            <tr>
                                <td> 14. Transfer limitation</td>
                                <td>9</td>
                            </tr>
                            <tr>
                                <td> 15. Data Subject's rights and requests</td>
                                <td>9</td>
                            </tr>
                            <tr>
                                <td>16. Accountability</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td> 17. Record keeping</td>
                                <td>11</td>
                            </tr>
                            <tr>
                                <td> 18. Training and audit</td>
                                <td>11</td>
                            </tr>
                            <tr>
                                <td> 19. Privacy by Design and Data Protection Impact Assessment (DPIA)</td>
                                <td>11</td>
                            </tr>
                            <tr>
                                <td> 20. Automated Processing (including profiling) and Automated
                                    Decision-Making
                                </td>
                                <td>12</td>
                            </tr>
                            <tr>
                                <td> 21. Direct marketing</td>
                                <td>13</td>
                            </tr>
                            <tr>
                                <td> 22. Sharing Personal Data</td>
                                <td>13</td>
                            </tr>
                            <tr>
                                <td> 23. Changes to this Data Protection Policy</td>
                                <td>14</td>
                            </tr>
                            <tr>
                                <td> 24. Acknowledgement of receipt and review</td>
                                <td>14</td>
                            </tr>
                        </table>
                        <h3 id="1-interpretation">1. Interpretation</h3>
                        <h3 id="1-1-definitions-">1.1 Definitions:</h3>
                        <ol>
                            <li><strong>Automated Decision-Making (ADM):</strong> when a decision is made which is based
                                solely on Automated
                                Processing (including profiling) which produces legal effects or significantly affects
                                an
                                individual. The UK GDPR
                                prohibits Automated Decision-Making (unless certain conditions are met) but not
                                Automated
                                Processing.
                            </li>
                            <li><strong>Automated Processing:</strong> any form of automated processing of Personal Data
                                consisting of the use
                                of Personal Data to evaluate certain personal aspects relating to an individual, in
                                particular to analyse or
                                predict aspects concerning that individual&#39;s performance at work, economic
                                situation,
                                health, personal
                                preferences, interests, reliability, behaviour, location or movements. Profiling is an
                                example of Automated
                                Processing.
                            </li>
                            <li><strong>Company name:</strong> ACT GENERAL TRADING CO, ‘MSHFA APP’.</li>
                            <li><strong>Company Personnel:</strong> all employees, workers, [contractors, agency
                                workers,
                                consultants,]
                                directors, members and others.
                            </li>
                            <li><strong>Consent:</strong> agreement which must be freely given, specific, informed and
                                be an
                                unambiguous
                                indication of the Data Subject&#39;s wishes by which they, by a statement or by a clear
                                positive action, signify
                                agreement to the Processing of Personal Data relating to them.
                            </li>
                            <li><strong>Controller:</strong> the person or organisation that determines when, why and
                                how to
                                process Personal
                                Data. It is responsible for establishing practices and policies in line with the UK
                                GDPR. We
                                are the Controller of
                                all Personal Data relating to our Company Personnel and Personal Data used in our
                                business
                                for our own commercial
                                purposes.
                            </li>
                            <li><strong>Criminal Convictions Data:</strong> means personal data relating to criminal
                                convictions and offences
                                and includes personal data relating to criminal allegations and proceedings.
                            </li>
                            <li><strong>Data Subject:</strong> a living, identified or identifiable individual about
                                whom we
                                hold Personal Data.
                                Data Subjects may be nationals or residents of any country and may have legal rights
                                regarding their Personal
                                Data.
                            </li>
                            <li><strong>Data Privacy Impact Assessment (DPIA):</strong> tools and assessments used to
                                identify and reduce risks
                                of a data processing activity. DPIA can be carried out as part of Privacy by Design and
                                should be conducted for
                                all major system or business change programmes involving the Processing of Personal
                                Data.
                            </li>
                            <li><strong>Data Protection Officer (DPO):</strong> the person required to be appointed in
                                specific circumstances
                                under the UK GDPR. Where a mandatory DPO has not been appointed, this term means a data
                                protection manager or
                                other voluntary appointment of a DPO or refers to the Company data privacy team with
                                responsibility for data
                                protection compliance.
                            </li>
                            <li><strong>Explicit Consent:</strong> consent which requires a very clear and specific
                                statement (that is, not just
                                action).
                            </li>
                            <li><strong>UK GDPR:</strong> the retained EU law version of the General Data Protection
                                Regulation ((EU) 2016/679).
                                Personal Data is subject to the legal safeguards specified in the UK GDPR.
                            </li>
                            <li><strong>Personal Data:</strong> any information identifying a Data Subject or
                                information
                                relating to a Data
                                Subject that we can identify (directly or indirectly) from that data alone or in
                                combination
                                with other
                                identifiers we possess or can reasonably access. Personal Data includes Special
                                Categories
                                of Personal Data and
                                Pseudonymised Personal Data but excludes anonymous data or data that has had the
                                identity of
                                an individual
                                permanently removed. Personal data can be factual (for example, a name, email address,
                                location or date of birth)
                                or an opinion about that person&#39;s actions or behaviour. [Personal Data specifically
                                includes, but is not
                                limited to, [PERSONAL DATA CATEGORY LIST].]
                            </li>
                            <li><strong>Personal Data Breach:</strong> any act or omission that compromises the
                                security,
                                confidentiality,
                                integrity or availability of Personal Data or the physical, technical, administrative or
                                organisational safeguards
                                that we or our third-party service providers put in place to protect it. The loss, or
                                unauthorised access,
                                disclosure or acquisition, of Personal Data is a Personal Data Breach.
                            </li>
                            <li><strong>Privacy by Design:</strong> implementing appropriate technical and
                                organisational
                                measures in an
                                effective manner to ensure compliance with the UK GDPR.
                            </li>
                            <li><strong>Privacy Guidelines:</strong> the Company privacy and UK GDPR related guidelines
                                provided to assist in
                                interpreting and implementing this Data Protection Policy and Related Policies,
                                available
                                here: [INSERT LINK TO
                                LIST OF BUSINESS-SPECIFIC GUIDELINES OR SET OUT THESE GUIDELINES IN AN APPENDIX].
                            </li>
                            <li><strong>Privacy Notices (also referred to as Fair Processing Notices) or Privacy
                                Policies:</strong> separate
                                notices setting out information that may be provided to Data Subjects when the Company
                                collects information about
                                them. These notices may take the form of general privacy statements applicable to a
                                specific
                                group of individuals
                                (for example, employee privacy notices or the website privacy policy) or they may be
                                stand-alone, one-time privacy
                                statements covering Processing related to a specific purpose.
                            </li>
                            <li><strong>Processing or Process:</strong> any activity that involves the use of Personal
                                Data.
                                It includes
                                obtaining, recording or holding the data, or carrying out any operation or set of
                                operations
                                on the data including
                                organising, amending, retrieving, using, disclosing, erasing or destroying it.
                                Processing
                                also includes
                                transmitting or transferring Personal Data to third parties.
                            </li>
                            <li><strong> Pseudonymisation or Pseudonymised:</strong> replacing information that directly
                                or
                                indirectly
                                identifies an individual with one or more artificial identifiers or pseudonyms so that
                                the
                                person, to whom the
                                data relates, cannot be identified without the use of additional information which is
                                meant
                                to be kept separately
                                and secure.
                            </li>
                            <li><strong>Related Policies:</strong> the Company&#39;s policies, operating procedures or
                                processes related to this
                                Data Protection Policy and designed to protect Personal Data, available here: [INSERT
                                LINK
                                TO LIST OF BUSINESS
                                SPECIFIC POLICIES OR SET OUT THESE POLICIES IN AN APPENDIX].
                            </li>
                            <li><strong>Special Categories of Personal Data:</strong> information revealing racial or
                                ethnic
                                origin, political
                                opinions, religious or similar beliefs, trade union membership, physical or mental
                                health
                                conditions, sexual life,
                                sexual orientation, biometric or genetic data. [The Company will treat the following
                                types
                                of data as if they are
                                Special Categories of Personal Data: [DETAILS OF OTHER TYPES OF DATA THE COMPANY
                                CONSIDERS
                                SENSITIVE].]
                            </li>
                        </ol>
                        <h3 id="2-introduction">2. Introduction</h3>
                        <p>This Data Protection Policy sets out how ACT GENERAL TRADING CO, ‘MSHFA
                            APP&#39; (&quot;we&quot;, &quot;our&quot;,
                            &quot;us&quot;, &quot;the Company&quot;)
                            handle the Personal Data of our customers, suppliers, employees, workers and other third
                            parties.</p>
                        <p>This Data Protection Policy applies to all Personal Data we Process regardless of the media
                            on
                            which that data is stored or whether it relates to past or present employees, workers,
                            customers,
                            clients or supplier contacts, shareholders, website users or any other Data Subject.</p>
                        <p>This Data Protection Policy applies to all Company Personnel
                            (&quot;you&quot;, &quot;your&quot;).
                            You must read,
                            understand and comply with this Data Protection Policy when Processing Personal Data on our
                            behalf and attend training on its requirements. This Data Protection Policy sets out what we
                            expect
                            from you for the Company to comply with applicable law. Your compliance with this Data
                            Protection
                            Policy is mandatory. Related Policies and Privacy Guidelines are available to help you
                            interpret
                            and
                            act in accordance with this Data Protection Policy. You must also comply with all such
                            Related
                            Policies and Privacy Guidelines. Any breach of this Data Protection Policy may result in
                            disciplinary
                            action.</p>
                        <p>Where you have a specific responsibility in connection with Processing such as capturing
                            Consent,
                            reporting a Personal Data Breach, conducting a DPIA as referenced in this Data Protection
                            Policy
                            or
                            otherwise then you must comply with the Related Policies and Privacy Guidelines.</p>
                        <p>This Data Protection Policy (together with Related Policies and Privacy Guidelines) is an
                            internal
                            document and cannot be shared with third parties, clients or regulators without prior
                            authorisation
                            from the DPO.</p>
                        <h3 id="3-scope">3. Scope</h3>
                        <p>We recognise that the correct and lawful treatment of Personal Data will maintain confidence
                            in
                            the organisation
                            and will provide for successful business operations. Protecting the confidentiality and
                            integrity of Personal Data
                            is a critical responsibility that we take seriously at all times. The Company is exposed to
                            potential fines of up to
                            £17.5 million or 4% of total worldwide annual turnover, whichever is higher and depending on
                            the
                            breach, for failure
                            to comply with the provisions of the UK GDPR.</p>
                        <p>All [CEOs,] [individual business areas,] [units,] [departments,] [supervisors,] [[OTHER
                            RESPONSIBLE PARTIES]] are
                            responsible for ensuring all Company Personnel comply with this Data Protection Policy and
                            need
                            to implement
                            appropriate practices, processes, controls and training to ensure that compliance. </p>
                        <p>The DPO is responsible for overseeing this Data Protection Policy and, as applicable,
                            developing
                            Related Policies
                            and Privacy Guidelines. [That post is held by [NAME], [DEPARTMENT], [TELEPHONE EXTENSION],
                            [EMAIL ADDRESS].] </p>
                        <p>Please contact the DPO with any questions about the operation of this Data Protection Policy
                            or
                            the UK GDPR or if
                            you have any concerns that this Data Protection Policy is not being or has not been
                            followed. In
                            particular, you
                            must always contact the DPO in the following circumstances:</p>
                        <p> (a) if you are unsure of the lawful basis which you are relying on to process Personal Data
                            (including the
                            legitimate interests used by the Company) (see 5.1)</p>
                        <p> (b) if you need to rely on Consent and/or need to capture Explicit Consent (see 6);</p>
                        <p> (c) if you need to draft Privacy Notices (see 7);</p>
                        <p> (d) if you are unsure about the retention period for the Personal Data being Processed (see
                            11);</p>
                        <p> (e) if you are unsure about what security or other measures you need to implement to protect
                            Personal Data (see
                            12.1);</p>
                        <p> (f) if there has been a Personal Data Breach (13);</p>
                        <p> (g) if you are unsure on what basis to transfer Personal Data outside the UK (see 14);</p>
                        <p> (h) if you need any assistance dealing with any rights invoked by a Data Subject (see
                            15); </p>
                        <p> (i) whenever you are engaging in a significant new, or change in, Processing activity which
                            is
                            likely to require a
                            DPIA (see 19) or plan to use Personal Data for purposes other than what it was collected
                            for;</p>
                        <p> (j) if you plan to undertake any activities involving Automated Processing including
                            profiling
                            or Automated
                            Decision-Making (see 20);</p>
                        <p> (k) if you need help complying with applicable law when carrying out direct marketing
                            activities
                            (see 21); or</p>
                        <p> (l) if you need help with any contracts or other areas in relation to sharing Personal Data
                            with
                            third parties
                            (including our vendors) (see 22).</p>
                        <h3 id="4-personal-data-protection-principles">4. Personal data protection principles</h3>
                        <p> We adhere to the principles relating to Processing of Personal Data set out in the UK GDPR
                            which
                            require Personal
                            Data to be:</p>
                        <p>(a) Processed lawfully, fairly and in a transparent manner (Lawfulness, Fairness and
                            Transparency); </p>
                        <p>(b) collected only for specified, explicit and legitimate purposes (Purpose Limitation);</p>
                        <p>(c) adequate, relevant and limited to what is necessary in relation to the purposes for which
                            it
                            is Processed (Data
                            Minimisation);</p>
                        <p>(d) accurate and where necessary kept up to date (Accuracy);</p>
                        <p>(e) not kept in a form which permits identification of Data Subjects for longer than is
                            necessary
                            for the purposes
                            for which the data is Processed (Storage Limitation);</p>
                        <p>(f) Processed in a manner that ensures its security using appropriate technical and
                            organisational measures to
                            protect against unauthorised or unlawful Processing and against accidental loss, destruction
                            or
                            damage (Security,
                            Integrity and Confidentiality);</p>
                        <p>(g) not transferred to another country without appropriate safeguards being in place
                            (Transfer
                            Limitation);and</p>
                        <p>(h) made available to Data Subjects and allow Data Subjects to exercise certain rights in
                            relation to their
                            Personal Data (Data Subject&#39;s Rights and Requests).</p>
                        <h3 id="5-lawfulness-fairness-transparency">5 Lawfulness, fairness, transparency</h3>
                        <h3 id="5-1-lawfulness-and-fairness">5.1 Lawfulness and fairness</h3>
                        <p>Personal data must be Processed lawfully, fairly and in a transparent manner in relation to
                            the
                            Data Subject.</p>
                        <p>You may only collect, Process and share Personal Data fairly and lawfully and for specified
                            purposes. The UK GDPR
                            restricts our actions regarding Personal Data to specified lawful purposes. These
                            restrictions
                            are not intended to
                            prevent Processing but ensure that we Process Personal Data fairly and without adversely
                            affecting the Data Subject.
                        </p>
                        <p>The UK GDPR allows Processing for specific purposes, some of which are set out below:</p>
                        <p>(a) the Data Subject has given his or her Consent;</p>
                        <p>(b) the Processing is necessary for the performance of a contract with the Data Subject;</p>
                        <p>(c) to meet our legal compliance obligations;</p>
                        <p>(d) to protect the Data Subject&#39;s vital interests;</p>
                        <p>(e) to pursue our legitimate interests for purposes where they are not overridden because the
                            Processing prejudices
                            the interests or fundamental rights and freedoms of Data Subjects. The purposes for which we
                            process Personal Data
                            for legitimate interests need to be set out in applicable Privacy Notices; or</p>
                        <p>(f) [OTHER UK GDPR PROCESSING GROUNDS].</p>
                        <p>You must identify and document the legal ground being relied on for each Processing activity
                            [in
                            accordance with
                            the Company&#39;s guidelines on Lawful Basis for Processing Personal Data].</p>
                        <h3 id="6-consent">6. Consent</h3>
                        <p>A Controller must only process Personal Data on the basis of one or more of the lawful bases
                            set
                            out in the UK
                            GDPR, which include Consent.</p>
                        <p>A Data Subject consents to Processing of their Personal Data if they indicate agreement
                            clearly
                            either by a
                            statement or positive action to the Processing. Consent requires affirmative action so
                            silence,
                            pre-ticked boxes or
                            inactivity are unlikely to be sufficient. If Consent is given in a document which deals with
                            other matters, then the
                            Consent must be kept separate from those other matters.</p>
                        <p>Data Subjects must be easily able to withdraw Consent to Processing at any time and
                            withdrawal
                            must be promptly
                            honoured. Consent may need to be refreshed if you intend to Process Personal Data for a
                            different and incompatible
                            purpose which was not disclosed when the Data Subject first consented.</p>
                        <p>When processing Special Category Data or Criminal Convictions Data, we will usually rely on a
                            legal basis for
                            processing other than Explicit Consent or Consent if possible. Where Explicit Consent is
                            relied
                            on, you must issue a
                            Privacy Notice to the Data Subject to capture Explicit Consent. </p>
                        <p>You will need to evidence Consent captured and keep records of all Consents in accordance
                            with
                            Related Policies and
                            Privacy Guidelines so that the Company can demonstrate compliance with Consent
                            requirements.</p>
                        <h3 id="7-transparency-notifying-data-subjects-">7 Transparency (notifying Data Subjects)</h3>
                        <p>The UK GDPR requires Controllers to provide detailed, specific information to Data Subjects
                            depending on whether
                            the information was collected directly from Data Subjects or from elsewhere. The information
                            must be provided
                            through appropriate Privacy Notices which must be concise, transparent, intelligible, easily
                            accessible, and in
                            clear and plain language so that a Data Subject can easily understand them.</p>
                        <p>Whenever we collect Personal Data directly from Data Subjects, including for human resources
                            or
                            employment
                            purposes, we must provide the Data Subject with all the information required by the UK GDPR
                            including the identity
                            of the Controller and DPO, how and why we will use, Process, disclose, protect and retain
                            that
                            Personal Data through
                            a Privacy Notice which must be presented when the Data Subject first provides the Personal
                            Data. </p>
                        <p>When Personal Data is collected indirectly (for example, from a third party or publicly
                            available
                            source), we must
                            provide the Data Subject with all the information required by the UK GDPR as soon as
                            possible
                            after collecting or
                            receiving the data. We must also check that the Personal Data was collected by the third
                            party
                            in accordance with
                            the UK GDPR and on a basis which contemplates our proposed Processing of that Personal
                            Data. </p>
                        <p>If you are collecting Personal Data from Data Subjects, directly or indirectly, then you must
                            provide Data Subjects
                            with a Privacy Notice in accordance with our Related Policies and Privacy Guidelines. </p>
                        <p> [You must comply with the Company&#39;s guidelines on drafting Privacy Notices.]</p>
                        <h3 id="8-purpose-limitation">8 Purpose limitation</h3>
                        <p>Personal Data must be collected only for specified, explicit and legitimate purposes. It must
                            not
                            be further
                            Processed in any manner incompatible with those purposes. </p>
                        <p>You cannot use Personal Data for new, different or incompatible purposes from that disclosed
                            when
                            it was first
                            obtained unless you have informed the Data Subject of the new purposes and they have
                            Consented
                            where necessary.</p>
                        <h3 id="9-data-minimisation">9 Data minimisation</h3>
                        <p>Personal Data must be adequate, relevant and limited to what is necessary in relation to the
                            purposes for which it
                            is Processed.</p>
                        <p>You may only Process Personal Data when performing your job duties requires it. You cannot
                            Process Personal Data
                            for any reason unrelated to your job duties.</p>
                        <p>You may only collect Personal Data that you require for your job duties: do not collect
                            excessive
                            data. Ensure any
                            Personal Data collected is adequate and relevant for the intended purposes.</p>
                        <p>You must ensure that when Personal Data is no longer needed for specified purposes, it is
                            deleted
                            or anonymised in
                            accordance with the Company&#39;s data retention guidelines. </p>
                        <h3 id="10-accuracy">10 Accuracy</h3>
                        <p>Personal Data must be accurate and, where necessary, kept up to date. It must be corrected or
                            deleted without delay
                            when inaccurate.</p>
                        <p>You will ensure that the Personal Data we use and hold is accurate, complete, kept up to date
                            and
                            relevant to the
                            purpose for which we collected it. You must check the accuracy of any Personal Data at the
                            point
                            of collection and
                            at regular intervals afterwards. You must take all reasonable steps to destroy or amend
                            inaccurate or out-of-date
                            Personal Data.</p>
                        <h3 id="11-storage-limitation">11 Storage limitation</h3>
                        <p>Personal Data must not be kept in an identifiable form for longer than is necessary for the
                            purposes for which the
                            data is processed.</p>
                        <p>The Company will maintain retention policies and procedures to ensure Personal Data is
                            deleted
                            after a reasonable
                            time for the purposes for which it was being held, unless a law requires that data to be
                            kept
                            for a minimum time.
                            [You must comply with the Company&#39;s guidelines on Data Retention.]</p>
                        <p>You must not keep Personal Data in a form which permits the identification of the Data
                            Subject
                            for longer than
                            needed for the legitimate business purpose or purposes for which we originally collected it
                            including for the
                            purpose of satisfying any legal, accounting or reporting requirements.</p>
                        <p>You will take all reasonable steps to destroy or erase from our systems all Personal Data
                            that we
                            no longer require
                            in accordance with all the Company&#39;s applicable records retention schedules and
                            policies.
                            This includes
                            requiring third parties to delete that data where applicable. </p>
                        <p>You will ensure Data Subjects are informed of the period for which data is stored and how
                            that
                            period is determined
                            in any applicable Privacy Notice. </p>
                        <h3 id="12-security-integrity-and-confidentiality">12 Security integrity and
                            confidentiality</h3>
                        <h3 id="12-1-protecting-personal-data">12.1 Protecting Personal Data</h3>
                        <p>Personal Data must be secured by appropriate technical and organisational measures against
                            unauthorised or unlawful
                            Processing, and against accidental loss, destruction or damage.</p>
                        <p>We will develop, implement and maintain safeguards appropriate to our size, scope and
                            business,
                            our available
                            resources, the amount of Personal Data that we own or maintain on behalf of others and
                            identified risks (including
                            use of encryption and Pseudonymisation where applicable). We will regularly evaluate and
                            test
                            the effectiveness of
                            those safeguards to ensure security of our Processing of Personal Data. You are responsible
                            for
                            protecting the
                            Personal Data we hold. You must implement reasonable and appropriate security measures
                            against
                            unlawful or
                            unauthorised Processing of Personal Data and against the accidental loss of, or damage to,
                            Personal Data. You must
                            exercise particular care in protecting Special Categories of Personal Data and Criminal
                            Convictions Data from loss
                            and unauthorised access, use or disclosure.</p>
                        <p>You must follow all procedures and technologies we put in place to maintain the security of
                            all
                            Personal Data from
                            the point of collection to the point of destruction. You may only transfer Personal Data to
                            third-party service
                            providers who agree to comply with the required policies and procedures and who agree to put
                            adequate measures in
                            place, as requested.</p>
                        <p>You must maintain data security by protecting the confidentiality, integrity and availability
                            of
                            the Personal Data,
                            defined as follows:</p>
                        <p>(a) Confidentiality means that only people who have a need to know and are authorised to use
                            the
                            Personal Data can
                            access it;</p>
                        <p>(b) Integrity means that Personal Data is accurate and suitable for the purpose for which it
                            is
                            processed; and</p>
                        <p>(c) Availability means that authorised users are able to access the Personal Data when they
                            need
                            it for authorised
                            purposes.</p>
                        <p>You must [comply with all applicable aspects of our [INFORMATION SECURITY PROGRAMME] [and
                            [INFORMATION SECURITY
                            POLICY]] OR comply with and not attempt to circumvent the administrative, physical and
                            technical
                            safeguards we
                            implement and maintain in accordance with the UK GDPR and relevant standards to protect
                            Personal
                            Data]. </p>
                        <h3 id="13-reporting-a-personal-data-breach">13 Reporting a Personal Data Breach</h3>
                        <p>The UK GDPR requires Controllers to notify any Personal Data Breach to the Information
                            Commissioner and, in certain
                            instances, the Data Subject.</p>
                        <p>We have put in place procedures to deal with any suspected Personal Data Breach and will
                            notify
                            Data Subjects or
                            any applicable regulator where we are legally required to do so.</p>
                        <p>If you know or suspect that a Personal Data Breach has occurred, do not attempt to
                            investigate
                            the matter yourself.
                            Immediately contact the person or team designated as the key point of contact for Personal
                            Data
                            Breaches ([the DPO
                            OR the information technology or security department OR the legal department OR [OTHER]])
                            [and
                            follow the [SECURITY
                            INCIDENT RESPONSE PLAN]]. You should preserve all evidence relating to the potential
                            Personal
                            Data Breach. </p>
                        <h3 id="14-transfer-limitation">14 Transfer limitation</h3>
                        <p>The UK GDPR restricts data transfers to countries outside the UK to ensure that the level of
                            data
                            protection
                            afforded to individuals by the UK GDPR is not undermined. You transfer Personal Data
                            originating
                            in one country
                            across borders when you transmit, send, view or access that data in or to a different
                            country. </p>
                        <p>You may only transfer Personal Data outside the UK if one of the following conditions
                            applies:</p>
                        <p>(a) the UK has issued regulations confirming that the country to which we transfer the
                            Personal
                            Data ensures an
                            adequate level of protection for the Data Subject&#39;s rights and freedoms; </p>
                        <p>(b) appropriate safeguards are in place such as binding corporate rules (BCR), standard
                            contractual clauses
                            approved for use in the UK, an approved code of conduct or a certification mechanism, a copy
                            of
                            which can be
                            obtained from the DPO;</p>
                        <p>(c) the Data Subject has provided Explicit Consent to the proposed transfer after being
                            informed
                            of any potential
                            risks; or</p>
                        <p>(d) the transfer is necessary for one of the other reasons set out in the UK GDPR including
                            the
                            performance of a
                            contract between us and the Data Subject, reasons of public interest, to establish, exercise
                            or
                            defend legal claims
                            or to protect the vital interests of the Data Subject where the Data Subject is physically
                            or
                            legally incapable of
                            giving Consent and, in some limited cases, for our legitimate interest.</p>
                        <p>[You must comply with the Company&#39;s guidelines on cross-border data transfers.]</p>
                        <h3 id="15-data-subject-s-rights-and-requests">15 Data Subject&#39;s rights and requests</h3>
                        <p>Data Subjects have rights when it comes to how we handle their Personal Data. These include
                            rights to:</p>
                        <p>(a) withdraw Consent to Processing at any time;</p>
                        <p>(b) receive certain information about the Controller&#39;s Processing activities;</p>
                        <p>(c) request access to their Personal Data that we hold;</p>
                        <p>(d) prevent our use of their Personal Data for direct marketing purposes; </p>
                        <p>(e) ask us to erase Personal Data if it is no longer necessary in relation to the purposes
                            for
                            which it was
                            collected or Processed or to rectify inaccurate data or to complete incomplete data; </p>
                        <p>(f) restrict Processing in specific circumstances;</p>
                        <p>(g) challenge Processing which has been justified on the basis of our legitimate interests or
                            in
                            the public
                            interest;</p>
                        <p>(h) request a copy of an agreement under which Personal Data is transferred outside of the
                            UK;</p>
                        <p>(i) object to decisions based solely on Automated Processing, including profiling (ADM);</p>
                        <p>(j) prevent Processing that is likely to cause damage or distress to the Data Subject or
                            anyone
                            else;</p>
                        <p>(k) be notified of a Personal Data Breach which is likely to result in high risk to their
                            rights
                            and freedoms;</p>
                        <p>(l) make a complaint to the supervisory authority;</p>
                        <p>(m) in limited circumstances, receive or ask for their Personal Data to be transferred to a
                            third
                            party in a
                            structured, commonly used and machine-readable format; and</p>
                        <p>(n) [ANY OTHER RIGHTS YOUR TYPE OF BUSINESS MAY BE REQUIRED TO PROVIDE UNDER THE UK GDPR OR
                            COMPANY POLICY.]</p>
                        <p>You must verify the identity of an individual requesting data under any of the rights listed
                            above (do not allow
                            third parties to persuade you into disclosing Personal Data without proper
                            authorisation). </p>
                        <p>You must immediately forward any Data Subject request you receive to [your supervisor OR the
                            DPO]
                            [and comply with
                            the company&#39;s Data Subject response process].</p>
                        <h3 id="16-accountability">16 Accountability</h3>
                        <p>The Controller must implement appropriate technical and organisational measures in an
                            effective
                            manner, to ensure
                            compliance with data protection principles. The Controller is responsible for, and must be
                            able
                            to demonstrate,
                            compliance with the data protection principles.</p>
                        <p>The Company must have adequate resources and controls in place to ensure and to document UK
                            GDPR
                            compliance
                            including:</p>
                        <p>(a) appointing a suitably qualified DPO (where necessary) and an executive accountable for
                            data
                            privacy; </p>
                        <p>(b) implementing Privacy by Design when Processing Personal Data and completing DPIAs where
                            Processing presents a
                            high risk to rights and freedoms of Data Subjects; </p>
                        <p>(c) integrating data protection into internal documents including this Data Protection
                            Policy,
                            Related Policies,
                            Privacy Guidelines or Privacy Notices;</p>
                        <p>(d) regularly training Company Personnel on the UK GDPR, this Data Protection Policy, Related
                            Policies and Privacy
                            Guidelines and data protection matters including, for example, Data Subject&#39;s rights,
                            Consent, legal basis, DPIA
                            and Personal Data Breaches. The Company must maintain a record of training attendance by
                            Company
                            Personnel; and </p>
                        <p>(e) regularly testing the privacy measures implemented and conducting periodic reviews and
                            audits
                            to assess
                            compliance, including using results of testing to demonstrate compliance improvement
                            effort.</p>
                        <h3 id="17-record-keeping">17 Record keeping</h3>
                        <p>The UK GDPR requires us to keep full and accurate records of all our data Processing
                            activities. </p>
                        <p>You must keep and maintain accurate corporate records reflecting our Processing including
                            records
                            of Data
                            Subjects&#39; Consents and procedures for obtaining Consents [in accordance with the
                            Company&#39;s record-keeping
                            guidelines].</p>
                        <p>These records should include, at a minimum, the name and contact details of the Controller
                            and
                            the DPO, clear
                            descriptions of the Personal Data types, Data Subject types, Processing activities,
                            Processing
                            purposes, third-party
                            recipients of the Personal Data, Personal Data storage locations, Personal Data transfers,
                            the
                            Personal Data&#39;s
                            retention period and a description of the security measures in place. To create the records,
                            data maps should be
                            created which should include the detail set out above together with appropriate data
                            flows. </p>
                        <h3 id="18-training-and-audit">18 Training and audit</h3>
                        <p>We are required to ensure all Company Personnel have undergone adequate training to enable
                            them
                            to comply with data
                            privacy laws. We must also regularly test our systems and processes to assess
                            compliance. </p>
                        <p>You must undergo all mandatory data privacy related training and ensure your team undergo
                            similar
                            mandatory
                            training [in accordance with the Company&#39;s mandatory training guidelines].</p>
                        <p>You must regularly review all the systems and processes under your control to ensure they
                            comply
                            with this Data
                            Protection Policy and check that adequate governance controls and resources are in place to
                            ensure proper use and
                            protection of Personal Data. </p>
                        <h3 id="privacy-by-design-and-data-protection-impact-assessment-dpia-">Privacy by Design and
                            Data
                            Protection Impact
                            Assessment (DPIA)</h3>
                        <p>We are required to implement Privacy by Design measures when Processing Personal Data by
                            implementing appropriate
                            technical and organisational measures (like Pseudonymisation) in an effective manner, to
                            ensure
                            compliance with data
                            privacy principles. </p>
                        <p>You must assess what Privacy by Design measures can be implemented on all programmes, systems
                            or
                            processes that
                            Process Personal Data by taking into account the following:</p>
                        <ul>
                            <li>the state of the art;</li>
                            <li>the cost of implementation;</li>
                            <li>the nature, scope, context and purposes of Processing; and</li>
                            <li>the risks of varying likelihood and severity for rights and freedoms of Data Subjects
                                posed
                                by the Processing.
                            </li>
                        </ul>
                        <p> Controllers must also conduct DPIAs in respect to high-risk Processing.</p>
                        <p>You should conduct a DPIA (and discuss your findings with the DPO) when implementing major
                            system
                            or business
                            change programs involving the Processing of Personal Data including:</p>
                        <ul>
                            <li>use of new technologies (programs, systems or processes), or changing technologies
                                (programs, systems or
                                processes);
                            </li>
                            <li>Automated Processing including profiling and ADM;</li>
                            <li>large-scale Processing of Special Categories of Personal Data or Criminal Convictions
                                Data;
                                and
                            </li>
                            <li>large-scale, systematic monitoring of a publicly accessible area.</li>
                        </ul>
                        <p>A DPIA must include:</p>
                        <ul>
                            <li>a description of the Processing, its purposes and the Controller&#39;s legitimate
                                interests
                                if appropriate;
                            </li>
                            <li>an assessment of the necessity and proportionality of the Processing in relation to its
                                purpose;
                            </li>
                            <li>an assessment of the risk to individuals; and</li>
                            <li>the risk mitigation measures in place and demonstration of compliance.</li>
                        </ul>
                        <p>[You must comply with the Company&#39;s guidelines on DPIA and Privacy by Design.] </p>
                        <h3 id="20-automated-processing-including-profiling-and-automated-decision-making">20 Automated
                            Processing (including
                            profiling) and Automated Decision-Making</h3>
                        <p>Generally, ADM is prohibited when a decision has a legal or similar significant effect on an
                            individual unless:</p>
                        <p>(a) a Data Subject has Explicitly Consented; </p>
                        <p>(b) the Processing is authorised by law; or </p>
                        <p>(c) the Processing is necessary for the performance of or entering into a contract. </p>
                        <p>If certain types of Special Categories of Personal Data or Criminal Convictions Data are
                            being
                            processed, then
                            grounds (b) or (c) will not be allowed but the Special Categories of Personal Data and
                            Criminal
                            Convictions Data can
                            be Processed where it is necessary (unless less intrusive means can be used) for substantial
                            public interest like
                            fraud prevention.</p>
                        <p>If a decision is to be based solely on Automated Processing (including profiling), then Data
                            Subjects must be
                            informed when you first communicate with them of their right to object. This right must be
                            explicitly brought to
                            their attention and presented clearly and separately from other information. Further,
                            suitable
                            measures must be put
                            in place to safeguard the Data Subject&#39;s rights and freedoms and legitimate
                            interests.</p>
                        <p>We must also inform the Data Subject of the logic involved in the decision making or
                            profiling,
                            the significance
                            and envisaged consequences and give the Data Subject the right to request human
                            intervention,
                            express their point of
                            view or challenge the decision. </p>
                        <p>A DPIA must be carried out before any Automated Processing (including profiling) or ADM
                            activities are undertaken.
                        </p>
                        <p> [Where you are involved in any data Processing activity that involves profiling or ADM, you
                            must
                            comply with the
                            Company&#39;s guidelines on profiling or ADM.]</p>
                        <h3 id="21-direct-marketing">21 Direct marketing</h3>
                        <p>We are subject to certain rules and privacy laws when marketing to our customers.</p>
                        <p>For example, a Data Subject&#39;s prior consent is required for electronic direct marketing
                            (for
                            example,
                            by email, text or automated calls). The limited exception for existing customers known
                            as &quot;soft opt-
                            in&quot; allows organisations to send marketing texts or emails if they have obtained
                            contact
                            details in the
                            course of a sale to that person, they are marketing similar products or services, and they
                            gave
                            the
                            person an opportunity to opt out of marketing when first collecting the details and in every
                            subsequent message.</p>
                        <p>The right to object to direct marketing must be explicitly offered to the Data Subject in an
                            intelligible
                            manner so that it is clearly distinguishable from other information.</p>
                        <p>A Data Subject&#39;s objection to direct marketing must be promptly honoured. If a customer
                            opts
                            out at
                            any time, their details should be suppressed as soon as possible. Suppression involves
                            retaining
                            just enough information to ensure that marketing preferences are respected in the
                            future.</p>
                        <p>[You must comply with the Company&#39;s guidelines on direct marketing to customers.]</p>
                        <h3 id="22-sharing-personal-data">22 Sharing Personal Data</h3>
                        <p>Generally we are not allowed to share Personal Data with third parties unless certain
                            safeguards
                            and contractual
                            arrangements have been put in place. </p>
                        <p>You may only share the Personal Data we hold with another employee, agent or representative
                            of
                            our group (which
                            includes our subsidiaries and our ultimate holding company along with its subsidiaries) if
                            the
                            recipient has a
                            job-related need to know the information and the transfer complies with any applicable
                            cross-border transfer
                            restrictions.</p>
                        <p>You may only share the Personal Data we hold with third parties, such as our service
                            providers,
                            if:</p>
                        <p>(a) they have a need to know the information for the purposes of providing the contracted
                            services; </p>
                        <p>(b) sharing the Personal Data complies with the Privacy Notice provided to the Data Subject
                            and,
                            if required, the
                            Data Subject&#39;s Consent has been obtained;</p>
                        <p>(c) the third party has agreed to comply with the required data security standards, policies
                            and
                            procedures and put
                            adequate security measures in place;</p>
                        <p>(d) the transfer complies with any applicable cross-border transfer restrictions; and </p>
                        <p>(e) a fully executed written contract that contains UK GDPR-approved third party clauses has
                            been
                            obtained.</p>
                        <p>[You must comply with the Company&#39;s guidelines on sharing data with third parties.]</p>
                        <h3 id="23-changes-to-this-data-protection-policy">23 Changes to this Data Protection
                            Policy</h3>
                        <p>We keep this Data Protection Policy under regular review. [This version was last updated on
                            [DATE]. [Historic versions [are archived here [LINK] OR can be obtained by contacting
                            us].]]</p>
                        <p>This Data Protection Policy does not override any applicable national data privacy laws and
                            regulations in countries where the Company operates. [Certain countries may have localised
                            variances to this Data Protection Policy which are available on request to the DPO.]</p>
                        <h3 id="24-acknowledgement-of-receipt-and-review">24 Acknowledgement of receipt and review</h3>
                        <p>I, acknowledge that on 13/09/21, I received and read a copy of the ACT GENERAL TRADING CO,
                            ‘MSHFA
                            APP’ 13/09/21,
                            dated 13/09/21 and understand that I am responsible for knowing and abiding by its terms. [I
                            understand that the
                            information in this Data Protection Policy is intended to help [Company Personnel] work
                            together
                            effectively on
                            assigned job responsibilities and assist in the use and protection of Personal Data.] This
                            Data
                            Protection Policy
                            does not set terms or conditions of employment or form part of an employment contract.</p>
                        <p>Signed …………………………</p>
                        <p>Printed Name …………………</p>
                        <p>Date …………………………...</p>
                    </div>
                    <div className={ 'legal-page__content' }>
                        <h3 id="informed-consent-of-services">Informed Consent of Services</h3>
                        <p>Delivering telemedicine services involves the use of electronic communications to enable
                            healthcare providers at different locations to share individual patient medical information
                            for the purpose of improving patient care. Providers may include primary care practitioners,
                            specialists, subspecialists, and/or other allied healthcare professionals. The information
                            may be used for diagnosis, therapy, follow-up and/or education, and may include any of the
                            following:</p>
                        <ul>
                            <li><p>Patient medical records</p>
                            </li>
                            <li><p>Medical images</p>
                            </li>
                            <li><p>Medical test results</p>
                            </li>
                            <li><p>Live two-way audio and video</p>
                            </li>
                            <li><p>Output data from medical devices and sound and video files</p>
                            </li>
                        </ul>
                        <p>Electronic systems used will incorporate network and software security protocols to protect
                            the confidentiality of patient identification and imaging data and will include measures to
                            safeguard the data and to ensure its integrity against intentional or unintentional
                            corruption.</p>
                        <p>Responsibility for the patient care should remain with the patient’s local clinician, if you
                            have one, as does the patient’s medical record.</p>
                        <h3 id="expected-benefits">Expected Benefits</h3>
                        <p>Improved access to medical care by enabling a patient to remain in his/her local healthcare
                            site (i.e. home) while the physician consults and obtains test results at distant/other
                            sites.</p>
                        <p>More efficient medical evaluation and management.</p>
                        <p>Obtaining expertise of a specialist.</p>
                        <h3 id="possible-risks-">Possible Risks:</h3>
                        <p>As with any medical procedure, there are potential risks associated with the use of
                            telemedicine. These risks include, but may not be limited to:</p>
                        <p>In rare cases, the consultant may determine that the transmitted information is of inadequate
                            quality, thus necessitating a face-to-face meeting with the patient, or at least a
                            rescheduled video consult;</p>
                        <p>Delays in medical evaluation and treatment could occur due to deficiencies or failures of the
                            equipment;</p>
                        <p>In very rare instances, security protocols could fail, causing a breach of privacy of
                            personal medical information;</p>
                        <p>In rare cases, a lack of access to complete medical records may result in adverse drug
                            interactions or allergic reactions or other judgment errors; By checking the box associated
                            with “Informed Consent”, you acknowledge that you understand and agree with the
                            following:</p>
                        <ul>
                            <li><p>I understand that the laws that protect privacy and the confidentiality of medical
                                information also apply to telemedicine, and that no information obtained in the use of
                                telemedicine, which identifies me, will be disclosed to researchers or other entities
                                without my consent.</p>
                            </li>
                            <li><p>I understand that I have the right to withhold or withdraw my consent to the use of
                                telemedicine in the course of my care at any time, without affecting my right to future
                                care or treatment.</p>
                            </li>
                            <li><p>I understand the alternatives to telemedicine consultation as they have been
                                explained to me, and in choosing to participate in a telemedicine consultation, I
                                understand that some parts of the exam involving physical tests may be conducted by
                                individuals at my location, or at a testing facility, at the direction of the consulting
                                healthcare provider.</p>
                            </li>
                            <li><p>I understand that telemedicine may involve electronic communication of my personal
                                medical information to other medical practitioners who may be located in other areas,
                                including out of state.</p>
                            </li>
                            <li><p>I understand that I may expect the anticipated benefits from the use of telemedicine
                                in my care, but that no results can be guaranteed or assured.</p>
                            </li>
                            <li><p>I understand that my healthcare information may be shared with other individuals for
                                scheduling and billing purposes. Others may also be present during the consultation
                                other than my healthcare provider and consulting healthcare provider in order to operate
                                the video equipment. The above mentioned people will all maintain confidentiality of the
                                information obtained. I further understand that I will be informed of their presence in
                                the consultation and thus will have the right to request the following: (1) omit
                                specific details of my medical history/physical examination that are personally
                                sensitive to me; (2) ask non-medical personnel to leave the telemedicine examination
                                room; and/or (3) terminate the consultation at any time.</p>
                            </li>
                        </ul>
                        <h3 id="patient-consent-to-the-use-of-telemedicine">Patient Consent To The Use of
                            Telemedicine</h3>
                        <p>I have read and understand the information provided above regarding telemedicine, have
                            discussed it with my physician or such assistants as may be designated, and all of my
                            questions have been answered to my satisfaction.</p>
                        <p>I have read this document carefully, and understand the risks and benefits of the
                            teleconferencing consultation and have had my questions regarding the procedure explained
                            and I hereby give my informed consent to participate in a telemedicine visit under the terms
                            described herein.</p>
                        <p>By checking the box containing “INFORMED CONSENT FOR TELEMEDICINE SERVICES” I hereby state
                            that I have read, understood, and agree to the terms of this document.</p>
                        <h3 id="please-read-these-terms-of-service-carefully">PLEASE READ THESE TERMS OF SERVICE
                            CAREFULLY</h3>
                        <p>These terms of service (“Terms of Service”) apply to and govern your access to and use of any
                            website (“Site”) owned or operated by ACT General Trading Co, ‘MSHFA App’. (“ACT General
                            Trading Co, ‘MSHFA App’”, “we” or “us”). By using the “Site”, you agree to be bound by these
                            Terms of Service and to use the Site in accordance with these Terms of Service, our Privacy
                            Policy, and any additional terms and conditions that are referenced herein or that otherwise
                            may apply to specific sections of the Site, or to products and services that we make
                            available to you through the Site (all of which are deemed part of these Terms of Service).
                            Accessing the Site in any manner, whether automated or otherwise, constitutes use of the
                            Site and your agreement to be bound by these Terms of Service.</p>
                        <h3 id="these-terms-of-service-govern-your-use-of-the-site-only-and-do-not-govern-your-use-of-other-act-general-trading-co-mshfa-app-services-">These
                            Terms of Service govern your use of the Site only and do not govern your use of other ACT
                            General Trading Co, ‘MSHFA App’ services.</h3>
                        <p>We reserve the right to change these Terms of Service or to impose new conditions on use of
                            the Site, from time to time, in which case we will post the revised Terms of Service on the
                            Site and update the “Last Updated” date to reflect the date of the changes. By continuing to
                            use the Site after we post any such changes, you accept the Terms of Service, as modified.
                            We also reserve the right to deny access to the Site or any features of the Site to anyone
                            who violates these Terms of Service or who, in our sole judgment, interferes with the
                            ability of others to enjoy our Site or infringes on the rights of others.</p>
                        <h3 id="1-services-provided">1. Services Provided</h3>
                        <p>ACT General Trading Co, ‘MSHFA App’ provides internet healthcare resources to connect
                            individuals with participating physicians, licensed therapists and other licensed health
                            care practitioners (the “Providers”) in real time, via live video conferencing, telephone
                            and/or secure messaging for the diagnosis and treatment of patients over the Internet, as
                            well as providing other types of administrative services and information (“Services”). All
                            of the participating Providers are independent contractors. Providers may record video
                            conference consultations and ACT General Trading Co, ‘MSHFA App’ may record telephone calls
                            for quality purposes. ACT General Trading Co, ‘MSHFA App’ itself does not provide any
                            medical or Provider services.</p>
                        <h3 id="2-your-limited-right-to-use-site-materials">2. Your Limited Right to Use Site
                            Materials</h3>
                        <p>The Site and all the materials available on the Site are the property of ACT General Trading
                            Co, ‘MSHFA App’ and/or our affiliates or licensors, and are protected by copyright,
                            trademark, and other intellectual property laws. The Site is provided solely for your
                            personal noncommercial use. You may not use the Site or the materials available on the Site
                            in a manner that constitutes an infringement of our rights or that has not been authorized
                            by us. More specifically, unless explicitly authorized in these Terms of Service or by the
                            owner of the materials, you may not modify, copy, reproduce, republish, upload, post,
                            transmit, translate, sell, create derivative works, exploit, or distribute in any manner or
                            medium (including by email or other electronic means) any material from the Site. You may,
                            however, from time to time, download and/or print one copy of individual pages of the Site
                            for your personal, non-commercial use, provided that you keep intact all copyright and other
                            proprietary notices. Information about requesting permission to reproduce or distribute
                            materials from the Site can be obtained by contacting us as follows:</p>
                        <p>Email: <a href="mailto:support@masaha.app" title="support@masaha.app">support@masaha.app</a>
                        </p>
                        <h3 id="3-our-right-to-use-materials-you-submit-or-post">3. Our Right to Use Materials You
                            Submit or Post</h3>
                        <p>When you submit or post any material (including any photos or videos) via the Site, you grant
                            us, and anyone authorized by us, a royalty-free, perpetual, irrevocable, non-exclusive,
                            unrestricted, worldwide license to use, copy, modify, transmit, sell, exploit, create
                            derivative works from, distribute, and/or publicly perform or display such material, in
                            whole or in part, in any manner or medium (whether now known or hereafter developed), for
                            any purpose that we choose. The foregoing grant includes the right to exploit any
                            proprietary rights in such posting or submission, including, but not limited to, rights
                            under copyright, trademark or patent laws that exist in any relevant jurisdiction. Also, in
                            connection with the exercise of these rights, you grant us, and anyone authorized by us, the
                            right to identify you as the author of any of your postings or submissions by name, e-mail
                            address or screen name, as we deem appropriate. You understand that the technical processing
                            and transmission of the Site, including content submitted by you, may involve transmissions
                            over various networks, and may involve changes to the content to conform and adapt it to
                            technical requirements of connecting networks or devices. You will not receive any
                            compensation of any kind for the use of any materials submitted by you.</p>
                        <h3 id="4-limitations-on-linking-and-framing">4. Limitations on Linking and Framing</h3>
                        <p>You are free to establish a hypertext link to our Site so long as the link does not state or
                            imply any sponsorship of your website or service by ACT General Trading Co, ‘MSHFA App’, or
                            COMPANY.com. However, you may not, without our prior written permission, frame or inline
                            link any of the content of our Site, or incorporate into another website or other service
                            any of our material, content or intellectual property.</p>
                        <h3 id="5-site-registration-process">5. Site Registration Process</h3>
                        <p>In order to access certain features of our Site, we may ask you to provide certain
                            demographic information including your gender, year of birth, address, and payment
                            information. In addition, if you elect to sign up for particular features of the Site, such
                            as discussion forums, blogs, photo- and video-sharing pages or social networking features,
                            you may also be asked to register with us on a form provided for registration purposes, and
                            we may require you to provide personally identifiable information such as your name and
                            e-mail address. You agree to provide true, accurate, current and complete information about
                            yourself as prompted by the Site’s registration form. If we have reasonable grounds to
                            suspect that such information is untrue, inaccurate, or incomplete, we have the right to
                            suspend or terminate your account and refuse any and all current or future use of the Site
                            (or any portion thereof). Our use of any information you provide to us as part of the
                            registration process is governed by the terms of our Privacy Policy.</p>
                        <h3 id="6-responsibility-for-your-username-and-password">6. Responsibility for Your Username and
                            Password</h3>
                        <p>In order to use certain features of our Site, you may need a username and password, which you
                            will receive and/or create through the Site’s registration process. We reserve the right to
                            reject or terminate the use of any username that we deem in our sole judgment offensive or
                            inappropriate. In addition, we also reserve the right to terminate the use of any username
                            or account, or to deny access to the Site or any features of the Site, to anyone who
                            violates these Terms of Service or who, in our sole judgment, interferes with the ability of
                            others to enjoy our website or infringes the rights of others. You are responsible for
                            maintaining the confidentiality of your password and account, and you are responsible for
                            all activities (whether by you or by others) that occur under your password or account. You
                            agree to notify us immediately of any unauthorized use of your password or account or any
                            other breach of security, and to ensure that you exit from your account at the end of each
                            session. We cannot and will not be liable for any loss or damage arising from your failure
                            to protect your password or account information.</p>
                        <h3 id="7-responsibility-for-user-provided-content">7. Responsibility for User-Provided
                            Content</h3>
                        <p>The Site may include a variety of features, such as discussion forums, blogs, photo- and
                            video-sharing pages, e-mail services and social networking features that allow feedback to
                            us and allow users to interact with each other on the Site or to post content and materials
                            for display on the Site. The Site also may include other features, such as personalized home
                            pages and e-mail services that allow users to communicate with third parties. By accessing
                            and using any such features, you represent and agree: (a) that you have read and agree to
                            abide by our Community Rules as set forth below in Section 8; (b) that you are the owner of
                            any materials you post or submit, or are making your posting or submission with the express
                            consent of the owner of the materials; (c) that you are making your posting or submission
                            with the express consent of anyone pictured in any materials you post or submit, (d) that
                            you are 13 years of age or older; (e) that the materials will not violate the rights of, or
                            cause injury to, any person or entity; and (f) that you will indemnify and hold harmless ACT
                            General Trading Co, ‘MSHFA App’, our affiliates, and each of our and their respective
                            directors, officers, managers, employees, shareholders, agents, representatives and
                            licensors, from and against any liability of any nature arising out of or related to any
                            content or materials displayed on or submitted via the Site by you or by others using your
                            username and password. You also grant us a license to use the materials you post or submit
                            via such features as described in Sections 2-4 above.</p>
                        <p>Responsibility for what is posted on discussion forums, blogs, photo- and video-sharing
                            pages, and other areas on the Site through which users can supply information or materials,
                            or sent via any e-mail services that are made available via the Site, lies with each user.
                            You alone are responsible for the materials you post or send. We do not control the
                            messages, information or files that you or others may transmit, post or otherwise provide on
                            or through the Site.
                            You understand that we have no obligation to monitor any discussion forums, blogs, photo- or
                            video-sharing pages, or other areas of the Site through which users can supply information
                            or materials. However, we reserve the right at all times, in our sole discretion, to screen
                            content submitted by users and to edit, move, delete, and/or refuse to accept any content
                            that in our judgment violates these Terms of Service or is otherwise unacceptable or
                            inappropriate, whether for legal or other reasons.</p>
                        <p>You acknowledge and agree that we may preserve content and materials submitted by you and may
                            also disclose such content and materials if required to do so by law or if, in our business
                            judgment, such preservation or disclosure is reasonably necessary to: (a) comply with legal
                            process; (b) enforce these Terms of Service; (c) respond to claims that any content or
                            materials submitted by you violate the rights of third parties; or (d) protect the rights,
                            property, or personal safety of our Site, us, our affiliates, our officers, directors,
                            employees, representatives, our licensors, other users, and/or the public.</p>
                        <h3 id="8-community-rules">8. Community Rules</h3>
                        <p>The Site may include a variety of features, such as discussion forums, blogs, photo- and
                            video-sharing pages, e-mail services and social networking features that allow feedback to
                            us and allow users to interact with each other on the Site and to post content and materials
                            for display on the Site. The Site also may include other features, such as personalized home
                            pages and e-mail services that allow users to communicate with third parties. By accessing
                            and using any such features, you represent and agree that you will not:</p>
                        <ul>
                            <li><p>Restrict or inhibit any other user from using and enjoying the Site</p>
                            </li>
                            <li><p>Use the Site to impersonate any person or entity, or falsely state or otherwise
                                misrepresent your affiliation with a person or entity</p>
                            </li>
                            <li><p>Interfere with or disrupt any servers or networks used to provide the Site or its
                                features, or disobey any requirements, procedures, policies or regulations of the
                                networks we use to provide the Site</p>
                            </li>
                            <li><p>Use the Site to instigate or encourage others to commit illegal activities or cause
                                injury or property damage to any person</p>
                            </li>
                            <li><p>Gain unauthorized access to the Site, or any account, computer system, or network
                                connected to the Site, by means such as hacking, password mining or other illicit
                                means</p>
                            </li>
                            <li><p>Obtain or attempt to obtain any materials or information through any means not
                                intentionally made available through the Site</p>
                            </li>
                            <li><p>Use the Site to post or transmit any unlawful, threatening, abusive, libelous,
                                defamatory, obscene, vulgar, pornographic, profane or indecent information of any kind,
                                including without limitation any transmissions constituting or encouraging conduct that
                                would constitute a criminal offense, give rise to civil liability or otherwise violate
                                any local, state, national or international law</p>
                            </li>
                            <li><p>Use the Site to post or transmit any information, software or other material that
                                violates or infringes upon the rights of others, including material that is an invasion
                                of privacy or publicity rights or that is protected by copyright, trademark or other
                                proprietary right, or derivative works with respect thereto, without first obtaining
                                permission from the owner or rights holder</p>
                            </li>
                            <li><p>Use the Site to post or transmit any information, software or other material that
                                contains a virus or other harmful component</p>
                            </li>
                            <li><p>Use the Site to post, transmit or in any way exploit any information, software or
                                other material for commercial purposes, or that contains advertising</p>
                            </li>
                            <li><p>Use the Site to advertise or solicit to anyone to buy or sell products or services,
                                or to make donations of any kind, without our express written approval</p>
                            </li>
                            <li><p>Gather for marketing purposes any e-mail addresses or other personal information that
                                has been posted by other users of the Site</p>
                            </li>
                            <li><p>Contact anyone who has asked not to be contacted</p>
                            </li>
                            <li><p>Engage in personal attacks, harass or threaten, question the motives behind others’
                                posts or comments, deliberately inflame or disrupt the conversation, or air personal
                                grievances about other users</p>
                            </li>
                            <li><p>Repeatedly post the same or similar content or otherwise impose an unreasonable or
                                disproportionately large load on our infrastructure</p>
                            </li>
                            <li><p>Take or cause to be taken any action that disrupts the normal flow of postings and
                                dialogue on our Site (such as submitting an excessive number of messages – i.e. a
                                flooding attack), or that otherwise negatively affects other users’ ability to use the
                                Site and/or services; or</p>
                            </li>
                            <li><p>Use automated means, including spiders, robots, crawlers, data mining tools, or the
                                like to download data from our Site. Exception is made for Internet search engines
                                (e.g., Google) and non-commercial public archives (e.g., archive.org) that comply with
                                our Terms of Service.</p>
                            </li>
                        </ul>
                        <p>We reserve the right to deny access to the Site or any features of the Site to anyone who
                            violates these Community Rules or who, in our sole judgment, interferes with the ability of
                            others to enjoy our website or infringes the rights of others.</p>
                        <h3 id="9-limitation-on-use-of-company-directories">9. Limitation on Use of Company
                            Directories</h3>
                        <p>The information contained in any company directories that may be provided on the Site is
                            provided for business lookup purposes and is not to be used for marketing or telemarketing
                            applications. This information may not be copied or redistributed and is provided “AS IS”
                            without warranty of any kind. In no event will we or our suppliers be liable in any way with
                            regard to such information.</p>
                        <h3 id="10-modifications-to-or-discontinuations-of-the-site">10. Modifications to, or
                            Discontinuations of, the Site</h3>
                        <p>We reserve the right at any time and from time to time to modify or discontinue, temporarily
                            or permanently, the Site, or any portion thereof, with or without notice. You agree that we
                            will not be liable to you or to any third party for any modification, suspension or
                            discontinuance of the Site or any portion thereof.</p>
                        <h3 id="11-disclaimers">11. Disclaimers</h3>
                        <p>Throughout our Site, we may have provided links and pointers to Internet sites maintained by
                            third parties. Our linking to any such third-party sites does not imply an endorsement or
                            sponsorship of such sites, or the information, products or services offered on or through
                            the sites. In addition, neither we nor our parent or subsidiary companies nor any of our
                            respective affiliates operate or control in any respect any information, products or
                            services that such third parties may provide on or through the Site or on websites linked to
                            by us on the Site.</p>
                        <p>THE INFORMATION, PRODUCTS AND SERVICES OFFERED ON OR THROUGH THE SITE AND ANY THIRD-PARTY
                            SITES ARE PROVIDED “AS IS” AND WITHOUT WARRANTIES OF ANY KIND EITHER EXPRESS OR IMPLIED. TO
                            THE FULLEST EXTENT PERMISSIBLE PURSUANT TO APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES,
                            EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND
                            FITNESS FOR A PARTICULAR PURPOSE. WE DO NOT WARRANT THAT THE SITE OR ANY OF ITS FUNCTIONS
                            WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT ANY PART OF THE
                            SITE, INCLUDING BULLETIN BOARDS, OR THE SERVERS THAT MAKE IT AVAILABLE, ARE FREE OF VIRUSES
                            OR OTHER HARMFUL COMPONENTS.</p>
                        <p>WE DO NOT WARRANT OR MAKE ANY REPRESENTATIONS REGARDING THE USE OR THE RESULTS OF THE USE OF
                            THE SITE OR MATERIALS ON THE SITE OR ON THIRD-PARTY SITES IN TERMS OF THEIR CORRECTNESS,
                            ACCURACY, TIMELINESS, RELIABILITY OR OTHERWISE.</p>
                        <p>You must provide and are solely responsible for all hardware and/or software necessary to
                            access the Site. You assume the entire cost of and responsibility for any damage to, and all
                            necessary maintenance, repair or correction of, that hardware and/or software.</p>
                        <p>The Site is provided for informational purposes only, and is not intended for trading or
                            investing purposes or for commercial use. Stock and mutual fund quotes, and related
                            financial news stories may be delayed at least 20 minutes, as may be required by the stock
                            exchanges and/or the financial information services. The Site should not be used in any high
                            risk activities where damage or injury to persons, property, environment, finances or
                            business may result if an error occurs. You expressly assume all risk for such use.</p>
                        <p>Your interactions with companies, organizations and/or individuals found on or through our
                            Site, including any purchases, transactions, or other dealings, and any terms, conditions,
                            warranties or representations associated with such dealings, are solely between you and such
                            companies, organizations and/or individuals. You agree that we will not be responsible or
                            liable for any loss or damage of any sort incurred as the result of any such dealings. You
                            also agree that, if there is a dispute between users of the Site, or between a user and any
                            third party, we are under no obligation to become involved, and you agree to release us and
                            our affiliates from any claims, demands and damages of every kind or nature, known or
                            unknown, suspected and unsuspected, disclosed and undisclosed, arising out of or in any way
                            related to such dispute and/or our Site.</p>
                        <h3 id="12-limitation-of-liability">12. Limitation of Liability</h3>
                        <p>UNDER NO CIRCUMSTANCES, INCLUDING, BUT NOT LIMITED TO, NEGLIGENCE, WILL WE OR OUR
                            SUBSIDIARIES, PARENT COMPANIES OR AFFILIATES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
                            SPECIAL OR CONSEQUENTIAL DAMAGES THAT RESULT FROM THE USE OF, OR THE INABILITY TO USE, THE
                            SITE, INCLUDING ITS MATERIALS, PRODUCTS, OR SERVICES, OR THIRD-PARTY MATERIALS, PRODUCTS, OR
                            SERVICES MADE AVAILABLE THROUGH THE SITE, EVEN IF WE ARE ADVISED BEFOREHAND OF THE
                            POSSIBILITY OF SUCH DAMAGES. (BECAUSE SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION
                            OF CERTAIN CATEGORIES OF DAMAGES, THE ABOVE LIMITATION MAY NOT APPLY TO YOU. IN SUCH STATES,
                            OUR LIABILITY AND THE LIABILITY OF OUR SUBSIDIARIES, PARENT COMPANIES AND AFFILIATES, IS
                            LIMITED TO THE FULLEST EXTENT PERMITTED BY SUCH STATE LAW.) YOU SPECIFICALLY ACKNOWLEDGE AND
                            AGREE THAT WE ARE NOT LIABLE FOR ANY DEFAMATORY, OFFENSIVE OR ILLEGAL CONDUCT OF ANY USER.
                            IF YOU ARE DISSATISFIED WITH THE SITE, OR ANY MATERIALS, PRODUCTS, OR SERVICES ON THE SITE,
                            OR WITH ANY OF THE SITE’S TERMS AND CONDITIONS, YOUR SOLE AND EXCLUSIVE REMEDY IS TO
                            DISCONTINUE USING THE SITE.</p>
                        <h3 id="13-indemnification">13. Indemnification</h3>
                        <p>You agree to indemnify and hold harmless us, our affiliates, and each of our and their
                            respective directors, officers, managers, employees, shareholders, agents, representatives
                            and licensors, from and against any and all losses, expenses, damages and costs, including
                            reasonable attorneys’ fees, that arise out of your use of the Site, violation of these Terms
                            of Service by you or any other person using your account, or your violation of any rights of
                            another. We reserve the right to take over the exclusive defense of any claim for which we
                            are entitled to indemnification under this section. In such event, you agree to provide us
                            with such cooperation as is reasonably requested by us.</p>
                        <h3 id="14-suspension-and-termination-of-access">14. Suspension and Termination of Access</h3>
                        <p>You agree that, in our sole discretion, we may suspend or terminate your password, account
                            (or any part thereof) or use of the Site, or any part of the Site, and remove and discard
                            any materials that you submit to the Site, at any time, for any reason, without notice. You
                            agree that we will not be liable to you or any third party for any suspension or termination
                            of your password, account or use of the Site or any part thereof, or any removal of any
                            materials that you have submitted to the Site. In the event that we suspend or terminate
                            your access to and/or use of the Site, you will continue to be bound by the Terms of Service
                            that were in effect as of the date of your suspension or termination.</p>
                        <h3 id="15-notice-of-copyright-infringement">15. Notice of Copyright Infringement</h3>
                        <p>If you are a copyright owner who believes your copyrighted material has been reproduced,
                            posted or distributed via the Site in a manner that constitutes copyright infringement,
                            please inform us by e-mail to <a href="mailto:support@masaha.app">support@masaha.app</a>.
                            Please include the following information in your written notice: (1) a detailed description
                            of the copyrighted work that is allegedly infringed upon; (2) a description of the location
                            of the allegedly infringing material on the Site; (3) your contact information, including
                            your address, telephone number, and, if available, e-mail address; (4) a statement by you
                            indicating that you have a good-faith belief that the allegedly infringing use is not
                            authorized by the copyright owner, its agent, or the law; (5) a statement by you, made under
                            penalty of perjury, affirming that the information in your notice is accurate and that you
                            are authorized to act on the copyright owner’s behalf; and (6) an electronic or physical
                            signature of the copyright owner or someone authorized on the owner’s behalf to assert
                            infringement of copyright and to submit the statement. Please note that the contact
                            information provided in this paragraph is for suspected copyright infringement only. Contact
                            information for other matters is provided elsewhere in these Terms of Service or on the
                            Site.</p>
                        <h3 id="16-other">16. Other</h3>
                        <p>These Terms of Service, together with the ACT General Trading Co, ‘MSHFA App’ Privacy Policy,
                            which is incorporated herein by this reference, constitutes the entire agreement between us
                            and you with respect to the subject matter hereof and supersedes all previous and
                            contemporaneous agreements, proposals and communications, whether written or oral. You also
                            may be subject to additional terms and conditions that may apply when you use the products
                            or services of a third party that are provided through the Site. In the event of any
                            conflict between any such third-party terms and conditions and these Terms of Service, these
                            Terms of Service will govern. This agreement will be governed by and construed in accordance
                            with the laws of the State of New York, without giving effect to any principles of conflicts
                            of law.</p>
                        <p>This agreement is personal to you, and you may not assign it to anyone. If any provision of
                            this agreement is found to be unlawful, void, or for any reason unenforceable, then that
                            provision will be deemed severable from this agreement and will not affect the validity and
                            enforceability of any remaining provisions. These Terms of Service are not intended to
                            benefit any third party, and do not create any third party beneficiaries. Accordingly, these
                            Terms of Service may only be invoked or enforced by you or us. You agree that regardless of
                            any statute or law to the contrary, any claim or cause of action that you may have arising
                            out of or related to use of the Site or these Terms of Service must be filed by you within
                            one year after such claim or cause of action arose or be forever barred.</p>
                        <h3 id="17-summary-notice-of-hipaa-privacy-practices">17. Summary Notice of HIPAA Privacy
                            Practices</h3>
                        <p>ACT General Trading Co, ‘MSHFA App’ arranges for the provision of all physician services you
                            may receive through your ACT General Trading Co, ‘MSHFA App’ membership. These physicians
                            and allied healthcare professionals are independent practitioners who advise, diagnose, and
                            prescribe at their own discretion subject to their individual state regulations. ACT General
                            Trading Co, ‘MSHFA App’ does not directly provide or arrange for care, nor does it knowingly
                            maintain any medical information about you for purposes of providing or facilitating
                            care.</p>
                        <p>THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED BY
                            HEALTHNATION AND HOW YOU CAN GET ACCESS TO THIS INFORMATION.</p>
                        <p>The Health Insurance Portability &amp; Accountability Act of 1996 (HIPAA) is a federal
                            program that requires that all medical records and other individually identifiable health
                            information used or disclosed by ACT General Trading Co, ‘MSHFA App’ in any form, whether
                            electronically, on paper, or orally, are kept properly confidential. This Act gives you, the
                            Patient, significant new rights to understand and control how your health information is
                            used. HIPAA provides penalties for covered entities that misuse personal health
                            information.</p>
                        <p>ACT General Trading Co, ‘MSHFA App’ has prepared this “Summary Notice of HIPAA Privacy
                            Practices” to explain how it is required to maintain the privacy of your health information
                            and how it may use and disclose your health information. A Notice of HIPAA Privacy Practices
                            containing a more complete description of the uses and disclosures of your health
                            information is available to you upon request.</p>
                        <p>ACT General Trading Co, ‘MSHFA App’ may use and disclose your medical records for each of the
                            following purposes: treatment, payment, and health care operations.</p>
                        <ul>
                            <li><p>TREATMENT means providing, coordinating, or managing health care and related services
                                by one or more health care providers</p>
                            </li>
                            <li><p>PAYMENT means such activities as obtaining payment or reimbursement for services,
                                billing or collection activities and utilization review.</p>
                            </li>
                            <li><p>HEALTH CARE OPERATIONS include managing your Electronic Medical Record to facilitate
                                diagnostic medical consultations with participating physicians, as well as conducting
                                quality assessment and improvement activities, auditing functions, cost-management
                                analysis and customer service.</p>
                            </li>
                        </ul>
                        <p>ACT General Trading Co, ‘MSHFA App’ may also create and distribute de-identified health
                            information by removing all references to individually identifiable information.</p>
                        <p>ACT General Trading Co, ‘MSHFA App’ may contact you to provide information about our services
                            or other health-related services that may be of interest to you.</p>
                        <p>Any other uses and disclosures will be made only with your written authorization. You may
                            revoke such authorization in writing and ACT General Trading Co, ‘MSHFA App’ is required to
                            honor and abide by that written request, except to the extent that it has already taken
                            actions relying on your authorization.</p>
                        <p>You have the following rights with respect to your protected health information, which you
                            can exercise by presenting a written request addressed to the attention of the ACT General
                            Trading Co, ‘MSHFA App’ Compliance Officer, at the address above.</p>
                        <ul>
                            <li><p>You have the right to ask for restrictions on the ways ACT General Trading Co, ‘MSHFA
                                App’ uses and discloses your health information for treatment, payment and health care
                                operations. You may also request that ACT General Trading Co, ‘MSHFA App’ limit its
                                disclosures to persons assisting your care. ACT General Trading Co, ‘MSHFA App’ will
                                consider your request, but is not required to accept it.</p>
                            </li>
                            <li><p>You have the right to request that you receive communications containing your
                                protected health information from ACT General Trading Co, ‘MSHFA App’ by alternative
                                means or at alternative locations. For example, you may ask that ACT General Trading Co,
                                ‘MSHFA App’ only contact you at home or by mail.</p>
                            </li>
                            <li><p>Except under certain circumstances, you have the right to inspect and copy medical,
                                billing and other records used to make decisions about you. If you ask for copies of
                                this information, ACT General Trading Co, ‘MSHFA App’ may charge you a nominal fee for
                                copying and mailing.</p>
                            </li>
                            <li><p>If you believe that information in your records is incorrect or incomplete, you have
                                the right to ask us or ACT General Trading Co, ‘MSHFA App’ to correct the existing
                                information or add missing information. Under certain circumstances, your request may be
                                denied, such as when the information is accurate and complete.</p>
                            </li>
                            <li><p>You have a right to receive a list of certain instances when ACT General Trading Co,
                                ‘MSHFA App’ has used or disclosed your medical information. If you ask for this
                                information from us or from COMPANY more than once every twelve months, you may be
                                charged a fee.</p>
                            </li>
                        </ul>
                        <h3 id="for-provider-only">For Provider Only</h3>
                        <p>Requests for registration as a Provider member are subject to credentialing and background
                            check to standards set by and at the sole discretion of ACT General Trading Co, ‘MSHFA
                            App’.</p>
                        <p>Provider registration requests will first be checked by ACT General Trading Co, ‘MSHFA App’
                            and then a registration number will be issued to you by email. You may then complete the
                            remaining registration request process.</p>
                        <p> All accepted providers agree that ACT General Trading Co, ‘MSHFA App’ will provide
                            healthcare facilities with credentialing information for selected providers.</p>
                        <p> Providers will be subject to the Services Agreement provided by ACT General Trading Co,
                            ‘MSHFA App’ upon registration completion and acceptance by ACT General Trading Co, ‘MSHFA
                            App’.</p>
                        <h3 id="for-remote-facility-only">For Remote Facility Only</h3>
                        <p> Requests for registration as a Remote Facility member are subject to verification and
                            background check to standards set by and at the sole discretion of ACT General Trading Co,
                            ‘MSHFA App’.</p>
                        <p> Remote Facility registration requests will first be checked by ACT General Trading Co,
                            ‘MSHFA App’ and then a registration number will be issued to you by email. You may then
                            complete the remaining registration request process.</p>
                        <p> All accepted Remote Facilities agree that ACT General Trading Co, ‘MSHFA App’ will provide
                            credentialing information for selected providers, if required by remote facility.</p>
                        <p> Remote Facilities will be subject to the Services Agreement provided by ACT General Trading
                            Co, ‘MSHFA App’ upon registration completion and acceptance by ACT General Trading Co,
                            ‘MSHFA App’.</p>
                    </div>
                </Tabs>
            </Paper>
        </div>
    )
}

export default LegalPage;
