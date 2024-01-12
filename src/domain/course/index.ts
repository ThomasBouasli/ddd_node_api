import { Entity } from "domain-utilities";

export interface CourseProps {}

export class Course extends Entity<CourseProps> {
  private constructor(props: CourseProps, id?: string) {
    super(props, id);
  }

  static create(props: CourseProps) {
    return new Course(props);
  }

  static existing(props: CourseProps, id: string) {
    return new Course(props, id);
  }
}
