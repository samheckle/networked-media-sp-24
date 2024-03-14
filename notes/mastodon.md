# Running a Mastodon Bot on our Droplet!

## Changes to Server

Following this [DigitalOcean tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04#option-3-installing-node-using-the-node-version-manager), we need to update our node version on our droplet.

1. Install node version manager (nvm)
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

2. Add nvm to the path on your droplet
```
source ~/.bashrc
```

3. You can view the whole list of available versions running `nvm list-remote`. We want to install `lts/iron`
```
nvm install lts/iron
```

4. To ensure the correct node version is installed, we want to run
```
node -v
```
Which should output `v20.11.1`

5. Sometimes your server will change the default node version, so in order to change that we need to run
```
nvm alias default 20.11.1
```
Which should output `default -> 20.11.1 (-> v20.11.1)`

