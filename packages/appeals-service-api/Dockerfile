FROM node:14
ARG APP_NAME
ARG BUILD_ID
ARG VERSION
WORKDIR /opt/app
ENV APP_NAME="${APP_NAME}"
ENV BUILD_ID="${BUILD_ID}"
ENV VERSION="${VERSION}"
RUN mkdir -p /opt/app/data
COPY data/lpa-trialists.json /opt/app/data/
COPY data/lpa-list.csv /opt/app/data/

# This must be built locally from the common package
COPY --from=pinscommonukscontainers3887default.azurecr.io/common:latest /opt/app ../common
COPY --from=pinscommonukscontainers3887default.azurecr.io/business-rules:latest /opt/app ../business-rules
ADD api api
ADD src src
ADD __tests__ __tests__
ADD jest.config.js jest.config.js

# ADD node_modules node_modules
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
