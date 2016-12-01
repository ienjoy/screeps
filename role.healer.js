var roleHealer = { /** @param {Creep} creep **/
        run: function(creep) {
    
        creep.moveTo(Game.flags.attack.pos);			
		// heal myself when no one is around
		var healtarget = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
			filter: function(object) {
				return object.hits < object.hitsMax;
			}
		});
		if(healtarget) {
			if(creep.heal(healtarget) == ERR_NOT_IN_RANGE) {
				creep.moveTo(healtarget);
			}
		}
	 
	}
};


module.exports = roleHealer;