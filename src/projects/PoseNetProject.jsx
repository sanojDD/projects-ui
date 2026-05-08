import "./PoseNetProject.css";

const PoseNetProject = () => {
  const projectUrl = "https://sanojdd.github.io/poseNet-ml5.js/";

  return (
    <div className="posenet-container">
      <div className="glass-card posenet-card">
        <div className="card-header">
          <div className="header-icon pulse-blue">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M18 20V10M12 20V4M6 20v-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="4" r="1" fill="currentColor" />
              <circle cx="6" cy="14" r="1" fill="currentColor" />
              <circle cx="18" cy="10" r="1" fill="currentColor" />
            </svg>
          </div>
          <h2>PoseNet Real-time Tracking</h2>
          <p>Computer Vision with ml5.js and p5.js</p>
        </div>

        <div className="project-content">
          <div className="tech-stack">
            <span className="badge">ml5.js</span>
            <span className="badge">TensorFlow.js</span>
            <span className="badge">p5.js</span>
            <span className="badge">Real-time</span>
          </div>

          <p className="project-description">
            A high-performance human pose estimation system that tracks 17 key
            body points (eyes, ears, shoulders, joints) in real-time using a
            webcam feed. Built on top of the PoseNet pre-trained model.
          </p>

          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="launch-btn"
          >
            Launch Project
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </div>

        <div className="info-note">
          📷 Camera access is required for real-time tracking
        </div>
      </div>
    </div>
  );
};

export default PoseNetProject;
