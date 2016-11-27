var roleRepair = {
    
run: function(creep) {

            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            //Harvesting complete.  Reinit and distribute to task
            
            creep.memory.working = true;
            creep.memory.harSource = -1;
            
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            //Search for structure with less then max energy
            //////pos.findClosestByPath //creep.room.find  //structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER ||
            //structure.structureType == STRUCTURE_ROAD &&
            var percent = 0;
            if (creep.room.find(FIND_CONSTRUCTION_SITES) != null) {
                percent=0.5;
            } else {
                percent=0.9;
            }
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: (structure) => 
                                                                {
                                                                    return (structure.hits < (structure.hitsMax * percent));
                                                                }
                                                            });
            if(target != null) {
                /////////////////////////////////////////////////////////////////////////////////////////////////////////
                //Damaged structure found, move and repair
                var resp = creep.repair(target)
                if(resp == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                } else if (resp == OK) {
                    creep.say('Repairing')
                }
            } else {
                /////////////////////////////////////////////////////////////////////////////////////////////////////////
                //Damaged structure not found, try to build, and as last resort, move to spawn point
                var targetTwo = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if (targetTwo == null) {
                    var moveToConsSpawn = ""
                    for(var rm in Game.rooms){
                        var curRoom = Game.rooms[rm]
                        var spawn = Game.rooms[rm].find(FIND_CONSTRUCTION_SITES, { filter: (structure) => { return (structure.structureType == STRUCTURE_SPAWN); } })
                        if (spawn[0] != null) {
                            moveToConsSpawn = spawn[0]
                        }
                    }
                    if (moveToConsSpawn != ""){
                        console.log(creep.name + ' IS HEADING TO REPAIR NEW CONTROLLER!!! (lookout!)')
                        
                        creep.moveTo(moveToConsSpawn, {avoid: helper.getAvoidedArea(creep.room)});
                        creep.moveTo(moveToConsSpawn, {costCallback: function(roomName, costMatrix) {
                                                            var avo = helper.getAvoidedArea(creep.room);
                                                            roomName = creep.room.name;
                                                            for (var p in avo){
                                                                //console.log(avo[p].x + ', ' + avo[p].y);
                                                                costMatrix.set(avo[p].x,avo[p].y,255);
                                                            }
                                                        }
                            
                        })
                    }
                } else {
                    creep.say('building')
                    if(creep.build(targetTwo) == ERR_NOT_IN_RANGE)
                    {
                        /////////////////////////////////////////////////////////////////////////////////////////////////////////
                        //Buildable structures found, deploy
                        creep.moveTo(targetTwo);
                    }
                }
            }
        }
};

module.exports = roleRepair;