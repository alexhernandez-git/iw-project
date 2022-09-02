# indianwebs-project-1

Before all:

- Install docker desktop:
  Docker desktop windows link: https://docs.docker.com/desktop/install/windows-install/
  Docker desktop mac link: https://docs.docker.com/desktop/install/mac-install/

Run docker in dev:
docker-compose -f docker-compose.dev.yml up --build

Run docker in staging:
docker-compose -f docker-compose.staging.yml up --build

Run docker in prod:
docker-compose up --build
