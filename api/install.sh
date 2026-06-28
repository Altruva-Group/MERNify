#!/bin/bash

# ==============================================
#  BACKEND PRODUCTION DEPENDENCIES
# ==============================================

npm i bcryptjs cors dotenv express express-mongo-sanitize express-rate-limit express-async-handler express-async-errors express-device helmet hpp jsonwebtoken lodash mongoose nodemailer socket.io cookie-parser cookie-session http-status morgan multer jimp passport passport-jwt passport-local ip-address memory-cache gravatar colors swagger-jsdoc swagger-ui-express cloudinary config dayjs request-ip response-time winston winston-transport zod googleapis passport-local-mongoose kafkajs pino pino-pretty prom-client xss-clean execa compression axios

# ==============================================
#  BACKEND DEV DEPENDENCIES
# ==============================================

npm i -D jest supertest nodemon ts-node typescript tsconfig-paths @types/bcrypt @types/express @types/node @types/memory-cache @types/jsonwebtoken @types/compression @types/morgan @types/multer @types/cookie-parser @types/cors