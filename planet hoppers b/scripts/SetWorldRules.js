import { world} from "mojang-minecraft";

world.events.worldInitialize.subscribe(setWorldRules);

function setWorldRules() {
    world.getDimension("overworld").runCommand("time set sunrise");
    world.getDimension("overworld").runCommand("gamerule dodaylightcycle false");
    world.getDimension("overworld").runCommand("gamerule doweathercycle false");
    world.getDimension("overworld").runCommand("gamerule doimmediaterespawn true");
    world.getDimension("overworld").runCommand("gamerule keepinventory true");
    world.getDimension("overworld").runCommand("gamerule sendcommandfeedback false");
    if (world.scoreboard.getObjective("fuel") == null) {
        world.getDimension("overworld").runCommand("scoreboard objectives add fuel dummy");
    }
}
