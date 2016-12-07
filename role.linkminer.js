var roleLinkminer = { /** @param {Creep} creep **/
        run: function(creep) {

		creep.say("lm");
	
		if(creep.memory.depositing && creep.carry.energy == 0) {
            creep.memory.depositing = false;
            creep.say('withdrawing!');
	    }
	    
	    if(!creep.memory.depositing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.depositing = true;
	        creep.say('depositing!');
	    }
	    
	     
	
	    if(creep.memory.depositing != true) {

			// let's see if we have any containers
			var containers = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
					return (structure.structureType == STRUCTURE_CONTAINER) &&
					(structure.store[RESOURCE_ENERGY] > creep.carryCapacity);
				}
			});
			var source = creep.pos.findClosestByRange(containers);
			if (source)
			{
				if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(6, 42);
				}
			}else{ // if we don't have a container, just be a normal miner instead
				/*
				var sources = creep.room.find(FIND_SOURCES);
				if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(sources[0]);
				}
				*/          
			}
			  
			
		}else{
			
			
			
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_LINK) && structure.energy < structure.energyCapacity;
                    }
            });
            
            if (targets.length > 0) {
				var target = creep.pos.findClosestByRange(targets);
			    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
			}else{
				creep.say("m?");
			}            
        
        
		}
	}		
};

module.exports = roleLinkminer;



