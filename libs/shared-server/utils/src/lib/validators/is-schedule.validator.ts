import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { isValidCron } from 'cron-validator';

export function IsSchedule(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isSchedule',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return !!value && typeof value === 'string' && value.length > 0 && isValidCron(value);
        },
      },
    });
  };
}
