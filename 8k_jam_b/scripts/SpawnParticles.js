import { world } from "mojang-minecraft";

world.events.tick.subscribe(spawnParticles);

function spawnParticles(tickInfo) {
    if (tickInfo.currentTick % 20 == 0) {
        let players = world.getPlayers();
        for (let p of players) {
            p.runCommand("particle ek:star_still_particle");
        }
    }
}
