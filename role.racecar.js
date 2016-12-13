var roleRacecar = {
        run: function(creep) {
        	
        	
        	creep.moveTo(Game.flags.claim.pos);
        	creep.say("claiming");
        	
        	/*
        	if(creep.room.controller) {
				if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
					creep.moveTo(creep.room.controller);
				}
			}
			*/
        	
        }
};

module.exports = roleRacecar;



