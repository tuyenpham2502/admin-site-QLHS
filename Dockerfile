FROM node:14-buster

EXPOSE 17013

#RUN apt-get update
#RUN apt-get install telnet -y
#RUN apt-get install net-tools -y
#RUN apt-get install iputils-ping -y
#RUN apt-get install htop -y
#RUN apt-get install vim -y
#RUN apt-get install lsof -y
# Create app directory
WORKDIR /app
RUN pwd
RUN ls -la
# Copy config and built files
COPY . .
RUN pwd
RUN ls -la
# Install app dependencies
RUN yarn install
RUN rm -rf .next
RUN pwd
RUN ls -la
RUN yarn build

RUN pwd
RUN ls -la
# CMD [ "yarn","start" ]

