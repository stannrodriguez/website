// components/ExpandableSection.jsx
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./ExpandableSection.css";

const ExpandableSection = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      setShouldRender(true);
    } else if (contentRef.current) {
      const element = contentRef.current;
      element.addEventListener(
        "animationend",
        () => {
          setShouldRender(false);
        },
        { once: true }
      );
    }
  }, [isExpanded]);

  return (
    <div className={`section ${isExpanded ? "expanded" : ""}`}>
      <div className="section-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h2>{title}</h2>
        <span className="toggle-icon">{isExpanded ? "−" : "+"}</span>
      </div>

      {(shouldRender || isExpanded) && (
        <div
          ref={contentRef}
          className={`section-content ${isExpanded ? "section-content-enter" : "section-content-exit"}`}
        >
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

ExpandableSection.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default ExpandableSection;
