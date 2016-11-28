var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

		// ARE WE HARVESTING ENERGY?
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
	    }
	    
	    // ARE WE UPGRADING THE CONTROLLER?
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	    }

		// UPGRADING THE CONTROLLER
	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }else{

	        // let's see if we have any containers
	        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 450);
                }
            });
            var source = creep.pos.findClosestByPath(containers);
            
            // ok, if we found a container, use it
            if (source)
            {
                if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }else{ // if we don't have a container, just be a normal miner instead
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }    
	    
        }
	}
};

module.exports = roleUpgrader;