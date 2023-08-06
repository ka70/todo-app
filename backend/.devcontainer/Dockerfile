# Define base image
FROM ubuntu:20.04

# Install system dependencies
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends tzdata && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the timezone
ENV TZ=Asia/Tokyo

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
    tree \
    postgresql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*


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

# Install pyenv and Python and poetry
RUN curl https://pyenv.run | bash && \
    echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc && \
    echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc && \
    echo 'eval "$(pyenv init --path)"' >> ~/.bashrc && \
    . ~/.bashrc && \
    pyenv install 3.10 && \
    pyenv global 3.10 && \
    pip install -U mypy pylint flake8 black isort && \
    curl -sSL https://install.python-poetry.org | python3 && \
    echo '# Add Poetry path to PATH variable' >> ~/.bashrc && \
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc

# Install AWS CLI and SAM CLI
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    sudo ./aws/install && \
    rm awscliv2.zip && \
    curl -L "https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-linux-x86_64.zip" -o "samcliv2.zip" && \
    unzip samcliv2.zip -d sam-installation && \
    sudo ./sam-installation/install && \
    rm samcliv2.zip && \
    echo '# Install AWS CLI and SAM CLI' >> ~/.bashrc && \
    echo 'export PATH="/root/aws/dist:$PATH"' >> ~/.bashrc && \
    echo 'complete -C "/usr/local/bin/aws_completer" aws' >> ~/.bashrc

CMD ["/bin/bash"]
