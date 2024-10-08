import { ContentType, HttpClient, RequestParams } from './http-client';
interface addStudentType {
  studentName: string;
  studentPhoneNumber: string;
  parentName: string;
  parentPhoneNumber: string;
  groupIds: number[];
  schoolType: string;
  gradeLevel: string;
  departmentType: string;
  schoolName: string;
  memo: string;
}

export interface classData {
  groupId: number;
  groupName: string;
  classTimeResponseDtos: classTimeType[];
}
interface classTimeType {
  classTimeId: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}
export interface classInfoDataType {
  id: number;
  className: string;
  classTime: classTimeType[];
}
interface classDataApiResponse {
  data: {
    content: classData[]; // PaymentData 타입의 배열
  };
}
export interface StudentInfoType {
  content: studentInfoContentType[];
  pageable: {};
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
export interface studentInfoContentType {
  studentId: number;
  studentName: string;
  parentName: string;
  classNames: string[];
}

export class StudentApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  //테스트용 원생 등록 api
  addStudent = (data: addStudentType) => {
    return this.request({
      path: `v1/student`,
      method: 'POST',
      body: data,
    });
  };

  //테스트용 반 등록 api
  addClass = () => {
    return this.request({
      path: `v1/student/test`,
      method: 'POST',
      body: {
        studentName: '유저1',
        studentPhoneNumber: '01011111111',
        parentName: '부모1',
        parentPhoneNumber: '01011112222',
      },
    });
  };

  //반 목록 조회 api
  getGroupInfo = (page: number, size: number) => {
    return this.request({
      path: `/v1/student/allGroups?page=${page}&size=${size}`,
      method: 'GET',
      type: ContentType.Json,
    });
  };

  getAllStudentInfo = (
    page: number,
    size: number,
    isUnpaid: boolean,
    sort: string
  ) => {
    //isUnpaid=true&sort=studentName&page=0&size=10
    return this.request({
      path: `/v1/student/allStudents?isUnpaid=${isUnpaid}&sort=${sort}&page=${page}&size=${size}`,
      method: 'GET',
      type: ContentType.Json,
    });
  };

  getFilteredStudents = (
    page: number,
    size: number,
    isUnpaid: boolean,
    groupId: number,
    nameOrPhoneNum: string,
    sort: string
  ) => {
    //isUnpaid=true&groupId=1&nameOrPhoneNum=-&page=0&size=10&sort=studentName
    return this.request({
      path: `/v1/student/filter/students?isUnpaid=${isUnpaid}${groupId !== 0 ? `&groupId=${groupId}` : ''}${
        nameOrPhoneNum !== '' ? `&nameOrPhoneNum=${nameOrPhoneNum}` : ''
      }&page=${page}&size=${size}&sort=${sort}`,
      method: 'GET',
      type: ContentType.Json,
    });
  };
}
