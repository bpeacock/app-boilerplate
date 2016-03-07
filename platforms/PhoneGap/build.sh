HC='\033[1;32m' # Heading Color
NC='\033[0m'    # No Color

### Fire Up the Emulator ###

cd builds/PhoneGap

echo "\n${HC}Running PhoneGap...${NC}"

killall "Simulator"
phonegap serve

exit
