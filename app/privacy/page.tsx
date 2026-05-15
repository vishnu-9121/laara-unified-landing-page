import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

import { getNavLinks, getSystemConfig } from "@/app/actions/cms"

export default async function PrivacyPage() {
  const [navLinks, config] = await Promise.all([
    getNavLinks(),
    getSystemConfig()
  ])
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation customLinks={navLinks} config={config} />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col mb-16 border-b border-white/10 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 w-fit">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Official Policy</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-white mb-4">
            Laara Innovations <span className="text-primary">Privacy Statement</span>
          </h1>
          <p className="text-sm text-gray-500 font-medium tracking-widest uppercase italic">
            Effective as of May 20, 2026
          </p>
        </div>

        <div className="space-y-16 text-gray-400 font-normal leading-relaxed">
          {/* Mission */}
          <section className="prose prose-invert max-w-none">
            <p className="text-lg text-white/90 leading-relaxed italic border-l-2 border-primary pl-6">
              Laara Innovations&apos;s mission is to enable anyone in an organization to quickly uncover insights hidden in their data, and make fact-based decisions, leading to a more data-driven culture. This mission is underpinned by our commitment to be transparent about the data we collect about you, how we use that data, and with whom it is shared.
            </p>
          </section>

          {/* Activities Covered */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider sticky top-32">Processing Activities Covered</h2>
            </div>
            <div className="lg:col-span-8 prose prose-invert max-w-none">
              <p>This Privacy Statement describes how we collect, use, share or otherwise process information relating to individuals (&ldquo;Personal Data&rdquo;) and the rights that may be associated with that processing of Personal Data collected by us when you:</p>
              <ul>
                <li>Visit our websites that display or link to this Privacy Statement (&ldquo;Website&rdquo;);</li>
                <li>Visit our offices;</li>
                <li>Visit our branded social media pages;</li>
                <li>Receive communications or otherwise communicate with us such as through emails, phone calls, texts, messaging platforms, or faxes;</li>
                <li>Use our software-as-a-service and software products (&ldquo;Products&rdquo;) and related support and consulting services (&ldquo;Services&rdquo;) where we act as a controller of your Personal Data;</li>
                <li>Register for, attend, or participate in our events, webinars, programs, or trainings (&ldquo;Events&rdquo;);</li>
                <li>Are employed by a customer of our Products and Services where your information has been shared with us in our capacity as a controller (for example, during the contracting process);</li>
                <li>Participate in the Laara Innovations Community site focused on exchanging ideas and best practices, and collaborating with other customers, partners, and Laara Innovations employees; or</li>
                <li>Participate in surveys, research, or other similar data collection facilitated by us.</li>
              </ul>
              <p>In some circumstances, we collect, or our partners provide us with, publicly available information that may contain Personal Data that you have published or that has been made available online. The way in which our partners collect this is detailed in their own privacy policies, available on their websites.</p>
              <p>This Privacy Statement does not apply to third-party products, services, or businesses subject to separate terms, agreements, or privacy disclosures, or that are otherwise not offered under Laara Innovations&apos;s express agreements, regardless of whether they integrate with or interact with our Products (e.g., a Customer&apos;s on-site repository, cloud data warehouse, or a connected platform) (&ldquo;Third-Party Services&rdquo;). Product delivery, access, and use will be governed by separate terms signed between us and each Customer, under which the Customer will control its deployment of our Product and any data hosted therein. If you have any questions about specific Product settings or privacy practices, please contact the administrator assigned to that role in the related Product.</p>
            </div>
          </section>

          {/* Definitions */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16">
            <div className="lg:col-span-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider sticky top-32">Definitions</h2>
            </div>
            <div className="lg:col-span-8 space-y-6">
              <p>For the purposes of this Privacy Statement:</p>
              <div className="space-y-4">
                <div>
                  <h4 className="text-primary font-bold mb-1">&ldquo;Authorized User&rdquo;</h4>
                  <p className="text-sm">Means an individual who was provided access credentials to access and use the Product by Customer, or otherwise using Customer&apos;s account.</p>
                </div>
                <div>
                  <h4 className="text-primary font-bold mb-1">&ldquo;Customer&rdquo;</h4>
                  <p className="text-sm">Means the entity that purchases our Product or Services, or if a Product is offered for free, the entity or individual that is subject to the applicable terms of use.</p>
                </div>
                <div>
                  <h4 className="text-primary font-bold mb-1">&ldquo;Mobile Applications&rdquo;</h4>
                  <p className="text-sm">Means our applications you have downloaded to a mobile device.</p>
                </div>
                <div>
                  <h4 className="text-primary font-bold mb-1">&ldquo;Partner&rdquo;</h4>
                  <p className="text-sm">Means an entity that is a participant in a Laara Innovations channel sales, technology, or other program to offer Laara Innovations Products and Services for sale, or provide services, or technology to Laara Innovations Customers.</p>
                </div>
              </div>
              <p className="text-sm italic">This Privacy Statement is meant to help you understand what information we collect, why we collect it, and how you can exercise certain rights with respect to your Personal Data. If you have any questions about our use of your Personal Data, please contact us using the contact details provided at the bottom of this Privacy Statement and we will respond accordingly.</p>
            </div>
          </section>

          {/* Data We Collect */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16">
            <div className="lg:col-span-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider sticky top-32">What Personal Data We Collect</h2>
            </div>
            <div className="lg:col-span-8 prose prose-invert max-w-none">
              <p>The types of Personal Data we collect depend upon your interactions with us. We may collect information directly from you when you visit our Websites, attend our Events, or purchase or use our Products and Services. We may also collect information from trusted third-party sources and may engage select third-parties to collect Personal Data to assist us in operating our business. The types of information we collect from you may include the following:</p>

              <div className="space-y-8 mt-8">
                <div>
                  <h3 className="text-white text-lg font-bold">Contact Information and Personal Details</h3>
                  <p>Authorized User credentials, full name, employer, job title and related employment information, email address, physical address, phone number, and other information such as your voice if you contact us by phone. We process your Personal Data, including recording phone calls (in accordance with applicable laws) for training, quality assurance, uncovering customer insights, and administration purposes. If required under applicable law, we will give you the option to object to a call being recorded.</p>
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold">Authorized User Profiles</h3>
                  <p>For some Products (e.g., Laara Innovations Mode), we may enable Authorized Users to create profiles. This may include a photo of you, a short bio, links to your presence on social media sites, and other information you choose to include about yourself. The information you submit for display in your profile, including any Personal Data, may be viewable by other Authorized Users of Laara Innovations Mode based on the type and configuration of your account.</p>
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold">Payment, Billing, and Shipping Information</h3>
                  <p>Financial information in connection with billing including, without limitation, billing, and shipping address.</p>
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold">Demographic Information</h3>
                  <p>On rare occasions, we may collect demographic information, such as gender, race, ethnicity, or veteran status. Where Personal Data is deemed &ldquo;sensitive&rdquo; under applicable data privacy laws, we will only process it with your consent unless a recognized exception applies.</p>
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold">Event Information</h3>
                  <p>Information related to your attendance at Events, including travel details and contact information, scheduling information, food preferences or allergies and accessibility requests, clothing sizes, and session ratings or other feedback.</p>
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold">Online Identifiers and Interactions</h3>
                  <p>Device and user identifiers, Internet protocol address or location data when you access the Website, Products, or Mobile Applications and related user actions.</p>
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold">Device Information</h3>
                  <p>Information relating to settings, attributes, identifiers, and interactions when you access the Website, Products, or Mobile Applications.</p>
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold">Search Query Data and Feedback</h3>
                  <p>The search text submitted by Authorized Users of the Products when using our natural language processing functionality and user submitted feedback.</p>
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold">Predictive Search Setup</h3>
                  <p>Upon purchase and subject to Customer selection, a Customer may choose to store limited, selected information via search suggestion indexing and search cache features provided in the Products.</p>
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold">Mode Uploaded Content</h3>
                  <p>For Authorized Users of Laara Innovations Mode, you may upload data to the platform or post various queries, comments, analyses, and other content. If you choose to post Your Content in Mode&apos;s public function, Your Content is deemed a contribution to the community, and Mode will treat such information as public information.</p>
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold">Products Operations Data and Usage Data</h3>
                  <p>Information from our software or systems comprising our Products and from Customer systems, applications, and devices that are used to access the Products.</p>
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold">Authentication and Access Information</h3>
                  <p>Information that provides access to the Products, such as username, passwords, and device identifiers. In addition, the Personal Data we collect to provide our Products may include location information from third parties.</p>
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold">Diagnostic Information</h3>
                  <p>Diagnostic information may be contained in log files, event files, and other trace and diagnostic files, which helps us to provide support and maintain the integrity of the Products and Services.</p>
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold">Third-Party Services Information</h3>
                  <p>A Customer can choose to permit or restrict Third-Party Services for its Product(s) and Laara Innovations can receive Personal Data from such Third-Party Services.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Third Party Services Detail */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16">
            <div className="lg:col-span-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider sticky top-32">Third Party Services</h2>
            </div>
            <div className="lg:col-span-8 prose prose-invert max-w-none">
              <p>Please note, Third-Party Services are typically software that integrate with our Product, and a Customer can permit its Authorized Users to enable and disable these integrations. Laara Innovations may also develop and offer extensions that connect the Products with a Third-Party Service. Once enabled, the provider of a Third-Party Service may share certain information with Laara Innovations.</p>
              <p>Customers should check the privacy settings and notices in these Third-Party Services to understand what data may be disclosed to Laara Innovations. When a Third-Party Service is enabled, Laara Innovations is authorized to connect and access the information made available to Laara Innovations in accordance with our agreement with the provider of the Third-Party Service.</p>
            </div>
          </section>

          {/* How We Use Your Data */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16">
            <div className="lg:col-span-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider sticky top-32">How We Use Your Personal Data</h2>
            </div>
            <div className="lg:col-span-8 prose prose-invert max-w-none">
              <p>We may use your Personal Data for the purposes of operating our business, delivering, improving, and customizing our Websites, Products and Services, selling our Products and Services, sending marketing and other communications related to our business, and for other legitimate purposes permitted by applicable law. Some ways we may use Personal Data include:</p>
              <ul>
                <li>To understand your preferences so we may enhance your experience;</li>
                <li>To send our Customers and Partners Laara Innovations-related information, confirmations, and security alerts;</li>
                <li>To communicate with you about promotions, upcoming events, or marketing purposes;</li>
                <li>To help understand your needs by linking or combining information about you with other Personal Data we get from third-parties;</li>
                <li>To enforce our terms and conditions or protect our business;</li>
                <li>To operate, maintain, and provide the features and functionality of the Website;</li>
                <li>To register you for Events you sign up for and populate profiles;</li>
                <li>For reward or prize fulfillment to participants in promotional events;</li>
                <li>For industry analysis, benchmarking, analytics, and marketing purposes;</li>
                <li>For billing and contracting purposes;</li>
                <li>To make recommendations to customers regarding their use of the Products;</li>
                <li>To improve the Products and Services;</li>
                <li>For tracking entitlements, providing support, monitoring, and ensuring performance;</li>
                <li>To comply with legal obligations and operate our business.</li>
              </ul>
              <p>If you are from the European Economic Area (&ldquo;EEA&rdquo;), our legal basis for collecting and using the Personal Data described above will depend on the Personal Data concerned and the specific context in which we collect it.</p>
            </div>
          </section>

          {/* How We Share Your Data */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16">
            <div className="lg:col-span-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider sticky top-32">How We Share Your Personal Data</h2>
            </div>
            <div className="lg:col-span-8 prose prose-invert max-w-none">
              <p>We may share your Personal Data with third-parties for the purposes of operating our business, selling, delivering, and improving our Products and Services, or otherwise with your consent.</p>
              <ul>
                <li>Within Laara Innovations, Inc. and any of our global subsidiaries;</li>
                <li>With third-party vendors, contractors, consultants, and other service providers that perform services on our behalf;</li>
                <li>With third-party vendors who assist with reward or prize delivery;</li>
                <li>In connection with, or during negotiations of, any merger, sale of company assets, or acquisition;</li>
                <li>In response to a request for information by a competent authority;</li>
                <li>With law enforcement officials as necessary to comply with legal process;</li>
                <li>In aggregated, anonymized, or de-identified form.</li>
              </ul>
              <p>We do not sell Personal Data nor do we rent or trade Personal Data collected through the Website with third-parties for their promotional purposes.</p>
              <p><strong>Google API data</strong> - Use and transfer of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements. Google Workspace APIs are not used to develop, improve, or train generalized AI and/or ML models.</p>
            </div>
          </section>

          {/* Mobile Applications */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16">
            <div className="lg:col-span-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider sticky top-32">Mobile Applications</h2>
            </div>
            <div className="lg:col-span-8 prose prose-invert max-w-none">
              <p>We may obtain additional information through Mobile Applications that you download to your mobile device (&ldquo;Device&rdquo;). Our Mobile Applications may obtain, collect, or access information from your Device in connection with your use of the Products, and are designed to interoperate with the Products.</p>
              <p>To provide and operate the Mobile Applications, we need certain information from you, such as login credentials. We may also collect Device event information, such as error logs and crashes, which allows us to improve our Mobile Application for a better user experience.</p>
            </div>
          </section>

          {/* Security */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16">
            <div className="lg:col-span-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider sticky top-32">How We Secure Your Personal Data</h2>
            </div>
            <div className="lg:col-span-8 prose prose-invert max-w-none">
              <p>We implement physical, administrative, and technical safeguards designed to protect your Personal Data from unauthorized access, use, or disclosure. We also contractually require that our service providers protect such information. In addition, we limit access to Personal Data to those employees, agents, contractors, and other third-parties that have a legitimate business need for such access.</p>
            </div>
          </section>

          {/* Retention */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16">
            <div className="lg:col-span-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider sticky top-32">How Long We Retain Your Personal Data</h2>
            </div>
            <div className="lg:col-span-8 prose prose-invert max-w-none">
              <p>We will retain your Personal Data as needed to fulfill the purposes for which it was collected. We will retain and use your Personal Data as necessary to comply with our business requirements, legal obligations, resolve disputes, protect our assets, and enforce our agreements. When we have no ongoing legitimate business need to process your Personal Data, we will either delete it or anonymize it.</p>
            </div>
          </section>

          {/* Controlling Your Data */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16">
            <div className="lg:col-span-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider sticky top-32">Controlling Your Personal Data</h2>
            </div>
            <div className="lg:col-span-8 prose prose-invert max-w-none">
              <p>Our marketing emails permit you to &quot;opt-out&quot; of or &ldquo;unsubscribe&rdquo; from receiving further marketing emails. Subject to local law, you may have the right to access, delete, receive a copy of or object to or restrict the processing of, to data portability, or to request that we correct any inaccuracies.</p>
              <p>You may contact us to exercise your rights using the contact details provided below. Please note that to fulfill your request, we may need you to provide certain information to verify your identity.</p>
            </div>
          </section>

          {/* Cookies */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16">
            <div className="lg:col-span-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider sticky top-32">Cookies and Web Beacons</h2>
            </div>
            <div className="lg:col-span-8 prose prose-invert max-w-none">
              <p>Like many websites, Laara Innovations uses automatic data collection tools, such as cookies, embedded web links, and web beacons. &ldquo;Cookies&rdquo; are small text files that we and others may place in users&apos; computer browsers to store their preferences. &ldquo;Web beacons&rdquo; or &ldquo;pixel tags&rdquo; are small pieces of code placed on a web page or within the body of an email to monitor the behavior.</p>
              <p>To manage the use of targeting and advertising cookies on our Website, click the Cookie icon at the bottom left footer of the page or consult your individual browser settings for cookies.</p>
            </div>
          </section>

          {/* General */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16">
            <div className="lg:col-span-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider sticky top-32">General</h2>
            </div>
            <div className="lg:col-span-8 prose prose-invert max-w-none space-y-8">
              <div>
                <h3 className="text-white text-lg font-bold">Linked Websites</h3>
                <p>Our Websites may contain links to other websites, applications, platforms, and services maintained by third parties. The information practices of these third parties are governed by their privacy policies.</p>
              </div>
              <div>
                <h3 className="text-white text-lg font-bold">Forums and Chat Rooms</h3>
                <p>We offer you the ability to post information and exchange ideas through our Websites and certain Product offerings. Be aware that the information you provide there will be made broadly available to others.</p>
              </div>
              <div>
                <h3 className="text-white text-lg font-bold">Children&apos;s Privacy</h3>
                <p>We do not knowingly collect Personal Data from children without appropriate parental or guardian consent.</p>
              </div>
            </div>
          </section>

          {/* Changes */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16">
            <div className="lg:col-span-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider sticky top-32">Changes to this Privacy Statement</h2>
            </div>
            <div className="lg:col-span-8 prose prose-invert max-w-none">
              <p>Laara Innovations may modify or update this Privacy Statement from time to time. When we make a material change, we will post the revised version with an updated &lsquo;effective date&rsquo; at the top of this page.</p>
              <p>You acknowledge that your continued use of our Website after we publish changes means that the collection, use, and sharing of your Personal Data is subject to the updated Privacy Statement.</p>
            </div>
          </section>

          {/* Resolution */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16">
            <div className="lg:col-span-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider sticky top-32">Complaint Resolution</h2>
            </div>
            <div className="lg:col-span-8 prose prose-invert max-w-none">
              <p>Laara Innovations commits to resolve concerns about your privacy. If Laara Innovations cannot resolve the concern by internal procedures, then you agree that any disputes or claims will be determined solely in binding, individual arbitration pursuant to the Indian DPDPA, 2023.</p>
              <p>If you work or reside in a country that is a member of the European Union or that is in the EEA, you have the right to lodge a complaint with the competent supervisory authority.</p>
            </div>
          </section>

          {/* Contact */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16">
            <div className="lg:col-span-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider sticky top-32">How to Contact Us</h2>
            </div>
            <div className="lg:col-span-8 bg-white/5 p-8 lg:p-12 rounded-[2.5rem] border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h4 className="text-primary font-bold uppercase tracking-widest text-xs">Mailing Address</h4>
                  <address className="not-italic text-sm text-gray-300 leading-relaxed">
                    Laara Innovations Pvt. Ltd.<br />
                    Vijayawada, near Amaravathi<br />
                    Andhra Pradesh, 521101
                  </address>
                </div>
                <div className="space-y-4">
                  <h4 className="text-primary font-bold uppercase tracking-widest text-xs">Digital & Voice</h4>
                  <p className="text-sm text-gray-300">Email: <a href="laarainnovations26@gmail.com" className="text-white hover:text-primary transition-colors">laarainnovations26@gmail.com</a></p>
                  <p className="text-sm text-gray-300">Phone: +91 9010906126</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer config={config} />
    </main>
  )
}
