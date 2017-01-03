var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
    
    
		// make sure we are sending some people the right way
		desiredNumber = 0;
		
		upgradersHere = 0;		
		var upgraderCheck = Game.rooms["E15N61"].find(FIND_MY_CREEPS, { filter: function(i) {
			// console.log(i.memory.role);
		if(i.memory.role == 'upgrader') {
			upgradersHere++;
		}
		}});
		// console.log(upgradersHere);
		
		
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
			
			// if (upgradersHere < desiredNumber)
			if (1 == 2)
			{
				creep.moveTo(Game.rooms["W76N51"].controller);
				creep.say("Gotta run");
			}else{
			
			
			
			
			
	        
	        // console.log('bored');
	        // totalNumberOfDudes++;
	        
	        // let's see if we have any containers
	        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                    (structure.store[RESOURCE_ENERGY] > creep.carryCapacity - creep.carry.energy);
                    // this is an interesting trick - it'll just keep pulling as long as it can
                }
            });
            var source = creep.pos.findClosestByPath(containers);
            
            // ok, if we found a container, use it
            if (source)
            {
                if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }else{ 
                
                
                // if we don't have a container, try two things
                
                
                // any dropped energy?
                var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
				if(target) {
				if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target);
				}
				
				
			}else{ // ok fine, go mine
			
				var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
                
			}
			
                
               	
               	
                // creep.say('miner plz');
                // creep.moveTo(Game.flags.boredBuilders.pos);
                
                // there's nothing for you, just go home and maybe there will be things there
                // creep.moveTo(Game.spawns['Spawn1'].pos);
            }    
	    
	    
			
			
			}  	    
        }
	}
};

module.exports = roleUpgrader;