export const systemParts = [
  {
    "name": "Receive the request",
    "detail": "The bank sends the payment details through a secure connection. Accepted requests enter the processing queue.",
    "technology": "HTTP/2 · mTLS"
  },
  {
    "name": "Carry the request",
    "detail": "The queue carries requests to the payment service. A message can arrive more than once, so receiving it is not enough to justify another payment.",
    "technology": "Kafka"
  },
  {
    "name": "Check and process",
    "detail": "The service checks whether this payment already exists and whether its details match. An identical repeat does not move the money again.",
    "technology": "Java / Spring Boot"
  },
  {
    "name": "Keep the record",
    "detail": "The payment, balance changes and result are saved together. The money stays reserved until the receiving bank accepts or rejects the payment.",
    "technology": "PostgreSQL"
  },
  {
    "name": "Return the result",
    "detail": "The result remains available for the bank to read. After an interruption, the bank resumes from its saved position instead of losing its place.",
    "technology": "Outbox · Kafka · gRPC"
  }
] as const;
