import React from 'react';

const SecurityPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Security</h1>

                <p className="text-lg text-gray-700 mb-6 text-center">
                    Your privacy and security are a top priority. We take every necessary measure to protect your personal information and maintain a secure environment across our platform.
                </p>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Data Encryption</h2>
                        <p className="text-gray-700">
                            All data exchanged between your browser and our servers is encrypted using industry-standard SSL/TLS protocols. This ensures that your sensitive information is protected from unauthorized access.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Secure Authentication</h2>
                        <p className="text-gray-700">
                            We use secure authentication practices including hashed passwords and token-based sessions to keep your account safe. Multi-factor authentication (MFA) options are also supported for an added layer of protection.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Regular Security Audits</h2>
                        <p className="text-gray-700">
                            Our systems undergo regular security reviews and updates. We monitor for vulnerabilities, patch known issues promptly, and follow best practices to maintain a robust security posture.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">User Control</h2>
                        <p className="text-gray-700">
                            You are always in control of your data. You can update or delete your account information at any time. Our privacy and data handling practices are transparent and compliant with international standards like GDPR.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Responsible Disclosure</h2>
                        <p className="text-gray-700">
                            We encourage responsible disclosure. If you discover a potential security issue, please contact us immediately so we can investigate and resolve it appropriately.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default SecurityPage;
