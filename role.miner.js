var roleMiner = { /** @param {Creep} creep **/
        run: function(creep) {
        
        	// creep.say(creep.pos.roomName);
        	// console.log(Game.rooms[this.roomName].lookForAt(LOOK_CREEPS,this.x,this.y).length > 0);
        	
        	
			if(!creep.memory.mining || creep.memory.mining == false) {
				creep.memory.mining = false;
				// creep.say('seeking!');
			}
		
			if(creep.memory.mining) {
				creep.memory.mining = true;
				// creep.say('mining!');
			}
	    
        	
        	if (creep.memory.mining != true)
        	{        		
				
				
				// let's go find something
				var availableContainers = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_CONTAINER) &&
						(structure.pos.isOccupied == false);
				}
				});
				creep.moveTo(availableContainers[0]);
				
				// are we standing on a container?
				var searchForContainers = creep.room.lookForAt(LOOK_STRUCTURES, creep.pos);
				if (JSON.stringify(searchForContainers).indexOf("container") > 0)
				{
					// creep.say("made it 1!");
					creep.memory.mining = true; // ok stop looking
					var sources = creep.pos.findClosestByRange(FIND_SOURCES);
					creep.harvest(sources);
				}else{
					// creep.say("not yet");
					// creep.memory.mining = false; // keep looking
				}	
				
        		
        	}else{
        		
        	
        	// are we standing on a container?
				var searchForContainers = creep.room.lookForAt(LOOK_STRUCTURES, creep.pos);
				if (JSON.stringify(searchForContainers).indexOf("container") > 0)
				{
					// creep.say("made it 2!");
					creep.memory.mining = true; // ok stop looking
					var sources = creep.pos.findClosestByRange(FIND_SOURCES);
					creep.harvest(sources);
				}else{
					// creep.say("not yet");
					// creep.memory.mining = false; // keep looking
					
					
					console.log('no containers found, but that is fine... gonna mine');					

					var sources = creep.room.find(FIND_SOURCES);
					if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(sources[0]);
					}

				
				}	
			
        
			
			// if we see an open source, great

			// creep.say(':)');
			// you've got to go get in position
			
			

        		
        		
        	}
        	
        	
			
			// console.log(availableContainers);
        
		
			
		}
	}


module.exports = roleMiner;