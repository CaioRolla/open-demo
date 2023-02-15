import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
// import * as moment from 'moment'
import * as momentTZ from 'moment-timezone';

export function IsTimezone(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isTimezone',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return !!value && typeof value === 'string' && value.length > 0 && momentTZ.tz.names().includes(value);
        },
      },
    });
  };
}
