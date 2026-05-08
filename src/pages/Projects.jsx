import { Link } from "react-router-dom";
import { Shield, Smartphone, Camera } from "lucide-react"; // Added Camera icon
import "./Projects.css";

const Projects = () => {
  const projectList = [
    {
      id: "deepfake",
      title: "Deepfake Detector",
      desc: "Detect AI-generated faces with 99.8% accuracy using deep learning.",
      icon: <Shield />,
      path: "/deepfake",
    },
    {
      id: "mobile-price",
      title: "Mobile Price Predictor",
      desc: "ML-powered tool to estimate smartphone market prices in Nepal.",
      icon: <Smartphone />,
      path: "/mobile-price",
    },
    {
      id: "posenet",
      title: "PoseNet Tracking",
      desc: "Real-time human pose estimation using ml5.js and computer vision.",
      icon: <Camera />,
      path: "/projects/posenet", // Matches the route we set up
    },
  ];

  return (
    <div className="fade-in">
      <h1 className="page-title">My Projects</h1>
      <div className="project-grid">
        {projectList.map((proj) => (
          <Link to={proj.path} key={proj.id} className="project-card">
            <div className="icon-wrapper">{proj.icon}</div>
            <h3>{proj.title}</h3>
            <p>{proj.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
