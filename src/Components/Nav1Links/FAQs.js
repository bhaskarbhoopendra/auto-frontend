import React, { useState } from 'react';
import faqData from '../../data/faqData.js'; 
import Banner from '../Banner/Banner';
import Navbar1 from '../Nav1/Navbar';
import Navbar2 from '../Nav2/Navbar';
import Footer from '../Footer/Footer';
import './FAQs.css'; // Ensure your CSS file is correctly linked

const FAQs = () => {
    const [expanded, setExpanded] = useState({});

    const toggleAnswer = (question) => {
        setExpanded((prev) => ({ ...prev, [question]: !prev[question] }));
    };

    return (
        <div>
            <Banner />
      <Navbar1 />
      <Navbar2 />
        <div style={{ backgroundColor: "#F3F5F6", textAlign: "center", padding:"70px" }}>
            <h1 className="faq-title">FAQs (Frequently Asked Questions)</h1>
            <div className="faq-container">

                {/* Shipping & Delivery Section */}
                <h2 className="faq-section-title">Shipping & Delivery</h2>
                {faqData.shippingDelivery.map((item, index) => (
                    <div className="faq-item" key={index}>
                        <div className="faq-question" onClick={() => toggleAnswer(item.question)}>
                            <span>{item.question}</span>
                            {/* Toggle between + and – sign */}
                            <span className="faq-plus-icon">
                                {expanded[item.question] ? '–' : '+'}
                            </span>
                        </div>
                        {expanded[item.question] && (
                            <div className="faq-answer">
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}

                {/* Return & Refund Section */}
                <h2 className="faq-section-title">Return & Refund</h2>
                {faqData.returnRefund.map((item, index) => (
                    <div className="faq-item" key={index}>
                        <div className="faq-question" onClick={() => toggleAnswer(item.question)}>
                            <span>{item.question}</span>
                            <span className="faq-plus-icon">
                                {expanded[item.question] ? '–' : '+'}
                            </span>
                        </div>
                        {expanded[item.question] && (
                            <div className="faq-answer">
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}

                {/* Product Section */}
                <h2 className="faq-section-title">Product</h2>
                {faqData.product.map((item, index) => (
                    <div className="faq-item" key={index}>
                        <div className="faq-question" onClick={() => toggleAnswer(item.question)}>
                            <span>{item.question}</span>
                            <span className="faq-plus-icon">
                                {expanded[item.question] ? '–' : '+'}
                            </span>
                        </div>
                        {expanded[item.question] && (
                            <div className="faq-answer">
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}

                {/* Other Section */}
                <h2 className="faq-section-title">Other</h2>
                {faqData.other.map((item, index) => (
                    <div className="faq-item" key={index}>
                        <div className="faq-question" onClick={() => toggleAnswer(item.question)}>
                            <span>{item.question}</span>
                            <span className="faq-plus-icon">
                                {expanded[item.question] ? '–' : '+'}
                            </span>
                        </div>
                        {expanded[item.question] && (
                            <div className="faq-answer">
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default FAQs;
