# CORS 발생시 넉스트 프록시 설정으로 간단하게 우회하기

#### July 31, 2022

### 에러

![48684803-6855d700-ebee-11e8-8cc3-785586850f57](https://user-images.githubusercontent.com/321292/182032949-8cdc85e4-e4ea-4f98-8d2e-db944d099956.png)

> 아주 흔한 cors 에러 이다. 프론트엔드 개발만을 할경우 서버쪽에 요청할수 없는 상황이거나 애매한 상황일때 어떻게 해결해야할까?

### axios 프록시 설정을 해주면 간단히 해결된다.

1.  nuxt.config.js

```
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],

  proxy: {
    '/testing/': 'http://test.example.com',
  },
```

### 이와같이 설정 해주면

```
npm install --save @nuxtjs/proxy
```

### 패키지를 설치해준다.

```js
$axios.get(`/testing/`, { ...
```

### 이런식으로 axios를 호출해주면 설정한 도메인으로 연결하는 효과를 준다.

- 물론 서버에서 설정해주는 것이 우선이겠지만 서버 설정이 안되는 경우에
  이방법을 쓰면 매우 간편하다. 여러개의 주소 설정이 가능하다. /testing/ 뒤에 어떤 주소가 오던지
  도메인을 붙여주는 효과를 내므로 매우 간편하게 설정가능 하다.
