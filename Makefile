build:
	docker build --platform linux/amd64 -t api-server .
run:
	docker run -d -p4000:4000  --name api-server api-server