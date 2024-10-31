export const CourseDetailSelectRes = {
  id: true,

  name: true,

  description: true,

  thumbnail: true,

  price: true,

  duration: true,

  difficultyLevel: true,

  startDate: true,

  endDate: true,

  category: {
    id: true,
    name: true
  },

  lecturer: {
    id: true,
    name: true
  },

  discount: {
    id: true,
    code: true,
    discountAmount: true,
    discountPercentage: true,
    startDate: true,
    endDate: true
  },

  lessons: true,
  createAt: true,
  updateAt: true,
  createBy: true,
  updateBy: true
};
