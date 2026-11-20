import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  const adminAddress = "0x4f848c26204Eb3Ecbabe556a3A645F1f7a7e41fA";

 
  const [deployer] = await ethers.getSigners();
  const tx = await deployer.sendTransaction({
    to: adminAddress,
    value: ethers.parseEther("100.0"),
  });
  await tx.wait();
  console.log("100 ETH envoyés à votre compte MetaMask!");

  // 2. Déploiement dyal l-contrat
  const CertificateRegistry = await ethers.getContractFactory("CertificateRegistry");
  console.log("Déploiement du contrat CertificateRegistry...");
  
  const certificateRegistry = await CertificateRegistry.deploy();
  await certificateRegistry.waitForDeployment();

  console.log("Contrat déployé avec succès à l'adresse:", await certificateRegistry.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});