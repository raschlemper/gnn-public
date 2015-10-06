cd src/main/webapp/WEB-INF/assets
grunt dev
cd ~/desenvolvimento/financeiro/vision/src/main/webapp/WEB-INF/
rsync -av -C --progress assets/ ~/desenvolvimento/jboss/server/default/tmp/deploy/*vision*/WEB-INF/assets