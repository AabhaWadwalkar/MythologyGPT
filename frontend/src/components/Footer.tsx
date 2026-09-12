// export const Footer=()=>{
//     return(
//         <footer>
//             <p>AI Mythology Knowledge Engine</p>
//         </footer>
//     );
// };

import "../CSS/Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-symbol">✦</div>

          <div>
            <h3>AI Mythology</h3>
            <p>Knowledge Engine</p>
          </div>
        </div>

        <p className="footer-description">
          An AI-powered platform for exploring mythology through
          intelligent knowledge retrieval and interactive discovery.
        </p>

        <div className="footer-divider"></div>

        <p className="footer-bottom">
          AI Mythology Knowledge Engine · Final Year AI Project
        </p>
      </div>
    </footer>
  );
};