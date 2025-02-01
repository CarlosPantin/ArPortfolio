"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      await fetch("https://formsubmit.co/carlospantinpang@outlook.com", {
        method: "POST",
        body: formData,
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitted(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
      {!submitted ? (
        <>
          <h1 className="text-4xl font-bold mb-6">Contact Me</h1>
          <p className="mb-6 text-gray-300">
            Send me a message and I will get back to you!
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="hidden"
              name="_next"
              value="https://yourwebsite.com/thank-you"
            />

            <label className="text-sm">Your Name</label>
            <input
              type="text"
              name="name"
              required
              className="p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />

            <label className="text-sm">Your Email</label>
            <input
              type="email"
              name="email"
              required
              className="p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />

            <label className="text-sm">Your Message</label>
            <textarea
              name="message"
              required
              rows={4}
              className="p-2 rounded bg-gray-700 border border-gray-600 text-white"
            ></textarea>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg font-semibold transition-all"
            >
              Send Message
            </button>
          </form>
        </>
      ) : (
        <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold">✅ Message Sent!</h2>
          <p className="mt-2">I will get back to you soon.</p>
        </div>
      )}
    </div>
  );
}
