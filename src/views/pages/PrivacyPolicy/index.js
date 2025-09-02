import React from "react";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import UserLayout from "../../../components/UserLayout";

const PrivacyPolicy = () => {
  return (
    <UserLayout>
      <div className="max-w-4xl container mx-auto px-4 py-4 text-gray-800">
        <h1 className="text-4xl font-bold mb-6 text-center privacy-policy-heading">Privacy Policy</h1>
        <p className="text-sm text-gray-500 text-center mb-10 privacy-policy-effective">
          Effective Date: 07-29-2025
        </p>

        <p className="mb-6">
          At <strong>Arise Court</strong>, we respect your privacy and are
          committed to protecting your personal data. This Privacy Policy
          explains how we collect, use, and safeguard your information when you
          use our mobile application and services.
        </p>

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="privacy_points mb-3">
            1. Information We Collect
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Personal Information:</strong> Name, Email address, Phone
              number, Profile photo (optional), Payment information (processed
              securely via third-party providers)
            </li>
            <li>
              <strong>Usage Information:</strong> Booking history, Preferred
              sports and locations, Device information (type, OS, language), App
              usage data (analytics, crash logs)
            </li>
            <li>
              <strong>Location Data:</strong> If you enable location services,
              we may collect your real-time location to show nearby courts and
              personalize your experience.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="privacy_points mb-3">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Register and manage your user account</li>
            <li>Facilitate and confirm court bookings</li>
            <li>Send booking confirmations, reminders, and notifications</li>
            <li>Improve app functionality and user experience</li>
            <li>Provide customer support</li>
            <li>Prevent fraud and misuse</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="privacy_points mb-3">
            3. Data Sharing and Disclosure
          </h2>
          <p>
            We do not sell your personal data. We may share your information
            only:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li>
              With trusted third-party service providers (e.g., payment
              processors, analytics tools)
            </li>
            <li>If required by law, regulation, or legal request</li>
            <li>To protect our rights, users, or public safety</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="mb-8">
          <h2 className="privacy_points mb-3">
            4. Security of Your Information
          </h2>
          <p>
            We implement industry-standard security measures to protect your
            data, including encryption, secure servers, and regular audits.
            However, no digital system is 100% secure, so we encourage you to
            safeguard your login credentials.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-8">
          <h2 className="privacy_points mb-3">
            5. Your Rights and Choices
          </h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li>Access or update your personal information</li>
            <li>Delete your account and associated data</li>
            <li>Opt out of marketing communications</li>
          </ul>
          <p className="mt-2">
            You can manage these settings directly in the app or by contacting
            us.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-8">
          <h2 className="privacy_points mb-3">6. Children’s Privacy</h2>
          <p>
            Arise Court is not intended for children under the age of 13. We do
            not knowingly collect personal data from children.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-8">
          <h2 className="privacy_points mb-3">
            7. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            notified via app updates or notifications. Please review it
            periodically.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="privacy_points mb-3">8. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or
            your personal data, please contact us:
          </p>
          <div className="mt-4 space-y-2">
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-blue-600" />{" "}
              <span>arisesportscomplex@gmail.com</span>
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-600" />{" "}
              <span>542 Koomey Road, Brookshire, TX 77423, USA</span>
            </p>
          </div>
        </section>
      </div>
    </UserLayout>
  );
};

export default PrivacyPolicy;
