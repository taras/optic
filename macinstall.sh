echo "Installing Optic dependencies"

# Install Rust
echo "Installing Rust"
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
echo "Installed Rust"

# Install NVM, configure, and add LTS node
echo "Installing NodeJS"
echo "Installing NVM"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
echo  "Installing LTS NodeJS"
nvm install --lts
nvm use --lts
echo "Installed NodeJS"

# After Node is install, add yarn globally
echo "Installing Yarn"
npm install --global yarn
echo "Installed Yarn"

# Add Taskfile
echo "Installing Taskfile"
brew install go-task/tap/go-task
echo "Installed Taskfile"

echo "Install complete, from the root execute `task workspaces:build`"