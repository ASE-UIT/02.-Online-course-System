import { DifficultyLevel } from "@/enums/difficulty-level.enum";
import {IsNotEmpty, IsOptional, IsUUID, IsString, IsNumber, IsEnum,IsDate, Validate } from 'class-validator';
import { DecimalPrecision } from "./decimal-10-1-custom";

export class CourseRes
{

    @IsNotEmpty()
    @IsString()
    id!:string

    @IsNotEmpty()
    @IsString()
    name!:string;

    @IsOptional()
    @IsString()
    description?:string;

    @IsOptional()
    @IsString()
    thumbnail?:string;

    @IsNotEmpty()
    @IsNumber()
    price!:number;

    @IsNotEmpty()
    @IsNumber()
    @Validate(DecimalPrecision, [10,1])
    duration!:number;

    @IsEnum(DifficultyLevel)
    @IsOptional()
    difficultyLevel?:DifficultyLevel=DifficultyLevel.easy;

    @IsOptional()
    @IsDate()
    startDate?:Date;

    @IsOptional()
    @IsDate()
    endDate?:Date;

    @IsNotEmpty()
    @IsUUID()
    categoryId!:string;

    @IsNotEmpty()
    @IsUUID()
    lecturerId!:string;

    @IsNotEmpty()
    @IsUUID()
    discountId?:string;

}