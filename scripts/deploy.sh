cd ./services/web
npm run build
rsync -rzvh -u -e 'ssh -p 2224' --progress --delete --exclude=node_modules --exclude=.git ./ root@ngrink.ru:/srv/www/messenger/services/web
cd -

cd ./services/server
npm run build
npm run prisma:migrate:prod
rsync -rzvh -u -e 'ssh -p 2224' --progress --delete --exclude=node_modules --exclude=.git ./ root@ngrink.ru:/srv/www/messenger/services/server
cd -

ssh -p 2224 root@ngrink.ru <<'ENDSSH'
  cd /srv/www/messenger/services/server
  source ~/.nvm/nvm.sh
  npm install
  npm run prisma:generate
  cd -

  pm2 reload messenger/server
ENDSSH
