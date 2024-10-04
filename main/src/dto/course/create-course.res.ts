import { DifficultyLevel } from "@/enums/difficulty-level.enum";

export class CreateCourseResponse
{
    id!:string;
    name!:string;
    description!:string|null;
    thumbnail!:string|null;
    price!:number;
    duration!:number;
    difficultyLevel!:DifficultyLevel;
    startDate!:Date|null;
    endDate!:Date|null;
    categoryId!:string;
    lecturerId!:string;
    discountId!:string;

    constructor(course:any)
    {
        this.id=course.id;
        this.name=course.name;
        this.description=course.description;
        this.thumbnail=course.thumbnail;
        this.price=course.price;
        this.duration=course.duration;
        this.difficultyLevel = course.difficultyLevel;
        this.startDate = course.startDate;
        this.endDate = course.endDate;
        this.categoryId = course.category.id;
        this.lecturerId = course.lecturer.id;
        this.discountId = course.discount ? course.discount.id : null;
    }
}