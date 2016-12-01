var roleDragon = { /** @param {Creep} creep **/
        run: function(creep) {
           
           
           
        let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if(target != undefined) {
			if(creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target);
			}else{
				creep.moveTo(Game.flags.rangedOutpost.pos);
			}
		  }
        }
};

module.exports = roleDragon;

//W76N51