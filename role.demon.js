var roleDemon = { /** @param {Creep} creep **/
        run: function(creep) {
           
           
           
        let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if(target != undefined) {
			if(creep.attack(target) == ERR_NOT_IN_RANGE) {
				// creep.moveTo(target);
				creep.moveTo(Game.flags.steal.pos);
			}
		}
		else {
			creep.moveTo(Game.flags.attack.pos);
		}
			   
           
        }
};

module.exports = roleDemon;

//W76N51