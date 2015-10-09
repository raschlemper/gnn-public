mvn clean package -DskipTests=true -P prod
cd target
cp vision.war ~/Desenvolvimento/jboss/server/default/deploy/gennera
