FROM node:14
ARG APP_NAME
ARG BUILD_ID
ARG VERSION
WORKDIR /opt/app
ENV APP_NAME="${APP_NAME}"
ENV BUILD_ID="${BUILD_ID}"
ENV VERSION="${VERSION}"


# This must be built locally from the common package
COPY --from=pinscommonukscontainers3887default.azurecr.io/common:latest /opt/app ../common
ADD src src
ADD jest.config.js jest.config.js

ADD package.json package.json
ADD package-lock.json package-lock.json

RUN npm i --production
# RUN npm prune --production \
# && npm rebuild \
# && npm version ${VERSION} --no-git-tag-version --allow-same-version || true
RUN npm run documentation; echo $? > /npm.exitcode
EXPOSE 3000
USER node
#VOLUME [ "data" ]
CMD [ "npm", "start" ]
