import React from 'react'
import LecturerNav from '../LecturerNav'
import { AddCourseContent } from './CourseAddContent'

const CourseAdd = () => {
  return (
    <div className='flex flex-col gap-[20px]'>
      <LecturerNav />
      <AddCourseContent/>
    </div>
    
  )
}

export default CourseAdd