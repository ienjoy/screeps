// ROLES

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleSmarterbuilder = require('role.smarterbuilder');
var roleRepair = require('role.repair');

// GLOBALS I GUESS

totalNumberOfDudes = 0;


module.exports.loop = function () {

    // debugging
    console.log('totalNumberOfDudes is '+totalNumberOfDudes);
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);
    
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    console.log('Miners: ' + miners.length);
    
    var smarterbuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'smarterbuilder');
    console.log('Smarter builders: ' + smarterbuilders.length);
    
    var repairs = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
    console.log('Repairs: ' + repairs.length);
    
    
    if (harvesters.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvesters: ' + newName);
    }else if (upgraders.length < 5) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }else if (miners.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,MOVE], undefined, {role: 'miner'});
        console.log('Spawning new miner: ' + newName);
    }else if (smarterbuilders.length < 4) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'smarterbuilder'});
        console.log('Spawning new smarterbuilder: ' + newName);
    }else if (repairs.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'repair'});
        console.log('Spawning new repair: ' + newName);
    }else if (builders.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    }  
    

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        
        if(creep.memory.role == 'smarterbuilder') {
            roleSmarterbuilder.run(creep);
        }
        
        if(creep.memory.role == 'repair') {
            roleRepair.run(creep);
        }
        
    }
}