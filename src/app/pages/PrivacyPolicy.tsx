const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <div className="container">
        <header className="policy-header">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last Updated: March 1, 2025</p>
        </header>

        <div className="policy-content">
          <section className="policy-section">
            <h2>1. Introduction</h2>
            <p>At Indeed, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our job posting platform. Please read this policy carefully to understand our practices regarding your personal data.</p>
          </section>

          <section className="policy-section">
            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Information</h3>
            <p>We may collect personal information that you provide directly to us, including:</p>
            <ul>
              <li>Contact information (name, email address, phone number)</li>
              <li>Account credentials (username, password)</li>
              <li>Professional information (resume, work history, skills)</li>
              <li>Demographic information (location, preferred job types)</li>
              <li>Payment information (for employer accounts)</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <p>When you access our platform, we may automatically collect certain information, including:</p>
            <ul>
              <li>Device information (browser type, operating system, IP address)</li>
              <li>Usage data (pages visited, time spent, search queries)</li>
              <li>Location information (if permitted by your device settings)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect for various purposes, including:</p>
            <ul>
              <li>Providing and improving our services</li>
              <li>Matching job seekers with potential employers</li>
              <li>Processing transactions and managing accounts</li>
              <li>Communicating with you about services, updates, and promotions</li>
              <li>Analyzing usage patterns to enhance user experience</li>
              <li>Protecting against fraudulent or unauthorized activity</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>4. Sharing Your Information</h2>
            <p>We may share your information with:</p>
            <ul>
              <li><strong>Employers and Job Seekers:</strong> When you apply for jobs or post job listings, relevant information is shared between parties.</li>
              <li><strong>Service Providers:</strong> Third-party vendors who help us operate our platform and provide services.</li>
              <li><strong>Affiliates:</strong> Our parent company, subsidiaries, and affiliates may access your information for the purposes described in this policy.</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights, privacy, safety, or property.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>5. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section className="policy-section">
            <h2>6. Your Privacy Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul>
              <li>Accessing and reviewing your personal information</li>
              <li>Correcting inaccuracies in your information</li>
              <li>Deleting your personal information</li>
              <li>Restricting or objecting to processing</li>
              <li>Data portability</li>
              <li>Withdrawing consent</li>
            </ul>
            <p>To exercise these rights, please contact us using the information in the "Contact Us" section.</p>
          </section>

          <section className="policy-section">
            <h2>7. Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar technologies to collect information about your browsing activities and to provide you with a better experience. You can manage your cookie preferences through your browser settings.</p>
          </section>

          <section className="policy-section">
            <h2>8. Children's Privacy</h2>
            <p>Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child without parental consent, we will take steps to delete that information.</p>
          </section>

          <section className="policy-section">
            <h2>9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our platform with a new effective date.</p>
          </section>

          <section className="policy-section">
            <h2>10. Contact Us</h2>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:</p>
            <div className="contact-info">
              <p>Indeed Privacy Team</p>
              <p>Email: privacy@indeed-example.com</p>
              <p>Address: 123 Job Search Lane, Employment City, EC 12345</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </section>
        </div>
      </div>

      <style>{`
        .privacy-policy {
          width: 100%;
          background-color: white;
          color: #333;
          padding: 40px 0;
          font-family: Arial, sans-serif;
        }
        
        .container {
          width: 90%;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .policy-header {
          border-bottom: 1px solid #eee;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        
        .policy-header h1 {
          color: black;
          font-size: 32px;
          margin: 0 0 10px 0;
        }
        
        .last-updated {
          color: #666;
          font-style: italic;
          margin: 0;
        }
        
        .policy-content {
          line-height: 1.6;
        }
        
        .policy-section {
          margin-bottom: 30px;
        }
        
        .policy-section h2 {
          color: black;
          font-size: 22px;
          margin: 0 0 15px 0;
        }
        
        .policy-section h3 {
          color: black;
          font-size: 18px;
          margin: 20px 0 10px 0;
        }
        
        .policy-section p {
          margin: 0 0 15px 0;
        }
        
        .policy-section ul {
          margin: 0 0 15px 0;
          padding-left: 20px;
        }
        
        .policy-section li {
          margin-bottom: 8px;
        }
        
        .contact-info {
          padding: 15px;
          border-radius: 4px;
          margin-top: 10px;
        }
        
        .contact-info p {
          margin: 5px 0;
        }
        
        @media (max-width: 600px) {
          .container {
            width: 95%;
            padding: 15px;
          }
          
          .policy-header h1 {
            font-size: 26px;
          }
          
          .policy-section h2 {
            font-size: 20px;
          }
          
          .policy-section h3 {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;