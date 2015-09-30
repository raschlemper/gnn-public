cd src/main/webapp/WEB-INF/assets
grunt dist
rsync -av -C --progress dist/ ~/Development/jboss/server/default/tmp/deploy/*vision*/WEB-INF/assets
