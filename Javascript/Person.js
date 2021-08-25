class Player{
    constructor(){
        this.index = null;
        this.distance = 0;
        this.name = null;
        this.rank = null;

    }
    getCount(){
        var playerCountRef = database.ref("playerCount");
        playerCountRef.on("value", function(data){
            playerCount = data.val();
        })
    }
    updateCount(count){
        database.ref("/").update({playerCount: count,});

    }

    async update(){
        var playerIndex = "Players/Player" + this.index;
        await database.ref(playerIndex).set({ name : this.name, distance : this.distance});
    }
    static getInfo(){
        var info = database.ref("Players");
        info.on("value", (data)=>{
            allPlayers = data.val();
        })
    }
    async getRank(){
        await database.ref('rank').on("value", (data)=>{
            this.rank = data.val();
        })

    }
    static updateRank(rank){
        database.ref("/").update({'rank': rank})
    }
}