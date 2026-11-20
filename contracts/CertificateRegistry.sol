// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CertificateRegistry {
    
    struct Certificate {
        string studentName;
        string studentId;
        string diplomaTitle;
        string issueDate;
        string grade;
        address recipient;
        bool revoked;
    }

    address public owner;
    uint256 private _certCounter;

    mapping(uint256 => Certificate) public certificates;
    mapping(string => bool) public studentExists;

    event CertificateMinted(uint256 indexed certId, string studentId, address recipient);
    event CertificateRevoked(uint256 indexed certId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Seul l'admin peut effectuer cette action");
        _;
    }

   constructor() {
    owner = 0x4f848c26204Eb3Ecbabe556a3A645F1f7a7e41fA;
    _certCounter = 0;
}

    function mintCertificate(
        address to,
        string calldata studentName,
        string calldata studentId,
        string calldata diplomaTitle,
        string calldata issueDate,
        string calldata grade
    ) external onlyOwner returns (uint256 certId) {
        require(!studentExists[studentId], "Ce certificat existe deja pour cet etudiant");

        _certCounter++;
        certId = _certCounter;

        certificates[certId] = Certificate({
            studentName: studentName,
            studentId: studentId,
            diplomaTitle: diplomaTitle,
            issueDate: issueDate,
            grade: grade,
            recipient: to,
            revoked: false
        });

        studentExists[studentId] = true;

        emit CertificateMinted(certId, studentId, to);
    }

    function batchMint(
        address[] calldata recipients,
        string[] calldata studentNames,
        string[] calldata studentIds,
        string[] calldata diplomaTitles,
        string[] calldata issueDates,
        string[] calldata grades
    ) external onlyOwner {
        require(
            recipients.length == studentNames.length &&
            studentNames.length == studentIds.length &&
            studentIds.length == diplomaTitles.length &&
            diplomaTitles.length == issueDates.length &&
            issueDates.length == grades.length,
            "Tableaux de tailles differentes"
        );

        for (uint256 i = 0; i < recipients.length; i++) {
            require(!studentExists[studentIds[i]], "Un etudiant du lot existe deja");

            _certCounter++;
            uint256 certId = _certCounter;

            certificates[certId] = Certificate({
                studentName: studentNames[i],
                studentId: studentIds[i],
                diplomaTitle: diplomaTitles[i],
                issueDate: issueDates[i],
                grade: grades[i],
                recipient: recipients[i],
                revoked: false
            });

            studentExists[studentIds[i]] = true;

            emit CertificateMinted(certId, studentIds[i], recipients[i]);
        }
    }

    function getCertificate(uint256 certId) external view returns (Certificate memory) {
        require(certId > 0 && certId <= _certCounter, "Certificat inexistant");
        return certificates[certId];
    }

    function revoke(uint256 certId) external onlyOwner {
        require(certId > 0 && certId <= _certCounter, "Certificat inexistant");
        certificates[certId].revoked = true;
        emit CertificateRevoked(certId);
    }
}