FROM php:8.1-fpm-alpine
EXPOSE 5173

# install composer
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

# install packages
RUN apk update
RUN apk add bash git nodejs npm

# install php extensions
RUN docker-php-ext-install pdo pdo_mysql