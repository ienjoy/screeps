var roleRepair = {


	/*
	TODO:
	Gotta make sure these guys don't stand on containers
	*/
	
    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	        var percent = 0;
            if (creep.room.find(FIND_CONSTRUCTION_SITES) != null) {
                // percent=0.0001; // this is better for walls
                percent=0.75; // this is my container thing
            } else {
                percent=0.9;
            }
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: (structure) => 
				{
					return ((structure.hits < (structure.hitsMax * percent) && structure.structureType 
					!= STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART));
					// return (structure.hits < 1);
				}
			});
            if(target != null) {
            
                /////////////////////////////////////////////////////////////////////////////////////////////////////////
                //Damaged structure found, move and repair
                var resp = creep.repair(target);
                
                // console.log(resp);
                creep.moveTo(target);
                
                if(resp == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                } else if (resp == OK) {
                    creep.say('R');
                }
            
	    }else{
	    	creep.say('bored');
	    	creep.moveTo(Game.flags.boredRepairs.pos);
	    }
	    
	    
	    }else {
	        
	        // console.log('bored');
	        // totalNumberOfDudes++;
	        
	        // let's see if we have any containers
	        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > creep.carryCapacity);
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
                /*
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
                */
                creep.moveTo(Game.flags.boredRepairs.pos);
            }    
	    }
	}

};

module.exports = roleRepair;