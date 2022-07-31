# CORS 발생시 넉스트 프록시 설정으로 간단하게 우회하기

#### July 31, 2022

### 에러

![48684803-6855d700-ebee-11e8-8cc3-785586850f57](https://user-images.githubusercontent.com/321292/182032949-8cdc85e4-e4ea-4f98-8d2e-db944d099956.png)

> 아주 흔한 cors 에러 이다. 프론트엔드 개발만을 할경우 서버쪽에 요청할수 없는 상황이거나 애매한 상황일때 어떻게 해결해야할까?

### axios 프록시 설정을 해주면 간단히 해결된다.

1.  nuxt.config.js
