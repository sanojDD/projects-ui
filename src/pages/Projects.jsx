// import { Link } from "react-router-dom";
// import { Shield, Smartphone, Camera } from "lucide-react"; // Added Camera icon
// import "./Projects.css";

// const Projects = () => {
//   const projectList = [
//     {
//       id: "deepfake",
//       title: "Deepfake Detector",
//       desc: "Detect AI-generated faces with 99.8% accuracy using deep learning.",
//       icon: <Shield />,
//       path: "/deepfake",
//     },
//     {
//       id: "mobile-price",
//       title: "Mobile Price Predictor",
//       desc: "ML-powered tool to estimate smartphone market prices in Nepal.",
//       icon: <Smartphone />,
//       path: "/mobile-price",
//     },
//     {
//       id: "posenet",
//       title: "PoseNet Tracking",
//       desc: "Real-time human pose estimation using ml5.js and computer vision.",
//       icon: <Camera />,
//       path: "/projects/posenet", // Matches the route we set up
//     },
//   ];

//   return (
//     <div className="fade-in">
//       <h1 className="page-title">My Projects</h1>
//       <div className="project-grid">
//         {projectList.map((proj) => (
//           <Link to={proj.path} key={proj.id} className="project-card">
//             <div className="icon-wrapper">{proj.icon}</div>
//             <h3>{proj.title}</h3>
//             <p>{proj.desc}</p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Projects;

import { Link } from "react-router-dom";
import { Shield, Smartphone, Camera, Brain } from "lucide-react";
import "./Projects.css";

const Projects = () => {
  const projectList = [
    {
      id: "deepfake",
      title: "Deepfake Detector",
      desc: "Detect AI-generated faces with 99.8% accuracy using deep learning.",
      icon: <Shield />,
      path: "/deepfake",
      external: false,
    },
    {
      id: "mobile-price",
      title: "Mobile Price Predictor",
      desc: "ML-powered tool to estimate smartphone market prices in Nepal.",
      icon: <Smartphone />,
      path: "/mobile-price",
      external: false,
    },
    {
      id: "posenet",
      title: "PoseNet Tracking",
      desc: "Real-time human pose estimation using ml5.js and computer vision.",
      icon: <Camera />,
      path: "/projects/posenet",
      external: false,
    },
    {
      id: "xainhcr",
      title: "XAInHCR Analysis",
      desc: "An advanced X-Ray and medical imaging analysis tool (Collaborative).",
      icon: <Brain />,
      path: "https://xainhcr.pujanpaudel.com.np/",
      external: true, // Marker for external link
    },
  ];

  return (
    <div className="fade-in">
      <h1 className="page-title">My Projects</h1>
      <div className="project-grid">
        {projectList.map((proj) =>
          proj.external ? (
            /* External Link Handling */
            <a
              href={proj.path}
              key={proj.id}
              className="project-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="icon-wrapper">{proj.icon}</div>
              <h3>{proj.title}</h3>
              <p>{proj.desc}</p>
            </a>
          ) : (
            /* Internal Link Handling */
            <Link to={proj.path} key={proj.id} className="project-card">
              <div className="icon-wrapper">{proj.icon}</div>
              <h3>{proj.title}</h3>
              <p>{proj.desc}</p>
            </Link>
          ),
        )}
      </div>
    </div>
  );
};

export default Projects;
