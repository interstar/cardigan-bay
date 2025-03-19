set -e # Bail out if compile fails

echo "==> Cleaning Up"
rm -rf target
rm -rf deploy/*


echo "===> Building Cardigan Bay"

clj -A:prod:app


echo "====> Discover the Filename"
jar_file=$(ls target/clj-ts-*-standalone.jar)


version=$(echo "$jar_file" | sed -n 's/target\/clj-ts-\(.*\)-standalone.jar/\1/p')

echo "Jar file: $jar_file"
echo "Version: $version"

echo "=====> Making Deploy"

mkdir -p ./deploy/cardigan

echo "=======> Copy the JAR File to it"
cp "$jar_file" "./deploy/cardigan/cardigan.jar"

echo "========> Copying Bedrock"
rsync -avr --delete-after ./bedrock/ ./deploy/cardigan/bedrock/

echo "=========> Making Shell Files"
echo "---------> go.sh"
echo "java -jar ./cardigan.jar" > ./deploy/cardigan/go.sh
chmod +x ./deploy/cardigan/go.sh

echo "---------> go.bat"
echo "java -jar ./cardigan.jar" > ./deploy/cardigan/go.bat


echo "==========> Zipping"
cd ./deploy/

zip -r ./cardigan.zip cardigan

echo "=========== DONE"
