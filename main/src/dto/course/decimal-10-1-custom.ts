import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

@ValidatorConstraint({name:'DecimalPrecision', async:false})
export class DecimalPrecision implements ValidatorConstraintInterface
{
    validate(value:number, args:ValidationArguments)
    {
        const [precision, scale]=args.constraints;
        const valueString=value.toString();

        const [intergerPart, decimalPart]=valueString.split('.');

        return((intergerPart.length<=precision-scale)&&(!decimalPart||decimalPart.length<=scale));
    }
    defaultMessage(args:ValidationArguments)
    {
        return 'Value must be a number with precision ${args.constraints[0]} and scale ${args.constraints[1]}'
    }
    
}