async function main() {
    const MyTokenV1 = await ethers.getContractFactory('MyTokenV1');
    
    // Start deployment, returning a promise that resolves to a contract object
    const my_token = await MyTokenV1.deploy( );
    console.log("Contract deployed to address:", my_token.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });