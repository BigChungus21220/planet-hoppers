import { Vector, Location, world, Player } from "mojang-minecraft";

world.events.worldInitialize.subscribe(setWorldRules);

function setWorldRules() {
    world.getDimension("overworld").runCommand("time set sunrise");
    world.getDimension("overworld").runCommand("gamerule dodaylightcycle false");
    world.getDimension("overworld").runCommand("gamerule doweathercycle false");
}
