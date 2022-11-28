const { Revise } = require("revise-sdk");
const { fetchGoals } = require("./data.js");
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiZjcxYzQyLWQyNGMtNDYxMS1hMDk3LTA4NjFmMTUwZmFjYSIsImtleSI6ImNjMzJ0OGJrIiwiaWF0IjoxNjY0ODEwMzUzfQ.f4_-DM70NODaauMACBTWBidHwf4ItZI9V10QpLuwWSk";
const revise = new Revise({auth: AUTH_TOKEN});
const {express} = require("express");

async function run() {
    try{     
    const nftObj = await revise.fetchNFT("9f0e5f69-407a-4553-aed4-954397eef739"); // FETCHING NFT OBJECT FROM REVISE USING SDK
    const nft = revise.nft(nftObj);
    let nftmetaData = nft.nft.metaData;

    const config = {
      id: 278, // player code for lionel messi
      season: "2022",
      league: 1 // league code for fifa world cup
    }

    // fetchgoals returns the Player Data, Image and Number of Goals scored by the player
    revise.every('3600s').listenTo(() => fetchGoals(config)).start(apiData => {

      let goals = apiData?.totalGoals;  // Total goals of the player from the api

      let nftGoals = parseInt(nftmetaData[(nftmetaData.length) -1].goals); // Total goals of the player 

      if(goals != nftGoals)   //It compares the previous goals scored vs the current goals scored by the player
      {       
        nft
          .setImage(apiData?.image)
          .setProperty("goals", goals)
          .save();
      }
     });
    }catch(error){
      console.log("Error:",error);
    }
    console.log(`Revise App Listening`)

}
run()