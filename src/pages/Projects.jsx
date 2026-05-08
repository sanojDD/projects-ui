// export default Projects;
import { Link } from "react-router-dom";
import { Shield, Smartphone } from "lucide-react";
import "./Projects.css";

const Projects = () => {
  const projectList = [
    {
      id: "deepfake",
      title: "Deepfake Detector",
      desc: "Detect AI-generated faces with 99.8% accuracy.",
      icon: <Shield />,
      path: "/deepfake",
    },
    {
      id: "mobile-price",
      title: "Mobile Price Predictor",
      desc: "Predict smartphone prices based on specifications and features.",
      icon: <Smartphone />,
      path: "/mobile-price",
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
