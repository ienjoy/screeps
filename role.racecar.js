var roleRacecar = {
        run: function(creep) {
        	creep.moveTo(Game.flags.Flag3.pos);
        	var theControllerToGet = creep.room.controller
        	creep.reserveController(theControllerToGet);
        	console.log(theControllerToGet);
        	
        	// let status = creep.claimController(creep.room.controller);
			// console.log('claim status: ' + status);
        }
};

module.exports = roleRacecar;