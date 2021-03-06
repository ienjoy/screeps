var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

		
		if(creep.memory.depositing && creep.carry.energy == 0) {
            creep.memory.depositing = false;
            creep.say('withdrawing!');
	    }
	    if(!creep.memory.depositing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.depositing = true;
	        creep.say('depositing!');
	    }



	    if(creep.memory.depositing != true) {
            
             
            
	        
	        // console.log('bored');
	        // totalNumberOfDudes++;
	        
	        // let's see if we have any containers
	        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER  || structure.structureType == STRUCTURE_STORAGE) &&
                    (structure.store[RESOURCE_ENERGY] > creep.carryCapacity);
                }
            });
            var source = creep.pos.findClosestByRange(containers);
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
	    
            
            
            
            
            
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_CONTAINER ||
                                structure.structureType == STRUCTURE_STORAGE) && structure.energy < structure.energyCapacity;
                    }
            });
            
            // console.log(targets);
            
            if (targets.length > 0) {
				var target = creep.pos.findClosestByRange(targets);
			    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
			}else{
				
				
				// if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // creep.moveTo(creep.room.controller);
            	// }
            
			}            
        }
	}
};

module.exports = roleHarvester;