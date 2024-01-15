import { QueryClient } from "@tanstack/react-query"
import { Breed } from "../../types";
import type { Params } from '@remix-run/router/utils';
import { apiClient } from "../axiosInstance";


export const breedsQuery = (animal: string) => ({
  queryKey: ['breeds', animal],
  queryFn: async () :Promise<Array<Breed>>=> {
    const en = animal === 'dog' ? '강아지' : '고양이'
    const { data: { data } } = await apiClient.get(`/animal/list?class=${en}`).catch(
    (error) => {
      console.log('breedsQuery',error)
      //! 서버 에러시 더미 데이터 반환 !! 나중에 삭제
      return {data : dummy} 
    } 
    )
    return data
  },
  staleTime: 1000 * 60 * 60 * 24 * 7 // 7 days
})


export const breedsLoader = (queryClient:QueryClient) => async ({params}:{params:Params}) => {
  const query = breedsQuery(params.animal ?? 'dog')
  //return data or fech it
  const data = queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
  return data
}


const dummy = {
  "ok": true,
  "data": [
    {
      "_id": "65794699ed59584aa4b2c95d",
      "name": "골든 리트리버",
      "class": "강아지",
      "code": "D001",
      "img": "https://petimage.kr/files/uploads/admin/골든 리트리버.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c95e",
      "name": "그레이 하운드",
      "class": "강아지",
      "code": "D002",
      "img": "https://petimage.kr/files/uploads/admin/그레이 하운드.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c95f",
      "name": "닥스훈트",
      "class": "강아지",
      "code": "D003",
      "img": "https://petimage.kr/files/uploads/admin/닥스훈트.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c960",
      "name": "달마시안",
      "class": "강아지",
      "code": "D004",
      "img": "https://petimage.kr/files/uploads/admin/달마시안.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c961",
      "name": "도베르만",
      "class": "강아지",
      "code": "D005",
      "img": "https://petimage.kr/files/uploads/admin/도베르만.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c962",
      "name": "몰티즈",
      "class": "강아지",
      "code": "D006",
      "img": "https://petimage.kr/files/uploads/admin/몰티즈.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c963",
      "name": "베들링턴",
      "class": "강아지",
      "code": "D007",
      "img": "https://petimage.kr/files/uploads/admin/베들링턴.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c964",
      "name": "보더콜리",
      "class": "강아지",
      "code": "D008",
      "img": "https://petimage.kr/files/uploads/admin/보더콜리.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c965",
      "name": "보스턴 테리어",
      "class": "강아지",
      "code": "D009",
      "img": "https://petimage.kr/files/uploads/admin/보스턴 테리어.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c966",
      "name": "불도그",
      "class": "강아지",
      "code": "D010",
      "img": "https://petimage.kr/files/uploads/admin/불도그.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c967",
      "name": "비글",
      "class": "강아지",
      "code": "D011",
      "img": "https://petimage.kr/files/uploads/admin/비글.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c968",
      "name": "비숑 프리제",
      "class": "강아지",
      "code": "D012",
      "img": "https://petimage.kr/files/uploads/admin/비숑 프리제.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c969",
      "name": "사모예드",
      "class": "강아지",
      "code": "D013",
      "img": "https://petimage.kr/files/uploads/admin/사모예드.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c96a",
      "name": "스피치",
      "class": "강아지",
      "code": "D014",
      "img": "https://petimage.kr/files/uploads/admin/스피치.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c96b",
      "name": "시바이누",
      "class": "강아지",
      "code": "D015",
      "img": "https://petimage.kr/files/uploads/admin/시바이누.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c96c",
      "name": "시베리안 허스키",
      "class": "강아지",
      "code": "D016",
      "img": "https://petimage.kr/files/uploads/admin/시베리안 허스키.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c96d",
      "name": "시추",
      "class": "강아지",
      "code": "D017",
      "img": "https://petimage.kr/files/uploads/admin/시추.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c96e",
      "name": "와이마라너",
      "class": "강아지",
      "code": "D018",
      "img": "https://petimage.kr/files/uploads/admin/와이마라너.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c96f",
      "name": "요크셔테리어",
      "class": "강아지",
      "code": "D019",
      "img": "https://petimage.kr/files/uploads/admin/요크셔테리어.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c970",
      "name": "웰시코기",
      "class": "강아지",
      "code": "D020",
      "img": "https://petimage.kr/files/uploads/admin/웰시코기.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c971",
      "name": "잉글리쉬 쉽독",
      "class": "강아지",
      "code": "D021",
      "img": "https://petimage.kr/files/uploads/admin/잉글리쉬 쉽독.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c972",
      "name": "잭 러셀 테리어",
      "class": "강아지",
      "code": "D022",
      "img": "https://petimage.kr/files/uploads/admin/잭 러셀 테리어.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c973",
      "name": "저먼 셰퍼드",
      "class": "강아지",
      "code": "D023",
      "img": "https://petimage.kr/files/uploads/admin/저먼 셰퍼드.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c974",
      "name": "진돗개",
      "class": "강아지",
      "code": "D024",
      "img": "https://petimage.kr/files/uploads/admin/진돗개.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c975",
      "name": "차우차우",
      "class": "강아지",
      "code": "D025",
      "img": "https://petimage.kr/files/uploads/admin/차우차우.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c976",
      "name": "치와와",
      "class": "강아지",
      "code": "D026",
      "img": "https://petimage.kr/files/uploads/admin/치와와.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c977",
      "name": "코카스패니얼",
      "class": "강아지",
      "code": "D027",
      "img": "https://petimage.kr/files/uploads/admin/코카스패니얼.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c978",
      "name": "파피용",
      "class": "강아지",
      "code": "D028",
      "img": "https://petimage.kr/files/uploads/admin/파피용.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c979",
      "name": "퍼그",
      "class": "강아지",
      "code": "D029",
      "img": "https://petimage.kr/files/uploads/admin/퍼그.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c97a",
      "name": "페키니즈",
      "class": "강아지",
      "code": "D030",
      "img": "https://petimage.kr/files/uploads/admin/페키니즈.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c97b",
      "name": "포메라니안",
      "class": "강아지",
      "code": "D031",
      "img": "https://petimage.kr/files/uploads/admin/포메라니안.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c97c",
      "name": "포인터",
      "class": "강아지",
      "code": "D032",
      "img": "https://petimage.kr/files/uploads/admin/포인터.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c97d",
      "name": "푸들",
      "class": "강아지",
      "code": "D033",
      "img": "https://petimage.kr/files/uploads/admin/푸들.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c97e",
      "name": "화이트 테리어",
      "class": "강아지",
      "code": "D034",
      "img": "https://petimage.kr/files/uploads/admin/화이트 테리어.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    },
    {
      "_id": "65794699ed59584aa4b2c97f",
      "name": "프렌치 불도그",
      "class": "강아지",
      "code": "D035",
      "img": "https://petimage.kr/files/uploads/admin/프렌치 불도그.jpg",
      "createdAt": "2023-12-13T07:41:27.706Z",
      "updatedAt": "2023-12-13T07:41:27.706Z"
    }
  ]
}