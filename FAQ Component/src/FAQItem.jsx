import { useEffect, useState } from "react";

function FAQItem({ faq, index }) {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (index === 0) {
      setIsShow(true);
    }
  }, []);

  function clickHandler() {
    setIsShow((isShow) => !isShow);
  }
  return (
    <div className="container">
      <div className="question-box">
        <button className={isShow ? "rotate" : ""} onClick={clickHandler}>
          {"⏷"}
        </button>
        <div className="question">{faq.question}</div>
      </div>
      {isShow && <div className="answer">{faq.answer}</div>}
    </div>
  );
}

export default FAQItem;
