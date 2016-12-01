var roleBasilisk = { /** @param {Creep} creep **/
        run: function(creep) {
           
        
        creep.moveTo(Game.flags.attack.pos);	   
           
           
        let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if(target != undefined) {
			if(creep.attack(target) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target);
			}
		}else{
					
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
	}
};

module.exports = roleBasilisk;

//W76N51