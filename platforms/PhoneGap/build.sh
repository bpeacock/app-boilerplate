HC='\033[1;32m' # Heading Color
NC='\033[0m'    # No Color

### Install PhoneGap Dependencies ###

echo "\n${HC}Installing PhoneGap Dependencies...${NC}"

command -v cordova >/dev/null 2>&1 || {
    sudo npm install -g cordova
}

command -v phonegap >/dev/null 2>&1 || {
    sudo npm install -g phonegap
}

command -v ios-sim >/dev/null 2>&1 || {
    sudo npm install -g ios-sim
}

command -v ios-deploy >/dev/null 2>&1 || {
    sudo npm install -g ios-deploy
}


### Create the Project ###

echo "\n${HC}Creating the Project...${NC}"

mkdir -p builds
cd builds
phonegap create PhoneGap
cd PhoneGap
cordova platform add ios


### Setup Project Contents ###

echo "\n${HC}Copying Project Contents...${NC}"

if [ ! -f ../../platforms/PhoneGap/www/js/jquery.min.js ]; then
    wget https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js -P ../../platforms/PhoneGap/www/js/
fi

cp -r ../../platforms/PhoneGap/www ./


### PhoneGap Plugin Installation ###

echo "\n${HC}Installing PhoneGap Plugins...${NC}"

# phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file.git



### Fire Up the Emulator ###

echo "\n${HC}Running PhoneGap...${NC}"

killall "iPhone Simulator"
phonegap run ios


exit
