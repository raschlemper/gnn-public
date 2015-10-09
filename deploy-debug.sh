cd src/main/webapp/WEB-INF/assets
grunt dev
cd ~/Desenvolvimento/financeiro/vision/src/main/webapp/WEB-INF/
rsync -av -C --progress assets/ ~/Desenvolvimento/jboss/server/default/tmp/deploy/*vision*/WEB-INF/assets