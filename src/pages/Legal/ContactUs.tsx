import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Mail, Globe, MapPin } from "lucide-react";

const ContactUs = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
            <Navbar />
            <main className="flex-1 max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
                <div className="grid md:grid-cols-2 gap-12 text-slate-300">
                    <div className="space-y-6">
                        <p>Have questions or need support? We're here to help you with your bulk certificate generation needs.</p>

                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-slate-900 rounded-lg text-indigo-400">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-medium">Email</h3>
                                <p>support@lexiontech.xyz</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-slate-900 rounded-lg text-indigo-400">
                                <Globe size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-medium">Website</h3>
                                <p>www.lexiontech.xyz</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-slate-900 rounded-lg text-indigo-400">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-medium">Location</h3>
                                <p>Lexiontech Solutions</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
                        <h2 className="text-xl font-semibold text-white mb-6">Send us a Message</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input type="text" className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your Name" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input type="email" className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="your@email.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Message</label>
                                <textarea className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[120px]" placeholder="How can we help?"></textarea>
                            </div>
                            <button type="button" className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactUs;
