var roleLinkharvester = { /** @param {Creep} creep **/
 run: function(creep) {


		creep.say("lh!");
		
		if(creep.memory.depositing && creep.carry.energy == 0) {
            creep.memory.depositing = false;
            creep.say('withdrawing!');
	    }
	    
	    if(!creep.memory.depositing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.depositing = true;
	        creep.say('depositing!');
	    }
	    

	    if(creep.memory.depositing != true) {
	    
	    creep.say("lh - d");
		creep.moveTo(12, 9);   
		
			// let's see if we have any containers
			var containers = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
					return (structure.structureType == STRUCTURE_LINK);
				}
			});
			var source = creep.pos.findClosestByRange(containers);
			if (source)
			{
				if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(12, 9);
				}
			}else{ // if we don't have a container, just be a normal miner instead
				/*
				var sources = creep.room.find(FIND_SOURCES);
				if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(sources[0]);
				}
				*/ 
				creep.moveTo(12, 9);         
			}
			  
			
		}else{
		
		
			
			
			/*
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_LINK);
                    }
            });
            
            console.log(targets.length);
            
            if (targets.length > 0) {
				var target = creep.pos.findClosestByRange(targets);
			    if(creep.transfer(target[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[1]);
                    creep.say("? ->");
                }
			}else{
				creep.say("?");
			}            
        */
        
        /*if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.controller);
			}
        */
        
		// console.log("made it to the dropoff");
			
		var targets = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				return (structure.structureType == STRUCTURE_STORAGE);
			}
		});
		
		if (targets.length > 0) {
			var target = creep.pos.findClosestByRange(targets);
			creep.transfer(target, RESOURCE_ENERGY);
			console.log("trying to deposit");
		}else{
			console.log("didn't work");
		}
        
        
		}
	}		
};


module.exports = roleLinkharvester;