FROM ruby:2.5

RUN apt-get update
RUN apt-get install -y apache2

# Install node
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs

# Install Rails
RUN gem install rails --version=5.1.3 --no-ri --no-rdoc

# Install Yarn and ChromeDriver
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get install -y yarn
# RUN apt-get install yarn chromium-chromedriver
# RUN ln -s /usr/lib/chromium-browser/chromedriver /usr/local/bin

# Install SQLite CLI
RUN dpkg --add-architecture i386
RUN apt-get update
RUN apt-get install -y libc6:i386 libncurses5:i386 libstdc++6:i386 zlib1g:i386 unzip
RUN curl -sS https://www.sqlite.org/2018/sqlite-tools-linux-x86-3230100.zip > /usr/local/sqlite.zip
RUN unzip /usr/local/sqlite.zip -d /usr/local/
RUN ln -s /usr/local/sqlite-tools-linux-x86-3230100/sqlite3 /usr/local/bin

WORKDIR /usr/src/nomenclator
COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
RUN bundle install

EXPOSE 3005
