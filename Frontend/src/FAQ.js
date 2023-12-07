import React, { useState } from "react";
import "./App.css";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white mb-2 p-4 rounded shadow">
      <div
        className="flex justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="font-semibold">{question}</p>
        <button className="font-bold">{isOpen ? "▲" : "▼"}</button>
      </div>
      {isOpen && <p className="mt-2">{answer}</p>}
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "What are the payment options available?",
      answer:
        "You can pay using a variety of methods such as Internet Banking, Debit/Credit card, Wallet, UPI, and so on.",
    },
    {
      question: "Do we serve all over India?",
      answer:
        "We are currently based in Bhiwandi, however, we offer services nationwide via online consultations.",
    },
    {
      question: "Are online consultations available?",
      answer:
        "Yes, we offer teleconsultation and online services. Book an appointment at the link provided.",
    },
    {
      question: "How long will my appointment take?",
      answer:
        "The length of your appointment is determined by the condition or injuries being treated, as well as whether or not x-rays or an MRI are required. Please allow at least one hour for doctors to provide personalized attention and high-quality care.",
    },
    {
      question: "Is any referral required for appointments?",
      answer: "No, we do not require a referral for the appointments.",
    },
    {
      question: "Do I need to bring anything at my first appointment?",
      answer:
        "You may bring the following documents, if available: ID Proof, Prior medication list, Any prior diagnosis documentation, X-RAY reports",
    },
  ];

  return (
    <div className="bg-green-200 p-6 mt-6 flex justify-center">
      <div className="w-4/5 p-6 space-y-4">
        <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
