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
}

export interface CreateUserProps {
  courses?: Course[];
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

  private constructor(props: CreateUserProps, id?: string) {
    const courses = new UserCourses(props.courses);
    super(
      {
        ...props,
        courses: courses,
      },
      id,
    );
  }

  addCourse(course: Course): Either<DomainValidationError, void> {
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

  static create(props: CreateUserProps) {
    return new User(props);
  }

  static existing(props: CreateUserProps, id: string) {
    return new User(props, id);
  }
}
