# 코드넛 자바스크립트 네이밍 컨벤션

#### February 11, 2020

## 참고

<https://github.com/airbnb/javascript>
Airbnb 참고 하였습니다.

> es-lint 와 prettier 만으론 잘 안되는 부분 위주로 기록하고 있습니다. - updated 2022-07-04
> 아직 작성중 문서 입니다.
> 앞으로도 지속적으로 추가 될 예정이며 건의하실 부분 있으시면 언제든 건의 해주세요.
> **_by 김유철 코드넛 기술이사_**

## 기본

- var 사용금지
  why? : 이걸 설명해야 안다면 코드넛 퇴사!

```js
// bad
var a = 1
var b = 2

// good
const a = 1
const b = 2
```

- 세미콜론(;) 사용금지
  why? : 쓸데없고 길어지니까

```js
// bad
const item = {}

// good
const item = {}
```

- Object 속성값을 약식으로 사용하기
  why? : 더 짧고 설명적 이기 때문에!

```javascript
const lukeSkywalker = 'Luke Skywalker'

// bad
const obj = {
  lukeSkywalker: lukeSkywalker,
}

// good
const obj = {
  lukeSkywalker,
}
```

- Quote 붙일때 꼭 안되는것만 붙이기
  why? : 좀 더 짧아지며 일반적으로 읽기가 쉽고 JS엔진에 최적화

```javascript
// bad
const bad = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
}

// good
const good = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
}
```

- Object method 의 약식 사용하기

```javascript
// bad
const atom = {
  value: 1,

  addValue: function (value) {
    return atom.value + value
  },
}

// good
const atom = {
  value: 1,

  addValue(value) {
    return atom.value + value
  },
}
```

- 배열 스프레드 [...] 사용
  why? : 뭐라 설명할수 없을만큼 당연함

```javascript
// bad
const len = items.length
const itemsCopy = []
let i

for (i = 0; i < len; i += 1) {
  itemsCopy[i] = items[i]
}

// good
const itemsCopy = [...items]
```

- this 를 변수로 넣는것 금지 화살표 함수 추천
  why? : 보기에 헷갈려짐. 본인도 실수 많이 했던 부분. 사실 몰랐다는건 안비밀 -0-

```javascript
// bad
function foo() {
  const self = this
  return function () {
    console.log(self)
  }
}

// good
function bar() {
  return () => {
    console.log(this)
  }
}
```

- 약자는 전부 대문자 혹은 소문자로
  why? : 가독성이 올라감

```javascript
// bad
import SmsContainer from './containers/SmsContainer'

// bad
const HttpRequests = [
  // ...
]

// good
import SMSContainer from './containers/SMSContainer'

// good
const HTTPRequests = [
  // ...
]

// also good
const httpRequests = [
  // ...
]

// best
import TextMessageContainer from './containers/TextMessageContainer'

// best
const requests = [
  // ...
]
```

- 줄이 80~100자를 넘는 문자열은 연결을 사용하여 여러줄에 작성하는것 금지 80자?!?!
  why? : 이런 문자열은 조금만 변형되도 작업하기 힘들고 검색이 어렵습니다.

```javascript
// bad
const errorMessage =
  'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.'

// bad
const errorMessage =
  'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.'

// good
const errorMessage =
  'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.'
```

- 문자열 구성시 템플릿 방식 활용
  why? : 템플릿 문자열은 적절한 줄 바꿈 및 문자열 보간 기능을 사용하여 읽기 쉽고 간결한 구문을 제공합니다. _(틀이라 1번 방식이 습관이 됐다는 고치기 힘드렁 ㅠㅠ)_

```javascript
// bad
function sayHi(name) {
  return 'How are you, ' + name + '?'
}

// bad
function sayHi(name) {
  return ['How are you, ', name, '?'].join()
}

// bad
function sayHi(name) {
  return `How are you, ${name}?`
}

// good
function sayHi(name) {
  return `How are you, ${name}?`
}
```

- 불필요한 삼항문을 제거
  why? : 짧아지고 명료해짐 ? 가 너무 많으면 가끔 헷갈릴수 있다.

```javascript
// bad
const foo = a ? a : b
const bar = c ? true : false
const baz = c ? false : true

// good
const foo = a || b
const bar = !!c
const baz = !c
```

# 네이밍 관련

- 파일이름은 소문자로 표기함!
  why? : unix ( linux ) 시스템의 대소문자 구분하는 전통상 어쩔수 없다

```
// bad
LonDon.png
HELLOWORLD.pdf
APP.js

// good
london.png
helloworld.pdf
app.js
```

- 패키지의 이름은 lowerCamelCase로 표기한다.

- 파일의 이름은 default export의 이름과 일치해야한다.

## 변수명

- 변수이름 lowerCamelCase로 표기.
  단, export되는 파일 내의 상수는 예외.
  변수의 이름은 알파벳으로 시작

```javascript
// bad
let 123Number = 123;
let HELLO_WORLD = "Hello World";

// good
let number = 369;
let helloString = "Hello World";

```

## 함수명

- 함수는 lowerCamelCase로 표기한다.

```javascript
// bad
function MyFunction() {...}

// good
function myFunction() {...}
```

- 함수의 이름은 동사 또는 동사구문으로 표기한다.

```javascript
// bad
function whereIsCamera() { ... }

// good
function findCamera() { ... }
function getFoo() { ... } // getter
function setBar() { ... } // setter
function hasCoo() { ... } // booleans
```

- 함수를 default export할 때는 camelCase로 표기한다.
  단, 함수의 이름이 파일의 이름과 구분되어야 한다.

```javascript
function makeStyleGuide() {
  // ...
}

export default makeStyleGuide
```

- 함수 라이브러리를 export할 때는 PascalCase로 표기한다.
  함수의 파라미터는 lowerCamelCase로 표기한다.
  단, 한글자의 파라미터는 public 메소드에서는 사용하지 않는다.

```javascript
// bad
function someFunction(SOMEVALUE, SOMEARRAY) { ... }

// good
function someFunction(someValue, someArray) { ... }
```

- 템플릿 함수의 파라미터는 모두 간결해야하고 한글자 또는 한단어여야 한다.
  또, 모두 대문자로 표기한다.

## 객체

- 객체의 이름은 lowerCamelCase로 표기한다.

```javascript
// bad
const OBJEcttsssss = {}
const this_is_my_object = {}
function c() {}

// good
const thisIsMyObject = {}
function thisIsMyFunction() {}
```

- 객체를 export할 때는 PascalCase로 표기한다.

```javascript
const AirbnbStyleGuide = {
  es6: {},
}

export default AirbnbStyleGuide
```

## 클래스

- 클래스나 생성자의 이름은 PascalCase로 표기한다.

```javascript
// bad
function user(options) {
  this.name = options.name
}

const bad = new user({
  name: 'nope',
})

// good
class User {
  constructor(options) {
    this.name = options.name
  }
}

const good = new User({
  name: 'yup',
})
```

- 클래스의 이름은 명사 또는 명사구문으로 표기한다.
  또한, 인터페이스의 경우 명사 대신 형용사 또는 형용사구문으로 표기할 수 있다.

클래스를 export할 때는 PascalCase로 표기한다.

---

# Case에 대한 설명

>

1. 카멜식 (Camel case)

- 낙타 모양에서 따온 방법으로 첫글자는 소문자로 시작, 두번쨰 단어부터는 대문자로 표현하는 방식으로 많이 사용합니다.

  카멜식 : userLoginLog

> 2. 파스칼식 (Pascal case)

- 카멜식이랑 비슷하지만 차이점은 첫단어를 대문자로 시작합니다.

  파스칼식 : UserLoginLog

> 3. 케밥식 (Kebab case)

- 먹는 케밥에 꼬챙이를 낀 모습이며, 모두 소문자로 표현하며, 단어와 단어 사이에는 하이픈(-)를 사용합니다.

- 스프링의 yml 파일이나 url 주소에서 주로 사용합니다.

  케밥식: user-login-log

> 4. 스네이크식(Snake case)

- 케밥식은 하이픈(-)를 사용했다면 스네이크식은 언더바(\_)를 사용합니다.

- 상수를 선언할떄 자주 주로 사용합니다.

  스네이크식 : user_login_log 또는 USER_LOGIN_LOG

사용방법은 간단하니 각 환경에 맞는 네이밍을 사용하시면 됩니다.
