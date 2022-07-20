import { ItemStack, world, Items } from "mojang-minecraft";

world.events.itemUse.subscribe(capsuleUsed);

function fill_oxygen(entity){
    entity.getComponent("minecraft:breathable").setAirSupply(2000);
}

function capsuleUsed(eventData) {
    if (eventData.item.id == "ek:oxygen_capsule") {
        eventData.source.getComponent("minecraft:inventory").container.addItem(new ItemStack(Items.get("ek:oxygen_capsule_empty"),1));
        eventData.source.runCommand("playsound ek.oxygen_capsule @a[r=10] ~ ~ ~");
        fill_oxygen(eventData.source);
    }
}

world.events.dataDrivenEntityTriggerEvent.subscribe(inSpaceShip);

function inSpaceShip(eventData){
    if (eventData.id == "ek:fill_oxygen") {
        fill_oxygen(eventData.entity);
    }
}

world.events.itemUseOn.subscribe(capsuleRefilled);

function capsuleRefilled(eventData) {
    if (eventData.item.id == "ek:oxygen_capsule_empty" && eventData.source.dimension.getBlock(eventData.blockLocation).id == "ek:oxygen_plant") {
        eventData.item.amount --;
        eventData.source.getComponent("minecraft:inventory").container.addItem(new ItemStack(Items.get("ek:oxygen_capsule"),1));
    }
}