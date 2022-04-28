<br />

### ✨ [good_life] 프론트엔드 엔지니어 과제 - 신항민

---

<br />

### 💫  프로젝트 소개

- good_life 웹에 접속하여 관광지를 검색한 후 관광지를 모아 놓은 페이지 구현

<br />

### ⚙️  프로젝트 기획

1. 코드 재사용성 및 컴포넌트화를 고려
2. 렌더링 최적화를 고려
3. UI/UX를 고려

<br />

### 🛠 기능 시연 

<br />

### 👀  요구사항

1. 고객이 사용할 수 있을 수준의 정갈한 화면
2. 제공되는 list.json을 json-server(https://github.com/typicode/json-server) 라이브러리를
   이용하여 간단한 목업 rest api 서버를 실행한다.

   - `npm install -g json-server`

   - `json-server --watch --no-cors list.json`

3. 만들어진 REST API를 통해 `관광지명`을 기준으로 해당 내용이 검색이 되어야한다.

4. 관광지 검색 후 해당 리스트에는 `관광지명`, `소재지도로명주소`, `관광지소개`,
   `주차가능수`, `관리기관전화번호`, `지정일자`, `공공편익시설정보` 정보가 보여져야 한다

5. 관광지 리스트에서 관광지 하나씩 *저장*할 수 있으며 저장한 관광지는 *저장 목록*에 볼
   수 있어야한다.

6. 항목 저장시 브라우저 스토리지를 이용하여야 한다.

7. 저장한 관광지와 저장하지 않은 관광지는 검색 리스트에서 `구분이 가능해야한다.`

8. 저장 목록에 있는 관광지는 `취소`가 가능해야 한다.

9. 저장 목록에 기록한 정보들은 브라우저를 새로 켰을때 유지 되어야 함.

10. 쉼표(,)를 기준으로 복수개의 키워드 검색이 가능해야 함(ex. 임진각,공릉)

<br />

### 🔨  실행방법 - 1

```jsx
cd good_life

//  json-server 사용하기를 사용하기 위해 2개의 터미널 필요

npm i -g json-server

// fake-server 디렉토리에서 다음 명령어 실행
1. cd fake-server

2. json-server --watch db.json --port 3001

// good_life 디렉토리에서 다음 명령어 실행
1. yarn install

2. yarn start
```

<br />

### 🔧  실행방법 - 2

1. 관광지를 검색할 수 있는 검색창에 관광지를 입력해 주세요.

2. **전체 관광지를 검색**하려면 **검색창을 클릭 후 enter를 입력하시거나 검색을 눌러**주세요.

3. 검색창에 쉼표(,)를 기준으로 복수개의 키워드 검색이 가능합니다.

4. 저장한 관광지와 저장하지 된 관광지는 검색 리스트에서 이미 저장됨으로 표시됩니다.

5. 관광지 정보를 더 보시려면 관광지 정보 더 보기를 클릭해 주세요.

6. 관광지를 저장하시려면 정보 더 보기 모달 창의 저장 버튼을 클릭해 주세요.

7. 관광지 저장을 취소하시려면 왼쪽 관광지 저장 리스트 삭제 버튼을 눌러주세요.

8. 왼쪽 관광지 저장 리스트의 정보를 더 보시려면 리스트 클릭해 주세요.

9. 왼쪽 관광지 저장 리스트가 많을 시 왼쪽 관광지 리스트에서 스크롤 하시면 더 보입니다.

<br />

### 👨🏻‍💻 기능 구현 목록

### 1. 코드 재사용성 - hooks

<br>

> 코드를 작성하면서 생각한 것은
>
> 1.  하나의 함수는 하나의 기능 구현
> 2.  재사용성
> 3.  hook을 만들어 아이템을 가져오고 state에 저장하는 중복작업을 최소화
>
> 이 점을 가장 많이 생각했다.

- 총 2가지의 hook을 만들었습니다.

1. /src/hooks/useLocalStorage.js

- localStorage에 추가하는 부분과 삭제하는 부분은 버튼의 내용만 다르다. 따라서 재사용 가능하게 구현

2. /src/hooks/useGetQs.js

- Issue 페이지 이동시 쿼리스트링 key 와 value 를 파싱하는 작업을 한다. 따라서 재사용 가능하게 구현

<br />

### 2. 렌더링 최적화

<br />

> 렌더링 최적화 위해 생각한 것은
>
> 1.  **React.memo**를 이용한 컴포넌트 메모이제이션 방법
>
>     - React.memo는 컴포넌트를 래핑하여 props를 비교하여 메모이제이션 기법을 제공하는 함수로서 리렌더링을 방지 하였습니다.
>
> 2.  **React.useCallback**
>
>     - useCallback으로 함수를 선언해주면 종속 변수들이 변하지 않으면 굳이 함수를 재생성하지 않고 이전에 있던 참조 변수를 그대로 하위 컴포넌트에 props로 전달하여 하위 컴포넌트도 props가 변경되지 않았다고 인지하게 됩니다. 이에 따라 하위 컴포넌트의 리렌더링을 방지 하였습니다.
>
> 3.  하위 컴포넌트의 props로 객체를 넘겨주는 경우 새 객체 생성을 주의
>
>     - props로 전달한 객체가 동일한 값을 보유하고 있다고 하더라도 새로 생성된 객체는 이전 객체와 다른 참조 주소를 가진 객체이기 때문에 메모이제이션이 통하지 않습니다. 따라서 생성자 함수나 객체 리터럴로 객체를 생성해서 하위 컴포넌트로 넘겨주는 방식보다는, state를 그대로 하위컴포넌트에 넘겨주어 필요한 데이터 가공을 그 하위컴포넌트에서 해주는 것이 좋습니다.

<br/>

1. React.memo를 이용한 컴포넌트

- Spinner.jsx/ToastModal.jsx/Pagination.jsx에 컴포넌트의 props 가 바뀌지 않았다면, 리렌더링을 방지하여 컴포넌트의 리렌더링 성능 최적화

2. React.useCallback

- 컴포넌트에서 props 가 바뀌지 않았으면 Virtual DOM 에 새로 렌더링하는 것 조차 하지 않고 컴포넌트의 결과물을 재사용 하는 최적화 작업을 위해 컴포넌트 이벤트 핸들러(event handler)에 useCallback으로 묶어 함수를 새로 만들지 않고 재사용

3. redux를 통한 전역상태 관리

- 하위 컴포넌트의 props로 객체를 넘겨주는 것을 최소한으로 사용하고, redux를 사용하여 데이터가 필요한 컴포넌트에 리덕스 스토어를 구독(useSelector)하도록 함

- 불변객체 관리를 위해 immer(package)와 액션 생성 함수를 더 짧은 코드로 작성 및 리듀서를 작성할 때 switch문이 아닌 handleActions라는 함수를 사용 가독성을 높이기 위해 redux-actions(package)사용

<br />

### 3. UI/UX를 고려

<br/>

> 1. 전체적인 컴포넌트 생성 시 width값을 % 로 설정해 가로 사이즈가 줄어들때 자동으로 크기를 가져가도록 설정, 미디어 쿼리를 사용해 특정 컴포넌트 크기 및 색상 노출 여부를 컨트롤 하였고, 모바일 사이즈가 되었을 때 모바일 전용 제공 하였습니다.

<br />

> 2. React axios를 활용하여 api를 호출하면 발생하는 딜레이 시간 동안 로딩 화면을 보여줄 Spinner 기능 제공 하였습니다.

- /src/components/Spinner.jsx

<br />

> 3. 사용자 경험을 고려하여 기존 알럿창으로 뜨는 경고창을 모달창으로 변경하여 구현을 하였습니다.

- /src/components/ToastModal.jsx

<br />

### 4. React props 디버깅

> 1. React는 내장된 타입 검사 기능인 propTypes를 사용하여 컴포넌트의 props에 타입 검사를 한 후 버그를(bug) 쉽게 확인 하였습니다.. propTypes는 성능상의 이유로 개발 모드(Development mode) 에서만 확인 가능 합니다.

<br />

<br />

🏆 &nbsp; refactoring

1. 쉼표(,)를 기준으로 복수개의 키워드 검색이 가능 코드

<br/>

> 코드의 가독성을 위해 최대한 간결하게 적으려고 했으나 for 문은 두 번 돌리고 if 문을 쓴 후 Set을 통해 중복을 제거할 수밖에 없었다.
>
> 그래서 코드를 리팩토링하기로 했다.
>
> 1. 일단 Set을 통해 중복제거를 하기보다 중복된 코드는 newData에 들어가지 않는 코드를 작성하려고 했다.

- 변경전

```javascript
if (newTarget.includes(",")) {
          const targetArr = newTarget.split(",");

          let newData = [];

          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < targetArr.length; j++) {
              if (data[i].관광지명.includes(targetArr[j])) {
                newData.push(data[i]);
              }
            }
          }
          // 중복제거
          newData = [...new Set(newData)];

          ...
}
```

<br />

> 2. if (!newData.includes(data[i])) newData.push(data[i]); 추가하여 해결했다.
>
> 그러나 아직도 코드가 너무 길다. 좀더 간결하게 하고싶었다.

- 1차 변경

```javascript
 if (newTarget.includes(",")) {
          const targetArr = newTarget.split(",");

          let newData = [];

          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < targetArr.length; j++) {
              if (data[i].관광지명.includes(targetArr[j])) {
                if (!newData.includes(data[i])) newData.push(data[i]);
              }
            }
          }

          ...
}
```

<br />

> 3. `for 문`은 실행속도가 가장 빠른 `for (array.value of array) {}` 배열 순환 문법으로 고치기로 했다. 그리고 if 문 대신 && 연산자를 사용하여 단축 평가를 하기로 했다.
>
> 이전보다 확실히 나아진 거 같다. 그래도 map()과 filter() 함수를 사용하여 바꾸고 싶었으나 계속된 실패로 좀 더 알고리즘을 공부해야겠다.

- 최종 변경

```javascript
 if (newTarget.includes(",")) {
          const targetArr = newTarget.split(",");

          let newData = [];

         for (let dataOne of data) {
            for (let targetOne of targetArr) {
              dataOne.관광지명.includes(targetOne) &&
                !newData.includes(dataOne) &&
                newData.push(dataOne);
            }
          }

          ...
}
```
