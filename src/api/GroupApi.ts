import { ContentType, HttpClient, RequestParams } from './http-client';
import { SchoolTime } from '@/stores/typings/types.addNewClass';

interface AddNewGroupProps {
  groupName: string;
  gradeLevel: string;
  schoolType: string;
  classTimeRequestDtos: Array<SchoolTime>;
  tuition: number;
  groupMemo: string;
}

export class GroupApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags groups-list-api
   * @name
   * @summary 반 조회
   * @request GET:/v1/groups/
   * @secure
   */

  getGroupList = (PaidStatus: boolean, sortType: string) => {
    return this.request({
      path: `/v1/student/groups`,
      method: 'GET',
      type: ContentType.Json,
      body: {
        unPaidStatus: PaidStatus,
        sort: sortType,
      },
    });
  };

  /**
   * No description
   *
   * @tags groups-detail-api
   * @name
   * @summary 반 상세 조회
   * @request GET:/v1/groups/{groupId}
   * @secure
   */

  getGroupListDetail = (id: number) => {
    return this.request({
      path: `/v1/student/groups/${id}`,
      method: 'GET',
      type: ContentType.Json,
    });
  };

  /**
   * No description
   *
   * @tags groups-new-api
   * @name
   * @summary 새로운 반 추가
   * @request POST:/v1/groups/
   * @secure
   */

  postNewGroup = (props: AddNewGroupProps) => {
    return this.request({
      path: `/v1/student/groups`,
      method: 'POST',
      type: ContentType.Json,
      body: {
        groupName: props.groupName,
        schoolType: props.schoolType,
        gradeLevel: props.gradeLevel,
        classTimeRequestDtos: props.classTimeRequestDtos,
        tuition: props.tuition,
        groupMemo: props.groupMemo,
      },
    });
  };

  /**
   * No description
   *
   * @tags groups-put-api
   * @name
   * @summary 반 정보 수정
   * @request PUT:/v1/groups/{groupId}
   * @secure
   */

  putGroup = (id: number, props: AddNewGroupProps) => {
    return this.request({
      path: `/v1/student/groups/${id}`,
      method: 'PUT',
      type: ContentType.Json,
      body: {
        groupId: id,
        groupName: props.groupName,
        schoolLevel: props.gradeLevel,
        schoolTime: props.classTimeRequestDtos,
        tuition: props.tuition,
        memo: props.groupMemo,
      },
    });
  };

  /**
   * No description
   *
   * @tags groups-delete-api
   * @name
   * @summary 반 정보 삭제
   * @request DELETE:/v1/groups/{groupId}
   * @secure
   */

  deleteGroup = (id: number) => {
    return this.request({
      path: `/v1/student/groups/${id}`,
      method: 'DELETE',
      type: ContentType.Json,
    });
  };
}
