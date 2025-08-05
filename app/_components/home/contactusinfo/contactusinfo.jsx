'use client';

import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'sonner';

export default function ContactSection() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Request submitted!');
    setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-black text-white p-10 rounded-xl">
      {/* Contact Information */}
      <div>
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 drop-shadow-[0_0_10px_rgba(255,255,0,0.5)]">
          Contact Information
        </h2>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-yellow-500">
              <FaMapMarkerAlt />
              <span className="font-bold">ADDRESS:</span>
            </div>
            <p className="ml-6">
              Gastronomic Arts Barcelona<br />
              Carrer de Lancaster, 10, Bajo 1a, Barcelona, Spain, 08001
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-yellow-500">
              <FaPhoneAlt />
              <span className="font-bold">PHONE:</span>
            </div>
            <p className="ml-6">+34 946 41 53 99</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-yellow-500">
              <FaEnvelope />
              <span className="font-bold">EMAIL:</span>
            </div>
            <p className="ml-6">hello@gastronomicartsbarcelona.com</p>
          </div>
        </div>

        <div className="mt-8 rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.117250140971!2d2.170948815420827!3d41.37930457926465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f53c5c8757%3A0x8a79bc6c1b6f0eb1!2sCarrer%20de%20Lancaster%2C%2010%2C%2008001%20Barcelona%2C%20Spain!5e0!3m2!1sen!2sus!4v1688555024392!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
      </div>

      {/* Contact Form */}
      <div>
        <h2 className="text-3xl font-bold text-yellow-100 mb-6 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
              className="bg-zinc-900 p-3 rounded-md border border-zinc-700 focus:border-yellow-400 focus:outline-none"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
              className="bg-zinc-900 p-3 rounded-md border border-zinc-700 focus:border-yellow-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="bg-zinc-900 p-3 rounded-md border border-zinc-700 focus:border-yellow-400 focus:outline-none"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="bg-zinc-900 p-3 rounded-md border border-zinc-700 focus:border-yellow-400 focus:outline-none"
            />
          </div>

          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            className="w-full bg-zinc-900 p-3 rounded-md border border-zinc-700 focus:border-yellow-400 focus:outline-none"
          ></textarea>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-black border border-yellow-500 text-yellow-500 rounded-md hover:bg-yellow-500 hover:text-black transition-colors duration-300"
          >
            <FaPaperPlane />
            Request a Quote
          </button>
        </form>
      </div>
    </div>
  );
}
