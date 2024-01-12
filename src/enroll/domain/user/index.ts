import {
  AggregateRoot,
  DomainValidationError,
  Either,
  left,
  right,
  WatchedList,
} from "domain-utilities";

import { Course } from "../course";

export interface UserProps {
  courses?: WatchedList<Course>;
  registration_step: UserRegistrationStep
}

export interface CreateUserProps {
  courses?: Course[];
  registration_step?: UserRegistrationStep
}

export enum UserRegistrationStep {
  BasicInformation,
  Done
}


export class UserCourses extends WatchedList<Course> {
  compareItems(a: Course, b: Course): boolean {
    return a.equals(b);
  }
  constructor(initialItems?: Course[]) {
    super(initialItems);
  }
}

export class User extends AggregateRoot<UserProps> {
  private _courses: WatchedList<Course>;
  private _registration_step: UserRegistrationStep;

  private constructor(props: CreateUserProps, id?: string) {
    const courses = new UserCourses(props.courses);
    super(
      {
        registration_step: props.registration_step ?? UserRegistrationStep.BasicInformation,
        courses: courses,
      },
      id,
    );
  }

  addCourse(course: Course): Either<DomainValidationError, void> {

    if (this._registration_step !== UserRegistrationStep.Done) {
      return left(
        new DomainValidationError("User has not finished the onboarding process!"),
      );
    }

    if (this._courses?.getItems().length >= 3) {
      return left(
        new DomainValidationError("User already has 3 or more courses!"),
      );
    }

    this._courses.add(course);

    return right(undefined);
  }

  getCourses() {
    return this._courses;
  }

  getRegistrationStep() {
    return this._registration_step
  }

  static create(props: Omit<CreateUserProps, "registration_step">) {
    return new User(props);
  }

  static existing(props: CreateUserProps, id: string) {
    return new User(props, id);
  }
}
