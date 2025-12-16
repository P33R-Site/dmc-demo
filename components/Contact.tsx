"use client";

import { ChevronDown } from "lucide-react";

export default function Contact() {
    return (
        <section className="py-24 px-6 bg-zinc-900 border-t border-white/5">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <p className="font-script text-3xl text-zinc-400 mb-2">
                        Experience Travel with PRV8
                    </p>
                    <h2 className="text-4xl font-semibold text-white tracking-tight">
                        Get in Touch
                    </h2>
                </div>

                <div className="glass-panel p-8 md:p-12 rounded-2xl">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            placeholder="Name"
                            className="input-glass w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-zinc-600"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="input-glass w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-zinc-600"
                        />

                        <div className="flex gap-2">
                            <div className="w-20 input-glass flex items-center justify-center rounded-lg text-sm text-zinc-400 border border-white/10">
                                +44
                            </div>
                            <input
                                type="tel"
                                placeholder="Contact No."
                                className="input-glass flex-1 px-4 py-3 rounded-lg text-sm text-white placeholder:text-zinc-600"
                            />
                        </div>

                        <div className="relative">
                            <select className="input-glass w-full px-4 py-3 rounded-lg text-sm text-zinc-400 appearance-none cursor-pointer">
                                <option>Destinations</option>
                                <option>Europe</option>
                                <option>Asia</option>
                                <option>Americas</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                        </div>

                        <textarea
                            placeholder="Please write your message here"
                            rows={4}
                            className="md:col-span-2 input-glass w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-zinc-600 resize-none"
                        ></textarea>

                        <div className="md:col-span-2 flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="consent"
                                className="mt-1 bg-transparent border-zinc-600 rounded text-sky-500 focus:ring-0"
                            />
                            <label
                                htmlFor="consent"
                                className="text-[10px] text-zinc-500 leading-tight"
                            >
                                I agree to receive marketing communications and updates from
                                Bank of PRV8 and their partners. I
                                understand that my details will be used in accordance with the
                                privacy policy.
                            </label>
                        </div>

                        <div className="md:col-span-2 bg-[#f9f9f9] p-3 rounded-lg max-w-[200px] border border-gray-300">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 border-2 border-gray-300 rounded bg-white"></div>
                                <span className="text-xs text-black font-medium">
                                    I'm not a robot
                                </span>
                                <img
                                    src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                                    className="w-8 h-8 ml-auto opacity-50"
                                    alt="reCAPTCHA"
                                />
                            </div>
                        </div>

                        <button className="md:col-span-2 w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors shadow-lg shadow-orange-500/20 cursor-pointer">
                            LET'S GO
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
