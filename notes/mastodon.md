# Running a Mastodon Bot on our Droplet!

## Changes to Server
### <span style="background-color: #ff00f2">This only needs to be done ONCE. If you did this in class, you do not need to do this again.</span>
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

## Running the Bot on Your Droplet

1. Open Cyberduck and drag your entire folder into your droplet. The bot folder should be at the same level as your `/project3` and `/webserver` folders.

![cyberduck.png](https://drive.google.com/uc?id=1Wdbc5KWiELQ5SxKeIm5lmUczwuZv4yoX)

2. Open terminal and ssh into your droplet with `ssh root@{your-ip}`
3. Navigate to your bot folder using `cd`
4. Ensure you have your files correctly uploaded using `ls`. If you are missing your `/node_modules` folder, you can run `npm install`
5. Check to make sure your bot is working correctly using `node bot.js`. If you have an error here, it means there is something wrong with your code. If it is working correctly, stop the bot by pressing `Ctrl-C`
6. Check the servers you currently have running by using `pm2 ls`. You should have your original server (called `server` or `original`) and your project 3 server (titled `midterm` or `community`). You should only have these two servers. If you have others, delete them with:
```
pm2 stop {server name that you are deleting}
pm2 delete {server name that you are deleting}
```
Make sure that there are no curly braces, you should replace `{server name you are deleting}` with whatever extra server you are running.
8. Run the bot using
```
pm2 start bot.js
```
7. Check your mastodon profile to make sure the bot is working!
