# SocialFarm Backend Infrastructure Scaffold

This folder provides a production-oriented architecture scaffold for a microservice deployment.

## Services
- API Gateway
- Auth Service
- Social Service
- Chat Service
- Room Service
- Video Service
- Game Service
- Economy Service
- Notification Service
- WebSocket Gateway

## Infra
- PostgreSQL
- Redis
- Kafka + ZooKeeper
- MinIO (S3-compatible storage)

## Run
```bash
docker compose up -d
```

## Notes
- Service containers are placeholders to keep architecture lightweight while frontend MVP evolves.
- `backend/infra/postgres/init.sql` defines the full relational domain schema.
