import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
    title: 'Privacy Policy | Ambaari Tours & Travels',
    description:
        'At Ambaari Tours and Travels, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you visit our website or interact with our services, including through advertisements on platforms like Facebook and Instagram.',
};

const sections = [
    {
        num: '01',
        title: 'Information We Collect',
        content: (
            <>
                <p className="pp-subsection">a. Personal Information</p>
                <p className="pp-text">We may collect personal information that you voluntarily provide, including:</p>
                <ul className="pp-list">
                    <li>Full Name</li>
                    <li>Email Address</li>
                    <li>Phone Number</li>
                    <li>Travel preferences and booking details</li>
                    <li>Any information submitted through contact forms, booking forms, or advertisements (such as Meta Lead Ads)</li>
                </ul>
                <p className="pp-subsection">Automatically Collected Information</p>
                <p className="pp-text">When you visit our website, we may collect:</p>
                <ul className="pp-list">
                    <li>IP Address &amp; browser type</li>
                    <li>Device information and pages visited</li>
                    <li>Date, time of access, and referring source</li>
                </ul>
                {/* <p className="pp-text">This information helps us improve our services and enhance your experience.</p> */}
            </>
        ),
    },
    {
        num: '02',
        title: 'How We Use Your Information',
        content: (
            <>
            <ul className="pp-list">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Process bookings and deliver travel services</li>
                <li>Send updates, offers, and promotional messages (only with your consent)</li>
                <li>Improve website performance and user experience</li>
                <li>Run and optimize advertisements (including Meta/Facebook Ads)</li>
                <li>Ensure security and prevent fraudulent activity</li>
            </ul>
            <div className="mt-4 flex items-start gap-3 bg-yellow-500/8 border border-yellow-500/20 rounded-xl px-4 py-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0" />
                <p className="pp-text !mb-0">
                    <span className="font-semibold text-yellow-400">Meta Lead Ads: </span>
                    When you submit information through a Meta Lead Ad form, the data collected will be used
                    solely for the purpose stated in that specific advertisement (e.g., travel enquiry, quote
                    request, or itinerary planning). This data will not be repurposed for unrelated marketing
                    without your separate consent.
                </p>
            </div>
            </>
        ),
    },
    {
        num: '03',
        title: 'Use of Cookies and Tracking Technologies',
        content: (
            <p className="pp-text">
                We use cookies, Meta Pixel, and similar tracking technologies to:

                Analyze website traffic and user behavior
                Measure the effectiveness of advertising campaigns
                Provide personalized ads and content

                You can disable cookies through your browser settings; however, some website features may not function properly.
            </p>
        ),
    },
    {
        num: '04',
        title: 'Sharing of Information',
        content: (
            <>
                <p className="pp-text">We do not sell your personal data. We may share your information with:</p>
                <ul className="pp-list">
                    <li>Trusted service providers (payment gateways, booking partners, marketing tools)</li>
                    <li>Advertising platforms like Meta (Facebook & Instagram) for ad targeting and performance tracking</li>
                    <li>Legal authorities if required by law</li>
                </ul>
                <p className="pp-text">All third parties are obligated to keep your information secure and confidential.</p>
            </>
        ),
    },
    {
        num: '05',
        title: 'Third-Party Services',
        content: (
            <p className="pp-text">
              Our website and services may include third-party tools and links (such as payment gateways, analytics tools, and social media platforms). These third parties have their own privacy policies, and we are not responsible for their practices.
            </p>
        ),
    },
    {
        num: '06',
        title: 'Data Security',
        content: (
            <p className="pp-text">
                We implement appropriate technical and organizational measures to protect your data. However,
                no online system is 100% secure, and we cannot guarantee absolute security.
            </p>
        ),
    },
    {
        num: '07',
        title: "Children's Privacy",
        content: (
            <p className="pp-text">
                Our services are not intended for children under 13 years of age. We do not knowingly collect
                personal data from children.
            </p>
        ),
    },
    {
        num: '08',
        title: 'Your Rights',
        content: (
            <>
                <p className="pp-text">You have the right to:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
                    {[
                        'Access the personal data we hold about you',
                        'Request correction or deletion of your data',
                        'Opt out of marketing communications at any time',
                    ].map((right) => (
                        <div
                            key={right}
                            className="flex items-start gap-3 bg-yellow-500/8 border border-yellow-500/20 rounded-xl p-3"
                        >
                            <span className="mt-1.5 w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0" />
                            <p className="text-sm text-gray-300 leading-relaxed">{right}</p>
                        </div>
                    ))}
                </div>
                <p className="pp-text">
                    To exercise these rights, contact us at:{' '}
                    <a href="mailto:ambaaritoursandtravels19@gmail.com" className="text-yellow-400 hover:underline font-medium">
                        ambaaritoursandtravels19@gmail.com
                    </a>
                </p>
            </>
        ),
    },
    {
        num: '09',
        title: 'Changes to This Privacy Policy',
        content: (
            <p className="pp-text">
                We may update this Privacy Policy from time to time. Updates will be posted on this page with
                a revised effective date.
            </p>
        ),
    },
];

export default function PrivacyPolicyPage() {
    return (
        <div>
            <Navbar />
            <br></br>
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-200">

                {/* ── Hero ── */}
                <section className="relative overflow-hidden border-b-2 border-yellow-500 bg-gradient-to-br from-yellow-950/30 via-black to-gray-950 py-16 px-6">
                    {/* decorative glow */}
                    <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-yellow-500/10" />

                    <div className="relative max-w-4xl mx-auto">
                        {/* badge */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                            <span className="text-xs font-semibold uppercase tracking-widest text-yellow-400">
                                Legal &amp; Privacy
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                            Privacy <span className="text-yellow-400">Policy</span>
                        </h1>

                        <p className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="inline-block h-0.5 w-5 bg-yellow-500/70 rounded" />
                            Effective Date: February 2, 2026
                        </p>
                    </div>
                </section>

                {/* ── Body ── */}
                <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">

                    {/* Intro callout */}
                    <div className="border-l-4 border-yellow-500 bg-yellow-500/5 rounded-r-xl px-5 py-4 mb-10">
                        <p className="text-[15px] text-gray-300 leading-relaxed">
                            At{' '}
                            <span className="font-semibold text-yellow-400">Ambaari Tours and Travels</span>, we value
                            your privacy and are committed to protecting your personal information. This Privacy Policy
                            explains how we collect, use, protect, and handle your data when you visit or interact with
                            our website and services.
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-5">
                        {sections.map(({ num, title, content }) => (
                            <div
                                key={num}
                                className="rounded-2xl border border-yellow-500/12 bg-white/[0.03] overflow-hidden"
                            >
                                {/* Section header */}
                                <div className="flex items-center gap-4 px-6 py-4 bg-yellow-500/7 border-b border-yellow-500/10">
                                    <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-black text-sm font-bold">
                                        {num}
                                    </span>
                                    <h2 className="text-base font-semibold text-yellow-300">{title}</h2>
                                </div>

                                {/* Section body */}
                                <div className="px-6 py-5 [&.pp-text]:text-sm [&.pp-text]:text-gray-300 [&.pp-text]:leading-[1.75] [&.pp-text]:mb-3 [&.pp-subsection]:text-xs [&.pp-subsection]:font-semibold [&.pp-subsection]:uppercase [&.pp-subsection]:tracking-wider [&.pp-subsection]:text-yellow-500 [&.pp-subsection]:mt-3 [&.pp-subsection]:mb-1.5 [&.pp-list]:flex [&.pp-list]:flex-col [&.pp-list]:gap-1.5 [&.pp-list]:mb-3 [&.pp-list_li]:text-sm [&.pp-list_li]:text-gray-300 [&.pp-list_li]:leading-relaxed [&.pp-list_li]:pl-5 [&.pp-list_li]:relative before:[&.pp-list_li]:content-[''] before:[&.pp-list_li]:absolute before:[&.pp-list_li]:left-0 before:[&.pp-list_li]:top-[9px] before:[&.pp-list_li]:w-1.5 before:[&.pp-list_li]:h-1.5 before:[&.pp-list_li]:rounded-full before:[&.pp-list_li]:bg-yellow-500/70">
                                    {content}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Section 10 — Contact */}
                    <div className="mt-5 rounded-2xl border border-yellow-500/12 bg-white/[0.03] overflow-hidden">
                        <div className="flex items-center gap-4 px-6 py-4 bg-yellow-500/7 border-b border-yellow-500/10">
                            <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-black text-sm font-bold">
                                10
                            </span>
                            <h2 className="text-base font-semibold text-yellow-300">Contact Us</h2>
                        </div>
                        <div className="px-6 py-5">
                            <p className="text-sm text-gray-300 leading-relaxed mb-4">
                                If you have any questions regarding this Privacy Policy, reach us at:
                            </p>
                            <div className="flex flex-wrap gap-4">
                                {/* Email */}
                                <a
                                    href="mailto:ambaaritoursandtravels19@gmail.com"
                                    className="flex items-center gap-3 bg-yellow-500/8 hover:bg-yellow-500/15 border border-yellow-500/20 rounded-xl px-4 py-3 transition-colors group"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 stroke-yellow-400 fill-none" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-0.5">Email</p>
                                        <p className="text-sm font-medium text-yellow-400 group-hover:text-yellow-300">
                                            ambaaritoursandtravels19@gmail.com
                                        </p>
                                    </div>
                                </a>

                                {/* Phone */}
                                <a
                                    href="tel:+918073097430"
                                    className="flex items-center gap-3 bg-yellow-500/8 hover:bg-yellow-500/15 border border-yellow-500/20 rounded-xl px-4 py-3 transition-colors group"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 stroke-yellow-400 fill-none" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                                        <p className="text-sm font-medium text-yellow-400 group-hover:text-yellow-300">
                                            +91 80730 97430
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    
                </main>
            </div>
            <Footer />
        </div>
    );
}