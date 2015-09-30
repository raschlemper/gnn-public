mvn clean package -DskipTests=true -P prod
cd target
cp vision.war ~/desenvolvimento/jboss/server/default/deploy/gennera
