mvn clean package -DskipTests=true -P dev
cd target
cp vision.war ~/Desenvolvimento/jboss/server/default/deploy/gennera
