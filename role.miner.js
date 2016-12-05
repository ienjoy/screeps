var roleMiner = { /** @param {Creep} creep **/
        run: function(creep) {
            if (creep.memory.harvesting != true) {
                var targets_energy = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                            (structure.pos.isOccupied == false);
                    }
                });
                // if we see an open source, great
                if (targets_energy.length > 0) {
                	creep.say(':)');
                	// you've got to go get in position
                    var sources = creep.room.find(FIND_SOURCES);
                    if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1]);
                    }
                } else {
                	var sources = creep.room.find(FIND_SOURCES);
                    if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1]);
                    }
                }
            } else {
               creep.say('oops');
            }
        }
};

module.exports = roleMiner;