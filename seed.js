const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^["']|["']$/g, '');
  }
}

const prisma = new PrismaClient();
const QDRANT_URL = process.env.QDRANT_URL || 'http://localhost:6333';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const EMBEDDING_MODEL = process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small';

const collectionByType = {
  OPERATIONAL_PROCEDURE: 'industrial_knowledge',
  FACTORY_OPERATION: 'operational_troubleshooting',
  STANDARD_CLAUSE: 'standards_knowledge',
  AUDIT_CHECKLIST: 'audit_knowledge',
  INTERVIEW_QA: 'interview_knowledge',
  DEFECT_SCENARIO: 'operational_troubleshooting',
  RCA_METHODOLOGY: 'rca_knowledge',
  CAPA_TEMPLATE: 'capa_knowledge'
};

// Example seed data - ensure authorityLevel matches schema enums
const seedKnowledge = [
  {
    objectId: 'STD-ISO9001-851',
    title: 'ISO 9001 Clause 8.5.1 - Production and Service Provision',
    industry: 'STEEL_ROLLING',
    process: 'quality_management_system',
    standard: 'ISO 9001',
    knowledgeType: 'STANDARD_CLAUSE',
    authorityLevel: 'HIGH',
    retrievalTags: ['ISO 9001', '8.5.1', 'production control', 'process control', 'QMS'],
    tags: ['ISO 9001', '8.5.1', 'production control', 'process control', 'QMS'],
    language: 'ar',
    content: `...`
  },
  {
    objectId: 'RCA-5WHY-FISHBONE-001',
    title: 'RCA Methodology - 5 Why and Fishbone',
    industry: 'STEEL_ROLLING',
    process: 'root_cause_analysis',
    knowledgeType: 'RCA_METHODOLOGY',
    authorityLevel: 'HIGH',
    retrievalTags: ['RCA', '5 Why', 'Fishbone', 'root cause', 'problem solving'],
    tags: ['RCA', '5 Why', 'Fishbone', 'root cause', 'problem solving'],
    language: 'ar',
    content: `...`
  },
  {
    objectId: 'CAPA-EFFECTIVENESS-001',
    title: 'CAPA Template and Effectiveness Check',
    industry: 'STEEL_ROLLING',
    process: 'capa_management',
    knowledgeType: 'CAPA_TEMPLATE',
    authorityLevel: 'STANDARD',
    retrievalTags: ['CAPA', 'corrective action', 'preventive action', 'effectiveness'],
    tags: ['CAPA', 'corrective action', 'preventive action', 'effectiveness'],
    language: 'ar',
    content: `...`
  },
  {
    objectId: 'AUD-ISO9001-INTERNAL-001',
    title: 'Internal Audit Checklist - ISO 9001 for Rolling Mill',
    industry: 'STEEL_ROLLING',
    process: 'internal_audit',
    knowledgeType: 'AUDIT_CHECKLIST',
    authorityLevel: 'STANDARD',
    retrievalTags: ['Audit', 'ISO 9001', 'checklist', 'rolling mill'],
    tags: ['Audit', 'ISO 9001', 'checklist', 'rolling mill'],
    language: 'ar',
    content: `...`
  },
  {
    objectId: 'DEF-STEEL-SURFACE-001',
    title: 'Steel Rolling Surface Defects - Causes and Checks',
    industry: 'STEEL_ROLLING',
    process: 'rolling_operations',
    knowledgeType: 'DEFECT_SCENARIO',
    authorityLevel: 'HIGH',
    retrievalTags: ['Steel Rolling', 'surface defects', 'scale', 'cracks', 'rolling defects'],
    tags: ['Steel Rolling', 'surface defects', 'scale', 'cracks', 'rolling defects'],
    language: 'ar',
    content: `...`
  }
];

// Main seeding function
async function main() {
  const defaultPassword = await bcrypt.hash('password', 12);
  await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {
      name: 'Test User',
      role: 'OWNER',
    },
    create: {
      email: 'test@example.com',
      password: defaultPassword,
      name: 'Test User',
      role: 'OWNER',
    },
  });
  console.log('✅ Default user ready: test@example.com / password');

  for (const item of seedKnowledge) {
    await prisma.knowledgeObject.upsert({
      where: { objectId: item.objectId },
      update: {
        title: item.title,
        industry: item.industry,
        process: item.process,
        standard: item.standard,
        knowledgeType: item.knowledgeType,
        authorityLevel: item.authorityLevel,
        retrievalTags: item.retrievalTags,
        tags: item.tags,
        language: item.language,
        content: item.content
      },
      create: {
        objectId: item.objectId,
        title: item.title,
        industry: item.industry,
        process: item.process,
        standard: item.standard,
        knowledgeType: item.knowledgeType,
        authorityLevel: item.authorityLevel,
        retrievalTags: item.retrievalTags,
        tags: item.tags,
        language: item.language,
        content: item.content
      }
    });
  }
  console.log('✅ Seed completed successfully');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });