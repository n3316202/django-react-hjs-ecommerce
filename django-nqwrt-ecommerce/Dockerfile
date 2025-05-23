# pull official base image
FROM python:3.12.0-alpine as builder

WORKDIR /app

# set environment variables
# Python이 .pyc 캐시 파일을 생성하지 않도록 설정
# PYTHONUNBUFFERED=1: 출력을 즉시 볼 수 있도록 버퍼링 비활성화
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk update
RUN apk add --no-cache postgresql-dev gcc python3 python3-dev musl-dev zlib-dev jpeg-dev libc-dev libpcap-dev linux-headers mariadb-dev build-base && pip3 install mysqlclient


COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]

# # 1. Builder Stage: 빌드와 휠 생성
# FROM python:3.12.0-alpine as builder

# WORKDIR /usr/src/app

# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1

# # 빌드에 필요한 패키지 설치 및 mysqlclient 설치
# RUN apk update && apk add --no-cache \
#     gcc \
#     musl-dev \
#     python3-dev \
#     libffi-dev \
#     postgresql-dev \
#     mariadb-dev \
#     build-base \
#     zlib-dev \
#     jpeg-dev \
#     libc-dev \
#     libpcap-dev \
#     linux-headers \
#     && pip install --upgrade pip \
#     && pip install mysqlclient

# # requirements 복사 및 휠 빌드
# COPY ./requirements.txt .
# RUN pip wheel --no-cache-dir --no-deps --wheel-dir /usr/src/app/wheels -r requirements.txt


# # 2. Final Stage: 실제 실행용 이미지
# FROM python:3.12.0-alpine

# # 앱 사용자 생성 및 디렉토리 준비
# RUN addgroup -S app && adduser -S app -G app

# ENV HOME=/home/app
# ENV APP_HOME=/home/app/web

# RUN mkdir -p $APP_HOME/static $APP_HOME/media
# WORKDIR $APP_HOME

# # 런타임에 필요한 패키지 설치 (libpq: Postgres 라이브러리)
# RUN apk update && apk add --no-cache libpq mariadb-dev

# # 빌더에서 만든 휠 복사 및 패키지 설치
# COPY --from=builder /usr/src/app/wheels /wheels
# COPY --from=builder /usr/src/app/requirements.txt .

# RUN pip install --no-cache-dir /wheels/*

# # 빌드에 필요했던 패키지들은 없애서 이미지 크기 최적화
# RUN apk del gcc musl-dev python3-dev build-base

# # 프로젝트 코드 복사
# COPY . $APP_HOME

# # entrypoint 스크립트 복사 (필요 시)
# COPY ./config/docker/entrypoint.prod.sh $APP_HOME/

# # 권한 변경
# RUN chown -R app:app $APP_HOME

# # 비루트 유저로 실행
# USER app

# # 기본 명령어 (필요에 따라 변경)
# CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
