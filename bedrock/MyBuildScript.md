Context : [[HackerOnBoarding]]

This is my simple script for building CardiganBay into a JAR file for distribution. Copy it into a file called something like build.sh.

At the end of running it, you will have the distro of the latest code in ./deploy/cardigan.zip 

This zip contains :
* an UberJAR which can be run with `java -jar ./cardigan.jar`
* a copy of the default bedrock wiki data.
----

```
#! /bin/bash

rm -rf target 
clj -A:prod:app

mkdir -p ./deploy/cardigan
cp ./target/clj-ts-0.1.0-SNAPSHOT-standalone.jar ./deploy/cardigan/cardigan.jar
cp ./target/clj-ts-0.1.0-SNAPSHOT-standalone.jar /media/phil/54AE4F563BCE86E8/DATA/dev_tools/jars/cardigan.jar 

rsync -avr --delete-after ./bedrock/ ./deploy/cardigan/bedrock/

echo "java -jar ./cardigan.jar" > ./deploy/cardigan/go.sh
chmod +x ./deploy/cardigan/go.sh
echo "java -jar ./cardigan.jar" > ./deploy/cardigan/go.bat

cd ./deploy/

zip -r ./cardigan.zip cardigan

```


