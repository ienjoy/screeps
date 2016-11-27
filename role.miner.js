var roleMiner = { /** @param {Creep} creep **/
    run: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
            }
        });
        if (targets.length > 0) {
            if (creep.pos.getRangeTo(targets[1]) == 0) {
                var source = creep.pos.findClosestByPath(FIND_SOURCES);
                console.log('I am at '+source);
               	creep.memory.sourceId = source.id;
            } else {
                creep.moveTo(targets[1]);
            }
        }
    }
};

module.exports = roleMiner;