var roleShuttle = {



    /** @param {Creep} creep **/
    run: function(creep) {
    
    /*
    we toggle between pickup and dropoff
    1. first we get the stuff at the pickup
    2. then we harvest
    3. then we go to the dropoff
    4. then we deposit
	*/

		// creep.memory.destination = "shuttle1_dropoff";
		
	    if(creep.memory.destination != "shuttle1_dropoff") {
            creep.moveTo(Game.flags.shuttle1_pickup.pos); // go there            
            if (Game.flags["shuttle1_pickup"].pos.isNearTo(creep))
            {
            	console.log("made it to the pickup");
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
						creep.moveTo(source);
					}
				}else{
					console.log("Something is wrong");
				}
            	creep.memory.destination = "shuttle1_dropoff";
            }	
	    }else{
	    	creep.moveTo(Game.flags.shuttle1_dropoff.pos); // go there
	    	            
            if (Game.flags["shuttle1_dropoff"].pos.isNearTo(creep))
            {
            	console.log("made it to the dropoff");
            	
            	var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER ||
                                structure.structureType == STRUCTURE_SPAWN);
                    }
            	});
            
            if (targets.length > 0) {
				var target = creep.pos.findClosestByRange(targets);
			    creep.transfer(target, RESOURCE_ENERGY);
			    console.log("trying to deposit");
			}else{
				creep.moveTo(Game.flags.boredHarvesters.pos);
			}
				if (creep.carryCapacity != 0)
				{
            		creep.memory.destination = "shuttle1_pickup";
            	}	
            }
	    }
	    
	}
};






module.exports = roleShuttle;