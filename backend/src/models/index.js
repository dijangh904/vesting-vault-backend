const { sequelize } = require("../database/connection");

const ClaimsHistory = require("./claimsHistory");
const Vault = require("./vault");
const SubSchedule = require("./subSchedule");
const TVL = require("./tvl");
const Beneficiary = require("./beneficiary");
const Organization = require("./organization");
const Notification = require("./notification");
const RefreshToken = require("./refreshToken");
const RevocationProposal = require("./revocationProposal");
const RevocationSignature = require("./revocationSignature");
const MultiSigConfig = require("./multiSigConfig");
const DividendRound = require("./dividendRound");
const DividendDistribution = require("./dividendDistribution");
const DividendSnapshot = require("./dividendSnapshot");
const DeviceToken = require("./deviceToken");
const VaultLegalDocument = require("./vaultLegalDocument");
const VaultLiquidityAlert = require("./vaultLiquidityAlert");
const AnnualVestingStatement = require("./annualVestingStatement");
const VestingMilestone = require("./vestingMilestone");
const HistoricalTokenPrice = require("./historicalTokenPrice");
const HistoricalTVL = require("./historicalTVL");
const CostBasisReport = require("./costBasisReport");
const AuditorToken = require("./auditorToken");
const VaultRegistry = require("./vaultRegistry");
const Rule144Compliance = require("./rule144Compliance");
const TaxCalculation = require("./taxCalculation");
const TaxJurisdiction = require("./taxJurisdiction");
const KycStatus = require("./KycStatus");
const KycNotification = require("./KycNotification");
const ContractUpgradeProposal = require("./contractUpgradeProposal");
const CertifiedBuild = require("./certifiedBuild");
const ConversionEvent = require("./conversionEvent");
const MilestoneCelebrationWebhook = require("./milestoneCelebrationWebhook");
const Token = require("./token");
const OrganizationWebhook = require("./organizationWebhook");

initOrganizationWebhookModel(sequelize);

const models = {
  ClaimsHistory,
  Vault,
  SubSchedule,
  TVL,
  Beneficiary,
  Organization,
  Notification,
  RefreshToken,
  DeviceToken,
  VaultLegalDocument,
  VaultLiquidityAlert,
  Rule144Compliance,
  TaxCalculation,
  TaxJurisdiction,
  KycStatus,
  KycNotification,
  RevocationProposal,
  RevocationSignature,
  MultiSigConfig,
  DividendRound,
  DividendDistribution,
  DividendSnapshot,
  VestingMilestone,
  HistoricalTokenPrice,
  HistoricalTVL,
  CostBasisReport,
  AuditorToken,
  AnnualVestingStatement,
  Token,
  OrganizationWebhook,
  VaultRegistry,
  ContractUpgradeProposal,
  ContractUpgradeSignature,
  ContractUpgradeAuditLog,
  CertifiedBuild,
  ConversionEvent,
  MilestoneCelebrationWebhook,
  sequelize,
};

// Setup associations

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models;
