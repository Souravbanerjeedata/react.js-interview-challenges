function FAQItem({ faq, index }) {
  return (
    <div className="container">
      <div className="question-box">
        <button>{">"}</button>
        <div className="question">{faq.question}</div>
      </div>
      <div className="answer">{faq.answer}</div>
    </div>
  );
}

export default FAQItem;
