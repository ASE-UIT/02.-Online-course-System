const CircularProgress = ({ size = 150, strokeWidth = 10, percentage = 0 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {/* Background Circle */}
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e6e6e6" strokeWidth={strokeWidth} />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#39d213"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 0.35s",
            // transform: "rotate(0.25turn)",
            transformOrigin: "center",
          }}
        />
      </svg>
      {/* Percentage Text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "9px",
          fontWeight: "bold",
          color: "#39d213",
        }}
      >
        {percentage}
      </div>
    </div>
  );
};

export default CircularProgress;
