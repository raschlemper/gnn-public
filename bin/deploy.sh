mvn clean package -P prod
cd target
cp vision.war ~/Development/jboss/server/default/deploy/gennera
