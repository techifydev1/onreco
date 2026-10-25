// Legal copy for the terms and privacy pages. Kept out of markup so the
// documents can be edited without touching page components.

export type LegalListItem = { lead?: string; text: string };

export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "list"; items: LegalListItem[] }
  | { kind: "inline-link"; before: string; label: string; href: string; after: string };

export type LegalSection = { heading: string; blocks: LegalBlock[] };

export type LegalDocument = {
  title: string;
  subtitle: string;
  effectiveDate: string;
  contactEmail: string;
  sections: LegalSection[];
};

export const legalTerms: LegalDocument = {
  title: "Terms of Service",
  subtitle: "End User License Agreement",
  effectiveDate: "July 23, 2026",
  contactEmail: "hello@onreco.xyz",
  sections: [
    {
      heading: "1. Agreement to Terms",
      blocks: [
        {
          kind: "p",
          text: 'By accessing or using the Onreco platform ("Software"), you agree to be bound by this End User License Agreement ("Agreement") between you ("User" or "you") and Onreco ("Company," "we," "us," or "our"). If you do not agree to this Agreement, do not use the Software.',
        },
      ],
    },
    {
      heading: "2. License Grant",
      blocks: [
        {
          kind: "p",
          text: "Subject to the terms of this Agreement, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Software for your internal business purposes. This license does not include the right to:",
        },
        {
          kind: "list",
          items: [
            { text: "Copy, modify, distribute, sell, or lease any part of the Software;" },
            { text: "Reverse engineer, decompile, or disassemble the Software;" },
            { text: "Remove, alter, or obscure any proprietary notices or labels;" },
            { text: "Use the Software to build a competing product or service;" },
            { text: "Use the Software in any manner that violates applicable law or regulation." },
          ],
        },
      ],
    },
    {
      heading: "3. Account Registration",
      blocks: [
        {
          kind: "p",
          text: "To use certain features of the Software, you must create an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate. You are responsible for safeguarding your account credentials and for all activity that occurs under your account.",
        },
      ],
    },
    {
      heading: "4. Third-Party Integrations",
      blocks: [
        {
          kind: "p",
          text: "The Software integrates with third-party services, including but not limited to QuickBooks, Xero, blockchain networks, and wallet providers. Your use of these third-party services is subject to their respective terms and privacy policies. We are not responsible for the availability, accuracy, or practices of third-party services.",
        },
      ],
    },
    {
      heading: "5. Data and Privacy",
      blocks: [
        {
          kind: "inline-link",
          before: "Your use of the Software is also governed by our",
          label: "Privacy Policy",
          href: "/privacy",
          after: ", which describes how we collect, use, and share information about you. By using the Software, you consent to the data practices described in the Privacy Policy.",
        },
      ],
    },
    {
      heading: "6. Intellectual Property",
      blocks: [
        {
          kind: "p",
          text: "The Software, including all copies, modifications, enhancements, and derivative works thereof, and all intellectual property rights therein, are and shall remain the exclusive property of the Company and its licensors. This Agreement does not convey any ownership interest in or to the Software.",
        },
      ],
    },
    {
      heading: "7. Fee-Based Services",
      blocks: [
        {
          kind: "p",
          text: "Certain features of the Software may require payment of fees. All fees are non-refundable unless expressly stated otherwise. We reserve the right to change our pricing at any time with reasonable advance notice. Continued use of fee-based features after a price change constitutes acceptance of the new pricing.",
        },
      ],
    },
    {
      heading: "8. Acceptable Use",
      blocks: [
        { kind: "p", text: "You agree not to:" },
        {
          kind: "list",
          items: [
            {
              text: "Use the Software for any unlawful purpose or in violation of any applicable laws, including anti-money laundering (AML) and counter-terrorism financing (CTF) regulations;",
            },
            { text: "Interfere with or disrupt the integrity or performance of the Software;" },
            { text: "Attempt to gain unauthorized access to the Software or its related systems;" },
            { text: "Transmit any viruses, malware, or other harmful code through the Software;" },
            { text: "Use the Software to send unsolicited communications or spam;" },
            { text: "Exceed applicable rate limits or quotas imposed on the Software." },
          ],
        },
      ],
    },
    {
      heading: "9. Disclaimer of Warranties",
      blocks: [
        {
          kind: "p",
          text: 'THE SOFTWARE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY. WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SOFTWARE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.',
        },
      ],
    },
    {
      heading: "10. Limitation of Liability",
      blocks: [
        {
          kind: "p",
          text: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL THE COMPANY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SOFTWARE. OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THIS AGREEMENT SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.",
        },
      ],
    },
    {
      heading: "11. Indemnification",
      blocks: [
        {
          kind: "p",
          text: "You agree to indemnify, defend, and hold harmless the Company, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorneys' fees) arising out of or relating to your use of the Software, your violation of this Agreement, or your violation of any rights of a third party.",
        },
      ],
    },
    {
      heading: "12. Termination",
      blocks: [
        {
          kind: "p",
          text: "We may terminate or suspend your license to use the Software at any time, with or without cause, with or without notice. Upon termination, your right to use the Software ceases immediately. You may also terminate this Agreement by ceasing all use of the Software and deleting all copies in your possession.",
        },
      ],
    },
    {
      heading: "13. Modifications to This Agreement",
      blocks: [
        {
          kind: "p",
          text: 'We reserve the right to modify this Agreement at any time. We will notify you of material changes by posting the updated Agreement on our website and updating the "Effective date" above. Your continued use of the Software after such changes constitutes acceptance of the updated Agreement.',
        },
      ],
    },
    {
      heading: "14. Governing Law",
      blocks: [
        {
          kind: "p",
          text: "This Agreement shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to its conflict of law principles. Any disputes arising under this Agreement shall be resolved in the courts of competent jurisdiction in Lagos, Nigeria.",
        },
      ],
    },
    {
      heading: "15. Severability",
      blocks: [
        {
          kind: "p",
          text: "If any provision of this Agreement is held to be unenforceable or invalid, such provision will be modified to the minimum extent necessary to make it enforceable, and the remaining provisions shall continue in full force and effect.",
        },
      ],
    },
    {
      heading: "16. Entire Agreement",
      blocks: [
        {
          kind: "p",
          text: "This Agreement, together with our Privacy Policy and any other policies or guidelines referenced herein, constitutes the entire agreement between you and the Company regarding the Software and supersedes all prior agreements and understandings.",
        },
      ],
    },
    {
      heading: "17. Contact Us",
      blocks: [
        {
          kind: "inline-link",
          before: "If you have questions about this Agreement, please contact us at",
          label: "hello@onreco.xyz",
          href: "mailto:hello@onreco.xyz",
          after: ".",
        },
      ],
    },
  ],
};

export const legalPrivacy: LegalDocument = {
  title: "Privacy Policy",
  subtitle: "How we handle your data",
  effectiveDate: "July 23, 2026",
  contactEmail: "hello@onreco.xyz",
  sections: [
    {
      heading: "1. Introduction",
      blocks: [
        {
          kind: "p",
          text: 'Onreco ("Company," "we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services (collectively, the "Service").',
        },
        {
          kind: "p",
          text: "By using the Service, you agree to the collection and use of information in accordance with this policy. If you do not agree, please discontinue use of the Service.",
        },
      ],
    },
    {
      heading: "2. Information We Collect",
      blocks: [
        { kind: "h3", text: "2.1 Information You Provide" },
        {
          kind: "list",
          items: [
            {
              lead: "Account information:",
              text: "Name, email address, and password when you create an account.",
            },
            {
              lead: "Profile information:",
              text: "First name, last name, and preferences you add to your profile.",
            },
            {
              lead: "Wallet addresses:",
              text: "Blockchain wallet addresses you connect for transaction monitoring.",
            },
            {
              lead: "Integration credentials:",
              text: "OAuth tokens and API keys for third-party services like QuickBooks that you authorize us to access.",
            },
            {
              lead: "Support communications:",
              text: "Information you provide when contacting us for support.",
            },
          ],
        },
        { kind: "h3", text: "2.2 Information Collected Automatically" },
        {
          kind: "list",
          items: [
            {
              lead: "Usage data:",
              text: "Pages viewed, features used, actions taken, timestamps, and session duration.",
            },
            {
              lead: "Device information:",
              text: "Browser type, operating system, device type, and screen resolution.",
            },
            { lead: "Log data:", text: "IP address, access times, and error logs." },
          ],
        },
        { kind: "h3", text: "2.3 Blockchain Data" },
        {
          kind: "p",
          text: "We access publicly available blockchain data associated with the wallet addresses you connect, including transaction history, token balances, and smart contract interactions. This data is public and not considered private information.",
        },
      ],
    },
    {
      heading: "3. How We Use Your Information",
      blocks: [
        { kind: "p", text: "We use the information we collect to:" },
        {
          kind: "list",
          items: [
            { text: "Provide, operate, and maintain the Service;" },
            { text: "Process and categorize your blockchain transactions;" },
            { text: "Sync financial data to your QuickBooks or Xero account;" },
            { text: "Send transactional emails (account verification, security alerts);" },
            { text: "Improve and personalize the Service;" },
            { text: "Detect and prevent fraud, abuse, and security incidents;" },
            { text: "Comply with legal obligations;" },
            { text: "Communicate with you about updates, features, and support." },
          ],
        },
      ],
    },
    {
      heading: "4. How We Share Your Information",
      blocks: [
        {
          kind: "p",
          text: "We do not sell your personal information. We may share your information only in the following circumstances:",
        },
        {
          kind: "list",
          items: [
            {
              lead: "Third-party integrations:",
              text: "When you authorize a connection (e.g., QuickBooks), we share data necessary to fulfill that integration.",
            },
            {
              lead: "Service providers:",
              text: "We share data with trusted vendors who assist in operating the Service (cloud hosting, email delivery, analytics), bound by contractual obligations to protect your data.",
            },
            {
              lead: "Legal requirements:",
              text: "When required by law, regulation, legal process, or governmental request.",
            },
            {
              lead: "Business transfers:",
              text: "In connection with a merger, acquisition, or sale of assets, with notice to you.",
            },
          ],
        },
      ],
    },
    {
      heading: "5. Data Security",
      blocks: [
        {
          kind: "p",
          text: "We implement industry-standard security measures to protect your information, including encryption in transit (TLS) and at rest, access controls, and regular security audits. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
        },
      ],
    },
    {
      heading: "6. Data Retention",
      blocks: [
        {
          kind: "p",
          text: "We retain your personal information for as long as your account is active or as needed to provide the Service. We may retain certain information as required by law or for legitimate business purposes. When you delete your account, we will remove your personal data within 30 days, except where we are required to retain certain records for legal compliance.",
        },
      ],
    },
    {
      heading: "7. Your Rights",
      blocks: [
        { kind: "p", text: "Depending on your jurisdiction, you may have the following rights:" },
        {
          kind: "list",
          items: [
            { lead: "Access:", text: "Request a copy of the personal data we hold about you." },
            { lead: "Correction:", text: "Request correction of inaccurate or incomplete data." },
            { lead: "Deletion:", text: "Request deletion of your personal data." },
            {
              lead: "Portability:",
              text: "Request a copy of your data in a structured, machine-readable format.",
            },
            { lead: "Objection:", text: "Object to processing of your personal data for certain purposes." },
            {
              lead: "Withdraw consent:",
              text: "Where processing is based on consent, withdraw it at any time.",
            },
          ],
        },
        {
          kind: "inline-link",
          before: "To exercise any of these rights, contact us at",
          label: "hello@onreco.xyz",
          href: "mailto:hello@onreco.xyz",
          after: ".",
        },
      ],
    },
    {
      heading: "8. Cookies and Tracking",
      blocks: [
        {
          kind: "p",
          text: "We use cookies and similar technologies to maintain session state, remember preferences, and analyze usage patterns. You can control cookies through your browser settings. Disabling cookies may affect the functionality of the Service.",
        },
      ],
    },
    {
      heading: "9. International Data Transfers",
      blocks: [
        {
          kind: "p",
          text: "Your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers comply with applicable data protection laws and that appropriate safeguards are in place.",
        },
      ],
    },
    {
      heading: "10. Children's Privacy",
      blocks: [
        {
          kind: "p",
          text: "The Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we learn that we have collected personal data from a child, we will take steps to delete that information promptly.",
        },
      ],
    },
    {
      heading: "11. Changes to This Policy",
      blocks: [
        {
          kind: "p",
          text: 'We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website and updating the "Effective date" above. Your continued use of the Service after changes are posted constitutes acceptance of the updated policy.',
        },
      ],
    },
    {
      heading: "12. Contact Us",
      blocks: [
        {
          kind: "inline-link",
          before: "If you have questions or concerns about this Privacy Policy, please contact us at",
          label: "hello@onreco.xyz",
          href: "mailto:hello@onreco.xyz",
          after: ".",
        },
      ],
    },
  ],
};
