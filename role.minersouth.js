var roleMinersouth = { /** @param {Creep} creep **/
        run: function(creep) {
            if (creep.memory.harvesting != true) {
                var targets_energy = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                            (structure.store[RESOURCE_ENERGY] < structure.storeCapacity) &&
                            (structure.pos.isOccupied == false);
                    }
                });
                // if we see an open source, great
                if (targets_energy.length > 0) {
                	creep.say(':)');
                    var sources = creep.room.find(FIND_SOURCES);
                    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0]);
                    }
                } else {
                	var sources = creep.room.find(FIND_SOURCES);
                    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0]);
                    }
                }
            } else {
               creep.say('oops');
            }
        }
};

module.exports = roleMinersouth;