import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

export const metadata = {
    title: 'Terms & Conditions | Ambaari Tours & Travels',
    description:
        'Terms & Conditions for domestic and international tour packages booked with Ambaari Tours and Travels, including our cancellation and refund policy for each.',
};

type Section = { num: string; title: string; content: React.ReactNode };

const domesticSections: Section[] = [
    {
        num: '01',
        title: 'Tour Operation & Responsibility',
        content: (
            <>
                <p className="pp-text">
                    Ambaari Tours and Travels acts only as an agent for hotels, transport operators, railways, and
                    other independent service providers for domestic tours.
                </p>
                <p className="pp-text">
                    We are not responsible for delays, cancellations, or rescheduling of trains, flights, or buses,
                    or for changes in itinerary due to weather, technical reasons, natural disasters, political
                    disturbances, road blockages, or other unforeseen circumstances beyond our control.
                </p>
            </>
        ),
    },
    {
        num: '02',
        title: 'Travel Insurance (Recommended)',
        content: (
            <>
                <p className="pp-text">
                    Travelers are strongly recommended to have valid travel insurance covering medical emergencies,
                    trip cancellations, baggage loss, etc.
                </p>
                <p className="pp-text">
                    In the absence of travel insurance, Ambaari Tours and Travels will not be responsible for any
                    financial loss, injury, damage, or inconvenience during travel.
                </p>
            </>
        ),
    },
    {
        num: '03',
        title: 'Identification & Travel Documents',
        content: (
            <>
                <p className="pp-text">
                    Travelers must carry a valid government-issued photo ID (Aadhar Card, PAN Card, Voter ID, or
                    Passport) as required for hotel check-ins and travel bookings.
                </p>
                <p className="pp-text">
                    Any delay or denial of service due to incomplete, incorrect, or invalid identification is
                    entirely the responsibility of the customer.
                </p>
            </>
        ),
    },
    {
        num: '04',
        title: 'Force Majeure / Unforeseen Events',
        content: (
            <p className="pp-text">
                Ambaari Tours and Travels shall not be liable for compensation, refund, or claim for changes in
                itinerary or unutilized services resulting from force majeure events, including weather disruptions,
                strikes, natural calamities, pandemics, road or rail disruptions, or government restrictions.
            </p>
        ),
    },
    {
        num: '05',
        title: 'Package Pricing',
        content: (
            <>
                <p className="pp-text">Package cost is based on current rates and taxes at the time of booking.</p>
                <p className="pp-text">
                    Any increase in taxes, fuel surcharge, toll charges, or transport fares after booking shall be
                    payable by the customer.
                </p>
            </>
        ),
    },
    {
        num: '06',
        title: 'Cancellation & Refund Policy',
        content: (
            <>
                <p className="pp-text">All cancellations must be made in writing.</p>
                <ul className="pp-list">
                    <li>Cancellations made 30+ days before departure: refund of the advance minus a 10% processing fee</li>
                    <li>Cancellations made 15–29 days before departure: 50% cancellation charge</li>
                    <li>Cancellations made within 14 days of departure: non-refundable</li>
                </ul>
                <p className="pp-text">
                    Additional cancellation charges imposed by hotels, transport operators, or other service
                    providers will apply as per their own policies. No refund will be provided for partially used
                    services.
                </p>
            </>
        ),
    },
    {
        num: '07',
        title: 'Customer Declaration',
        content: (
            <p className="pp-text">
                I/We have read, understood, and agree to abide by the above terms and conditions. I/We acknowledge
                that Ambaari Tours and Travels is acting as a facilitator/agent and is not responsible for
                circumstances beyond its control.
            </p>
        ),
    },
];

const internationalSections: Section[] = [
    {
        num: '01',
        title: 'Tour Operation & Responsibility',
        content: (
            <>
                <p className="pp-text">
                    Ambaari Tours and Travels acts only as an agent for airlines, hotels, transport operators, and
                    other independent service providers.
                </p>
                <p className="pp-text">
                    We are not responsible for flight delays, cancellations, rescheduling, or changes in itinerary
                    due to weather, technical reasons, natural disasters, political disturbances, or other
                    unforeseen circumstances beyond our control.
                </p>
            </>
        ),
    },
    {
        num: '02',
        title: 'Travel Insurance (Mandatory)',
        content: (
            <>
                <p className="pp-text">
                    All travelers must have valid travel insurance covering medical emergencies, trip cancellations,
                    baggage loss, etc.
                </p>
                <p className="pp-text">
                    In the absence of travel insurance, Ambaari Tours and Travels will not be responsible for any
                    financial loss, injury, damage, or inconvenience during travel.
                </p>
            </>
        ),
    },
    {
        num: '03',
        title: 'Passport, Visa & Immigration',
        content: (
            <>
                <p className="pp-text">
                    Travelers must ensure they hold a valid passport (with required minimum validity), visa, and
                    necessary travel documents.
                </p>
                <p className="pp-text">
                    Any delay, deportation, or denial of entry due to incomplete, incorrect, or invalid documents is
                    entirely the responsibility of the customer.
                </p>
            </>
        ),
    },
    {
        num: '04',
        title: 'Force Majeure / Unforeseen Events',
        content: (
            <p className="pp-text">
                Ambaari Tours and Travels shall not be liable for compensation, refund, or claim for changes in
                itinerary or unutilized services resulting from force majeure events, including weather disruptions,
                strikes, natural calamities, pandemics, or government restrictions.
            </p>
        ),
    },
    {
        num: '05',
        title: 'Package Pricing',
        content: (
            <>
                <p className="pp-text">
                    Package cost is based on current rates, taxes, and currency exchange rates at the time of
                    booking.
                </p>
                <p className="pp-text">
                    Any increase in taxes, fuel surcharge, visa fees, or currency exchange fluctuation after booking
                    shall be payable by the customer.
                </p>
            </>
        ),
    },
    {
        num: '06',
        title: 'Cancellation & Refund Policy',
        content: (
            <>
                <p className="pp-text">All cancellations must be made in writing.</p>
                <ul className="pp-list">
                    <li>Cancellations made 30+ days before departure: refund of the advance minus a 10% processing fee</li>
                    <li>Cancellations made 15–29 days before departure: 50% cancellation charge</li>
                    <li>Cancellations made within 14 days of departure: non-refundable</li>
                </ul>
                <p className="pp-text">
                    Applicable cancellation charges as per company policy and those imposed by airlines, hotels, and
                    other service providers will apply. No refund will be provided for partially used services.
                </p>
            </>
        ),
    },
    {
        num: '07',
        title: 'Customer Declaration',
        content: (
            <p className="pp-text">
                I/We have read, understood, and agree to abide by the above terms and conditions. I/We acknowledge
                that Ambaari Tours and Travels is acting as a facilitator/agent and is not responsible for
                circumstances beyond its control. I/We confirm that valid travel insurance has been purchased;
                otherwise, I/we accept full responsibility for any issues or losses arising from non-purchase of
                travel insurance.
            </p>
        ),
    },
];

function SectionGroup({ groupLabel, sections, idPrefix }: { groupLabel: string; sections: Section[]; idPrefix: string }) {
    return (
        <div className="space-y-5">
            {sections.map(({ num, title, content }) => (
                <div
                    key={`${idPrefix}-${num}`}
                    className="rounded-2xl border border-yellow-500/12 bg-white/[0.03] overflow-hidden"
                >
                    <div className="flex items-center gap-4 px-6 py-4 bg-yellow-500/7 border-b border-yellow-500/10">
                        <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-black text-sm font-bold">
                            {num}
                        </span>
                        <h3 className="text-base font-semibold text-yellow-300">{title}</h3>
                    </div>
                    <div className="px-6 py-5 [&.pp-text]:text-sm [&.pp-text]:text-gray-300 [&.pp-text]:leading-[1.75] [&.pp-text]:mb-3 [&.pp-list]:flex [&.pp-list]:flex-col [&.pp-list]:gap-1.5 [&.pp-list]:mb-3 [&.pp-list_li]:text-sm [&.pp-list_li]:text-gray-300 [&.pp-list_li]:leading-relaxed [&.pp-list_li]:pl-5 [&.pp-list_li]:relative before:[&.pp-list_li]:content-[''] before:[&.pp-list_li]:absolute before:[&.pp-list_li]:left-0 before:[&.pp-list_li]:top-[9px] before:[&.pp-list_li]:w-1.5 before:[&.pp-list_li]:h-1.5 before:[&.pp-list_li]:rounded-full before:[&.pp-list_li]:bg-yellow-500/70">
                        {content}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function TermsPage() {
    return (
        <div>
            <Navbar />
            <BackToTop/>
            {/* <br></br> */}
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-200">

                {/* ── Hero ── */}
                <section className="relative overflow-hidden border-b-2 border-yellow-500 bg-gradient-to-br from-yellow-950/30 via-black to-gray-950 py-16 px-6">
                    <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-yellow-500/10" />

                    <div className="relative max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                            <span className="text-xs font-semibold uppercase tracking-widest text-yellow-400">
                                Legal
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                            Terms <span className="text-yellow-400">&amp; Conditions</span>
                        </h1>

                        <p className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="inline-block h-0.5 w-5 bg-yellow-500/70 rounded" />
                            Effective Date: February 2, 2026
                        </p>
                    </div>
                </section>

                {/* ── Body ── */}
                <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">

                    <div className="border-l-4 border-yellow-500 bg-yellow-500/5 rounded-r-xl px-5 py-4 mb-10">
                        <p className="text-[15px] text-gray-300 leading-relaxed">
                            Ambaari Tours and Travels offers both{' '}
                            <span className="font-semibold text-yellow-400">domestic</span> and{' '}
                            <span className="font-semibold text-yellow-400">international</span> tour packages, each
                            governed by their own terms below — please read the section that applies to your
                            booking. By confirming a booking with us, you agree to the relevant terms and conditions,
                            including our cancellation and refund policy.
                        </p>
                    </div>

                    {/* Domestic */}
                    <div className="mb-6 flex items-center gap-3">
                        <span className="flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-yellow-400">
                            Domestic Tour Packages
                        </span>
                        <span className="h-px flex-1 bg-yellow-500/15" />
                    </div>
                    <SectionGroup groupLabel="Domestic" sections={domesticSections} idPrefix="dom" />

                    {/* International */}
                    <div className="mt-12 mb-6 flex items-center gap-3">
                        <span className="flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-yellow-400">
                            International Tour Packages
                        </span>
                        <span className="h-px flex-1 bg-yellow-500/15" />
                    </div>
                    <SectionGroup groupLabel="International" sections={internationalSections} idPrefix="intl" />

                    {/* Contact */}
                    <div className="mt-10 rounded-2xl border border-yellow-500/12 bg-white/[0.03] overflow-hidden">
                        <div className="flex items-center gap-4 px-6 py-4 bg-yellow-500/7 border-b border-yellow-500/10">
                            <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-black text-sm font-bold">
                                08
                            </span>
                            <h2 className="text-base font-semibold text-yellow-300">Questions About These Terms?</h2>
                        </div>
                        <div className="px-6 py-5">
                            <p className="text-sm text-gray-300 leading-relaxed mb-4">
                                For any questions about our terms, cancellation policy, or a specific booking, reach
                                out to us:
                            </p>
                            <div className="flex flex-wrap gap-4">
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
