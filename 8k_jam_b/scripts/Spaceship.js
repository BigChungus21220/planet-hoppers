import { world, BlockLocation} from "mojang-minecraft";

const max_fuel = 400;
const low_warning = 30;

world.events.dataDrivenEntityTriggerEvent.subscribe(spaceShipFlying);

function isGrounded(entity){
    return entity.hasTag("grounded");
}

function spaceShipFlying(eventData){
    if (eventData.id == "ek:decrement_fuel") {
        let inventoryContainer = eventData.entity.getComponent("minecraft:inventory").container;
        let fuel;
        try {
            fuel = world.scoreboard.getObjective("fuel").getScore(eventData.entity.scoreboard);
        } catch (error) {
            eventData.entity.runCommand("scoreboard players add @s fuel 0");
        }
        let slot = -1;
        if (inventoryContainer.emptySlotsCount != 5) {
            for (let i = 0; i < 5; i++){
                let item_id;
                try {
                    item_id = inventoryContainer.getItem(i).id;
                } catch (error) {
                    continue;
                }
                if (item_id == "ek:jerrycan"){
                    slot = i;
                    break;
                }
            }
        }
        let hasFuel = slot >= 0;
        if (fuel <= 0) {
            if (!hasFuel) {
                eventData.entity.runCommand("title @p[r=3] actionbar §cNo Fuel");
                eventData.entity.runCommand("event entity @s no_fuel");
            } else {
                let newStack = inventoryContainer.getItem(slot);
                newStack.amount--;
                inventoryContainer.setItem(slot, newStack);
                eventData.entity.runCommand("event entity @s fuel");
                eventData.entity.runCommand("scoreboard players set @s fuel " + max_fuel);
            }
        } else {
            if (fuel <= low_warning && !hasFuel) {
                eventData.entity.runCommand("title @p[r=3] actionbar §gLow Fuel");
            }
            if (!isGrounded(eventData.entity)) {
                eventData.entity.runCommand("scoreboard players set @s fuel " + (fuel-1));
            }
        }
        eventData.entity.runCommand("title @p[r=3] actionbar " + fuel);
    }
}

world.events.entityCreate.subscribe(addScore);

function addScore(eventData){
    if (eventData.entity == "ek:spaceship") {
        eventData.entity.runCommand("scoreboard players add @s fuel 0");
    }
}
