export function calculateVideoDuration(file) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";

    // Create a URL for the file
    const objectUrl = URL.createObjectURL(file);

    video.src = objectUrl;

    // Listen for the loadedmetadata event to access video duration
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(objectUrl); // Clean up the object URL
      resolve(Math.round(video.duration / 60)); // Duration in seconds
    };

    video.onerror = (error) => {
      URL.revokeObjectURL(objectUrl); // Clean up in case of error
      reject(error);
    };
  });
}
