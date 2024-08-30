---
title: Software Engineer
organization: Aflac
startDate: September 2022
---

- Modernized legacy enrollment data distribution system for four customer management systems by establishing a micro-service architecture. Improved response time by 65\%, enhancing integration and distribution of data in real-time.

- Streamed data using Kafka (MSK) cluster and managed consumer groups for horizontal scaling. Achieved a 100\% message delivery success rate withstanding peak loads of over 250,000 requests per day.

- Developed servers with Spring Boot and Maven that provided REST APIs, Kafka publishers and consumers as well as direct database updates.

- Secured services with OAuth 2.0 tokens, implemented automated API call retries, and protected downstream endpoints with circuit breaking.

- Configured AWS lambdas with MSK event sources to transform data through DynamoDB tables. Utilized DynamoDB streams to trigger lambdas to post updates back to Kafka.

- Improved CI/CD to create docker containers for upload to AWS ECR and deployment using cloud formation. Created a comprehensive suite for unit and integration testing, providing 90\% code coverage. Logged progress using Splunk and saved failed messages to S3.