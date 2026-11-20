import { expect } from "chai";
import pkg from "hardhat";
const { ethers } = pkg;

describe("CertificateRegistry", function () {
  let certificateRegistry;
  let admin, student1, student2, hacker;
  const ADMIN_ADDRESS = "0x4f848c26204Eb3Ecbabe556a3A645F1f7a7e41fA";

  beforeEach(async function () {
    const signers = await ethers.getSigners();
    student1 = signers[1];
    student2 = signers[2];
    hacker = signers[3];

    // Approvisionner l'adresse admin définie dans le constructeur et l'impersonate pour le test
    await signers[0].sendTransaction({
      to: ADMIN_ADDRESS,
      value: ethers.parseEther("10.0"),
    });
    await ethers.provider.send("hardhat_impersonateAccount", [ADMIN_ADDRESS]);
    admin = await ethers.getSigner(ADMIN_ADDRESS);

    const CertificateRegistry = await ethers.getContractFactory("CertificateRegistry");
    certificateRegistry = await CertificateRegistry.deploy();
    await certificateRegistry.waitForDeployment();
  });

  it("Doit définir le bon propriétaire (admin)", async function () {
    expect(await certificateRegistry.owner()).to.equal(ADMIN_ADDRESS);
  });

  it("Doit permettre à l'admin d'émettre un certificat individuel", async function () {
    await certificateRegistry.connect(admin).mintCertificate(
      student1.address,
      "Hajar Tigh",
      "A131013",
      "Master IA",
      "2026-06-30",
      "Très Bien"
    );

    const cert = await certificateRegistry.getCertificate(1);
    expect(cert.studentName).to.equal("Hajar Tigh");
    expect(cert.studentId).to.equal("A131013");
    expect(cert.revoked).to.equal(false);
  });

  it("Doit refuser l'émission si l'appelant n'est pas l'admin", async function () {
    await expect(
      certificateRegistry.connect(hacker).mintCertificate(
        student1.address,
        "Test Hacker",
        "CNE999",
        "Diplôme",
        "2026-06-30",
        "Bien"
      )
    ).to.be.revertedWith("Seul l'admin peut effectuer cette action");
  });

  it("Doit permettre l'émission en lot (batchMint)", async function () {
    await certificateRegistry.connect(admin).batchMint(
      [student1.address, student2.address],
      ["Salma Benali", "Youssef Alami"],
      ["CNE01", "CNE02"],
      ["Master Data", "Master IA"],
      ["2026-06-30", "2026-06-30"],
      ["Très Bien", "Bien"]
    );

    const cert1 = await certificateRegistry.getCertificate(1);
    const cert2 = await certificateRegistry.getCertificate(2);
    expect(cert1.studentName).to.equal("Salma Benali");
    expect(cert2.studentName).to.equal("Youssef Alami");
  });

  it("Doit permettre à l'admin de révoquer un certificat", async function () {
    await certificateRegistry.connect(admin).mintCertificate(
      student1.address,
      "Hajar Tigh",
      "A131013",
      "Master IA",
      "2026-06-30",
      "Très Bien"
    );

    await certificateRegistry.connect(admin).revoke(1);
    const cert = await certificateRegistry.getCertificate(1);
    expect(cert.revoked).to.equal(true);
  });
});