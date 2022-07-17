# Ubuntu apt update error

#### July 18, 2022

우분투 업데이트가 늦었을때

```
sudo apt update
```

```
404  Not Found [IP: 91.189.91.124 80]
```

요딴 에러가 나올경우

```
sudo vim /etc/apt/sources.list
```

서버주소를 다음과 같이 바꿔준다
vim 의 문자열 바꾸는 명령어 %s 사용

```
:%s/ports.ubuntu.com/old-releases.ubuntu.com
:%s/ubuntu-ports/ubuntu

주소는 버전마다 다를수 있음.
결과적으로
http://old-releases.ubuntu.com/ubuntu/ groovy main universe restricted multiverse
전부 이렇게 바뀌면 된다.
```

이렇게 하고

```
sudo apt update
sudo apt upgrade
```

끝
