up:
	docker compose up -d
down:
	docker compose down

deploy:
	firebase deploy

build:
	docker compose run --rm client yarn build
	docker compose run --rm functions yarn build