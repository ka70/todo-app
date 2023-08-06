# Define base image
FROM ubuntu:20.04

# Install system dependencies
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends tzdata && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y locales && \
    locale-gen ja_JP.UTF-8 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the timezone and language
ENV TZ=Asia/Tokyo\
    LANG=ja_JP.UTF-8 \
    LANGUAGE=ja_JP:ja \
    LC_ALL=ja_JP.UTF-8

# Install additional dependencies
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
    curl \
    git \
    unzip \
    zip \
    sudo \
    make \
    build-essential \
    libssl-dev \
    zlib1g-dev \
    libbz2-dev \
    libreadline-dev \
    libsqlite3-dev \
    wget \
    llvm \
    libncursesw5-dev \
    xz-utils \
    tk-dev \
    libxml2-dev \
    libxmlsec1-dev \
    libffi-dev \
    liblzma-dev \
    vim \
    tree && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Add aliases
# COPY aliases.sh /root
# RUN echo "# Add aliases\n" >> ~/.bashrc && \
#     echo "source /root/aliases.sh" >> ~/.bashrc

# Add Git branch name to bash prompt
RUN echo "# Git branch in prompt.\n" >> ~/.bashrc && \
    echo "parse_git_branch() {" >> ~/.bashrc && \
    echo "  git branch 2> /dev/null | sed -e \"/^[^*]/d\" -e \"s/* \(.*\)/ (\\1)/\"" >> ~/.bashrc && \
    echo "}" >> ~/.bashrc && \
    echo 'export PS1="\\w\\[\\033[32m\\]\\$(parse_git_branch)\\[\\033[00m\\] $ "' >> ~/.bashrc

# Install git-completion
RUN echo "# Install git-completion\n" >> ~/.bashrc && \
    echo "curl https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash -o ~/.git-completion.bash" >> ~/.bashrc && \
    echo 'source ~/.git-completion.bash' >> ~/.bashrc


# Install nvs
RUN echo "# Install nvs\n" >> ~/.bashrc && \
    echo 'export NVS_HOME="$HOME/.nvs"' >> ~/.bashrc && \
    echo '[ -s "$NVS_HOME/nvs.sh" ] && . "$NVS_HOME/nvs.sh"' >> ~/.bashrc && \
    echo "git clone https://github.com/jasongin/nvs \"$HOME/.nvs\"" >> ~/.bashrc && \
    . ~/.bashrc && \
    . "$NVS_HOME/nvs.sh" install && \
    echo "nvs add lts" >> ~/.bashrc && \
    . ~/.bashrc && \
    echo "nvs link lts" >> ~/.bashrc

# Run bash
CMD ["/bin/bash", "-l"]
