var roleRepair = {


	/*
	TODO:
	Gotta make sure these guys don't stand on containers
	*/
	
    /** @param {Creep} creep **/
    run: function(creep) {
    
    	creep.say("Maid!");
    	
    	// ARE WE HARVESTING ENERGY?
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
	    }
	    
	    // ARE WE UPGRADING THE CONTROLLER?
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	    }
	    
    	
    	if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }else{
		
			var roomdestination = null;
			var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
			if(target) {
				if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target);
				}
			}else{
			
				
			
				// creep.moveTo(roomdestination);
				creep.moveTo(Game.flags.boredRepairs_two.pos);
			}
		
		}	

	}
};

module.exports = roleRepair;