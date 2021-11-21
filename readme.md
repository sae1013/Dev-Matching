

# 고양이 사진첩

### 요구사항/스토리보드

디렉토리 구조를 따라 탐색할 수 있는 사진첩 애플리케이션 입니다.

디렉토리를 클릭한 경우, 하위에 속한 디렉토리 or 파일을 불러와 렌더링하고, 상단에 현재의 접속한 디렉토리 계층을 보여줍니다.

파일을 클릭한 경우, 이미지 사진을 모달창으로 띄워줍니다.

디렉토리에서 이전 화살표를 클릭하여, 이전 디렉토리로 이동할 수 있습니다.



폴더정보, 사진에 대한 정보는 API로 제공되었습니다.

- 주어진 API 예시

```
[
    {
        "id": "5",
        "name": "2021/04",
        "type": "DIRECTORY",
        "filePath": null,
        "parent": {
            "id": "1"
        }
    },
    {
        "id": "19",
        "name": "물 마시는 사진",
        "type": "FILE",
        "filePath": "/images/a2i.jpg",
        "parent": {
            "id": "1"
        }
    }
]
```



### 구현동작검증

- App 컴포넌트 

![스크린샷 2021-11-21 오후 11.29.18](/Users/minwoo/Desktop/스크린샷 2021-11-21 오후 11.29.18.png)

root 폴더에서는 뒤로가기 버튼이 없습니다.



- 폴더 탐색

![스크린샷 2021-11-21 오후 11.34.12](/Users/minwoo/Desktop/스크린샷 2021-11-21 오후 11.34.12.png)

![스크린샷 2021-11-21 오후 11.29.34](/Users/minwoo/Desktop/스크린샷 2021-11-21 오후 11.29.34.png)



- 깊은 노드 탐색 

![스크린샷 2021-11-21 오후 11.30.35](/Users/minwoo/Desktop/스크린샷 2021-11-21 오후 11.30.35.png)



- 사진 모달창 띄우기

  ![스크린샷 2021-11-21 오후 11.29.43](/Users/minwoo/Desktop/스크린샷 2021-11-21 오후 11.29.43.png)



## 구현 세부사항(압축)

### 컴포넌트구현

- 각 화면의 UI요소는 가급적 컴포넌트 형태로 추상화 하여 구현

  - 각 컴포넌트가 서로 의존성을 지니지 않고, App  컴포넌트 이하 형태로 동작하도록 설계

- 이벤트 바인딩 최적화 (위임)

- ES6 모듈 형태로 작성

- 파일을 클릭하여 이미지를 보는 경우, 닫을 수 있는 처리(모달, 마우스 이벤트)

- 데이터 로딩중 , UI적 처리와 로딩중 다른 요청작업을 비활성화

  

### API 처리구현

-  API 호출 중 에러가 발생했을 때의 처리 
  - 오류가 발생한 경우를 체크

- async, await 문을 사용

- API를 처리하는 코드를 별도 파일로 분리