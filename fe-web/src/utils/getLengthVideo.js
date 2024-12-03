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
export function isValidNumber(input) {
  // Check if the input is a valid string
  if (typeof input !== "string") {
    return false;
  }

  // Trim the input and check if it is a valid number
  const trimmedInput = input.trim();
  const number = Number(trimmedInput);

  // If the conversion to number fails or the input is not finite, return -1
  if (isNaN(number) || !isFinite(number)) {
    return false;
  }
  return true;
}
export function getNextLesson(course, moduleIdx, lessonIdx) {
  // Validate input
  if (!course?.lessonParts || course.lessonParts.length === 0) {
    return null;
  }

  // Ensure moduleIdx and lessonIdx are within valid ranges
  if (moduleIdx < 0 || moduleIdx >= course.lessonParts.length) {
    return null;
  }

  const currentModule = course.lessonParts[moduleIdx];

  // If lessons in current module
  if (currentModule.lessons && currentModule.lessons.length > 0) {
    // If we can move to next lesson in current module
    if (lessonIdx < currentModule.lessons.length - 1) {
      return {
        moduleIdx: moduleIdx,
        lessonIdx: lessonIdx + 1,
      };
    }
  }

  // Try to move to next module
  if (moduleIdx < course.lessonParts.length - 1) {
    const nextModule = course.lessonParts[moduleIdx + 1];

    // If next module has lessons
    if (nextModule.lessons && nextModule.lessons.length > 0) {
      return {
        moduleIdx: moduleIdx + 1,
        lessonIdx: 0,
      };
    }
  }

  // No more lessons
  return null;
}
